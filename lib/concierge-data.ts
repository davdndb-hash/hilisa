import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/supabase/types";

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
 * Bewusst nicht enthalten: Pflegekasse-Status, Budget, Zahler. Dieser
 * Bereich baut vorerst nur für Hi Lisa Care/Privat als Selbstzahler-Fall.
 * Die Kassen-Anbindung — inklusive der Frage, was passiert, wenn das
 * Kassenbudget im Monat aufgebraucht ist und der Rest privat weiterläuft —
 * ist eine eigene, noch offene Entscheidung. Wenn sie fällt, ist der Ort
 * dafür ein weiteres Feld an customers plus eine eigene
 * getBillingStatus(...)-Funktion — nicht ein Umbau der bestehenden Tabellen.
 */

export type Customer = Database["public"]["Tables"]["customers"]["Row"];
export type Companion = Database["public"]["Tables"]["companions"]["Row"];
export type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
export type Message = Database["public"]["Tables"]["messages"]["Row"];

export type RequestInput = {
  datum: string;
  uhrzeit: string;
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
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data ?? [];
}

export async function getNextAppointment(
  supabase: Client,
  customerId: string
): Promise<Appointment | null> {
  const termine = await listAppointments(supabase, customerId);
  return termine[0] ?? null;
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
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      customer_id: customerId,
      companion_id: customer?.assigned_companion_id ?? null,
      datum: input.datum,
      uhrzeit: input.uhrzeit,
      anlass: input.anlass,
      notiz: input.notiz,
    })
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
