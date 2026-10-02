import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";
import { tagLang, uhrzeitKurz, wanduhrNachIso } from "@/lib/termine";

/**
 * Hi Lisa — Datenzugriff auf die echte Supabase-Datenbank.
 *
 * Jeder Bildschirm unter app/lisa ruft nur diese Funktionen auf, nie
 * `supabase.from(...)` direkt — ändert sich das Datenmodell, ändert sich nur
 * diese Datei, nicht die Bildschirme. Gleiches Prinzip wie lib/zweige.ts für
 * die Zweige.
 *
 * customers.id ist dieselbe ID wie auth.users.id (1:1, siehe Migration
 * "concierge_schema" im Supabase-Projekt) — es gibt also keine eigene
 * "welcher Kunde bin ich"-Logik mehr, das übernimmt die Anmeldung.
 *
 * Kein Pflegekassen-Modell: seit dem Pivot vom 23.09.2026 zahlen Kundinnen
 * privat, 42 Euro die Stunde, ab zwei Stunden. Es gibt hier also keinen
 * Kassenstatus, kein Budget und keinen dritten Zahler — und es ist auch
 * keiner geplant. Enterprise (/fuer-betriebe) rechnet weiterhin mit der
 * Kasse ab, läuft aber über ein eigenes Modell außerhalb dieser App.
 */

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Companion = Database["public"]["Tables"]["companions"]["Row"];
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];

export type RequestInput = {
  /** Wanduhr-Datum aus dem Formular, "2026-10-07" */
  datum: string;
  /** Wanduhr-Zeit aus dem Formular, "14:00" */
  uhrzeit: string;
  dauerMinuten: number;
  anlass: string;
  notiz?: string;
};

type Client = SupabaseClient<Database>;

export async function getCustomer(supabase: Client, customerId: string): Promise<Customer | null> {
  const { data, error } = await supabase.from("customers").select("*").eq("id", customerId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getAssignedCompanion(
  supabase: Client,
  customerId: string
): Promise<Companion | null> {
  const customer = await getCustomer(supabase, customerId);
  if (!customer?.assigned_companion_id) return null;
  const { data, error } = await supabase
    .from("companions")
    .select("*")
    .eq("id", customer.assigned_companion_id)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function listAppointments(supabase: Client, customerId: string): Promise<Appointment[]> {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .eq("customer_id", customerId)
    // Nach Zeitpunkt, nicht nach Anlagedatum. Altzeilen ohne starts_at
    // (siehe Migration "termine_echter_zeitpunkt_und_status") landen hinten.
    .order("starts_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

/** Termine, die noch bevorstehen und nicht abgesagt sind. */
export async function listKommendeTermine(
  supabase: Client,
  customerId: string
): Promise<Appointment[]> {
  const alle = await listAppointments(supabase, customerId);
  const jetzt = Date.now();
  return alle.filter(
    (t) =>
      t.status !== "storniert" &&
      t.status !== "erledigt" &&
      (t.starts_at === null || new Date(t.starts_at).getTime() >= jetzt)
  );
}

export async function getNextAppointment(
  supabase: Client,
  customerId: string
): Promise<Appointment | null> {
  // Vorher war das schlicht der zuletzt angelegte Termin — auch wenn er
  // längst vorbei oder abgesagt war. Jetzt der nächste, der wirklich kommt.
  const kommende = await listKommendeTermine(supabase, customerId);
  return kommende[0] ?? null;
}

export async function listMessages(supabase: Client, customerId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("customer_id", customerId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createRequest(
  supabase: Client,
  customerId: string,
  input: RequestInput
): Promise<Appointment> {
  const customer = await getCustomer(supabase, customerId);
  const startsAt = wanduhrNachIso(input.datum, input.uhrzeit);

  const { data, error } = await supabase
    .from("appointments")
    .insert({
      customer_id: customerId,
      companion_id: customer?.assigned_companion_id ?? null,
      starts_at: startsAt,
      dauer_minuten: input.dauerMinuten,
      // datum und uhrzeit sind noch not null und werden mitgeschrieben,
      // solange es Altzeilen ohne starts_at gibt. Abgeleitet, nicht
      // eingegeben — die beiden Spalten können nicht mehr auseinanderlaufen.
      datum: tagLang(startsAt),
      uhrzeit: uhrzeitKurz(startsAt),
      anlass: input.anlass,
      notiz: input.notiz,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Absagen. Geht über eine Datenbankfunktion statt über ein UPDATE, weil ein
 * allgemeines Schreibrecht auf appointments der Kundin auch erlauben würde,
 * den Status selbst auf „angenommen" zu setzen und sich eine Zusage
 * vorzutäuschen, die es nicht gibt.
 */
export async function termenStornieren(
  supabase: Client,
  terminId: string
): Promise<Appointment> {
  const { data, error } = await supabase.rpc("termin_stornieren", { p_termin: terminId });
  if (error) throw error;
  return data as Appointment;
}

/** Was die Familie selbst an ihrem Konto ändern darf. */
export type KundenAngaben = {
  name: string;
  telefon: string;
  betreute_person: string;
};

export async function updateCustomer(
  supabase: Client,
  customerId: string,
  angaben: KundenAngaben
): Promise<Customer> {
  // assigned_companion_id steht bewusst nicht in KundenAngaben: ein Trigger
  // in der Datenbank lässt diese Spalte nur von Personal ändern (Migration
  // "security_hardening_…"). Hier gar nicht erst anzubieten erspart einen
  // Fehler, den niemand versteht.
  const { data, error } = await supabase
    .from("customers")
    .update(angaben)
    .eq("id", customerId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** Nachricht von der Kundin an die Begleiterin. */
export async function sendMessage(
  supabase: Client,
  customerId: string,
  text: string
): Promise<Message> {
  const { data, error } = await supabase
    .from("messages")
    .insert({ customer_id: customerId, von: "kunde", text })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/* --------------------------------------------------------------- Personal */
/*
 * Ab hier: Funktionen für Hi-Lisa-Personal, nicht für Kundinnen. Wer
 * Personal ist, steht in der Tabelle public.staff — dort trägt sich niemand
 * selbst ein, das geht nur direkt in der Datenbank (siehe Migration
 * "staff_and_assignment"). Row Level Security lässt diese Aufrufe nur
 * durch, wenn is_staff() für die angemeldete Person true ergibt; die
 * UI-Seite app/lisa/personal prüft das zusätzlich selbst, damit
 * Nicht-Personal die Seite gar nicht erst zu sehen bekommt.
 */

export async function istPersonal(supabase: Client, userId: string): Promise<boolean> {
  const { data, error } = await supabase.from("staff").select("id").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data !== null;
}

export async function listCustomersForStaff(supabase: Client): Promise<Customer[]> {
  const { data, error } = await supabase.from("customers").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function listCompanions(supabase: Client): Promise<Companion[]> {
  const { data, error } = await supabase.from("companions").select("*").order("name", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function assignCompanion(
  supabase: Client,
  customerId: string,
  companionId: string | null
): Promise<void> {
  const { error } = await supabase
    .from("customers")
    .update({ assigned_companion_id: companionId })
    .eq("id", customerId);
  if (error) throw error;
}

export async function createCompanion(
  supabase: Client,
  input: { name: string; seit: string; kurzprofil: string }
): Promise<Companion> {
  const { data, error } = await supabase.from("companions").insert(input).select().single();
  if (error) throw error;
  return data;
}
