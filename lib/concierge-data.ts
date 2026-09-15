/**
 * Ask Lisa — typisierter Datenzugriff, mit statischen Fixtures im Rücken.
 *
 * Jeder Bildschirm unter app/lisa ruft nur diese Funktionen auf, nie die
 * Fixtures direkt — wenn später ein echtes Backend kommt, ändert sich nur
 * das Innenleben dieser Datei, nicht die Bildschirme. Gleiches Prinzip wie
 * lib/zweige.ts für die Zweige.
 *
 * Es gibt noch kein Login. CURRENT_CUSTOMER_ID steht als Platzhalter für die
 * eine Kundin, für die die Fixtures gerade Daten haben — sobald es echte
 * Konten gibt, ersetzt eine Sitzung/Auth diese Konstante.
 *
 * Bewusst nicht enthalten: Pflegekasse-Status, Budget, Zahler. Dieser Bereich
 * baut vorerst nur für Hi Lisa Care/Privat als Selbstzahler-Fall. Die
 * Kassen-Anbindung — inklusive der Frage, was passiert, wenn das
 * Kassenbudget im Monat aufgebraucht ist und der Rest privat weiterläuft —
 * ist eine eigene, noch offene Entscheidung. Wenn sie fällt, ist der Ort
 * dafür ein weiteres Feld an Customer plus eine eigene getBillingStatus(...)
 * -Funktion — nicht ein Umbau der bestehenden Typen hier.
 */

export type CustomerId = string;

export type Customer = {
  id: CustomerId;
  /** Das Familienmitglied, das die App bedient — nicht die betreute Person selbst. */
  name: string;
  telefon: string;
  /** Die betreute Person, für die Anfragen gestellt werden. */
  betreutePerson: string;
};

export type CompanionId = string;

export type Companion = {
  id: CompanionId;
  name: string;
  fotoUrl?: string;
  seit: string;
  kurzprofil: string;
};

export type Appointment = {
  id: string;
  companionId: CompanionId;
  datum: string;
  uhrzeit: string;
  anlass: string;
  notiz?: string;
};

export type MessageId = string;

export type Message = {
  id: MessageId;
  von: "kunde" | "begleiterin";
  text: string;
  zeitpunkt: string;
};

export type RequestInput = {
  datum: string;
  uhrzeit: string;
  anlass: string;
  notiz?: string;
};

export const CURRENT_CUSTOMER_ID: CustomerId = "demo-1";

const CUSTOMERS: Record<CustomerId, Customer> = {
  "demo-1": {
    id: "demo-1",
    name: "Name eintragen",
    telefon: "Telefonnummer eintragen",
    betreutePerson: "Name der betreuten Person eintragen",
  },
};

const COMPANIONS: Record<CompanionId, Companion> = {
  "comp-1": {
    id: "comp-1",
    name: "Name der Begleiterin eintragen",
    seit: "Seit wann eintragen",
    kurzprofil: "Kurzes Profil der Begleiterin eintragen.",
  },
};

const ASSIGNED_COMPANION: Record<CustomerId, CompanionId | null> = {
  "demo-1": "comp-1",
};

const APPOINTMENTS: Record<CustomerId, Appointment[]> = {
  "demo-1": [
    {
      id: "termin-1",
      companionId: "comp-1",
      datum: "Dienstag",
      uhrzeit: "10:00",
      anlass: "Arzttermin",
      notiz: "Abholung ist um 9:40 Uhr, Fahrt zur Praxis.",
    },
  ],
};

const MESSAGES: Record<CustomerId, Message[]> = {
  "demo-1": [
    {
      id: "msg-1",
      von: "begleiterin",
      text: "Hallo! Ich bin am Dienstag wie vereinbart um 9:40 Uhr da.",
      zeitpunkt: "Montag, 18:32",
    },
    {
      id: "msg-2",
      von: "kunde",
      text: "Danke, das passt gut.",
      zeitpunkt: "Montag, 19:05",
    },
  ],
};

export function getCustomer(customerId: CustomerId): Customer | null {
  return CUSTOMERS[customerId] ?? null;
}

export function getAssignedCompanion(customerId: CustomerId): Companion | null {
  const companionId = ASSIGNED_COMPANION[customerId];
  if (!companionId) return null;
  return COMPANIONS[companionId] ?? null;
}

export function listAppointments(customerId: CustomerId): Appointment[] {
  return APPOINTMENTS[customerId] ?? [];
}

export function getNextAppointment(customerId: CustomerId): Appointment | null {
  const termine = listAppointments(customerId);
  return termine[0] ?? null;
}

export function listMessages(customerId: CustomerId): Message[] {
  return MESSAGES[customerId] ?? [];
}

/**
 * Legt eine neue Anfrage ab. Es gibt noch kein Backend — und weil Next.js
 * Server- und Client-Code getrennt bündelt, ist dieses Modul serverseitig
 * (bei jedem serverseitig gerenderten Bildschirm) und clientseitig (im
 * Browser-Bundle des Formulars) je eine eigene Kopie mit eigenem Speicher.
 * Ein Aufruf hier ändert also nur die Kopie in der aufrufenden Umgebung —
 * eine Anfrage, hier abgeschickt, erscheint NICHT automatisch auf einem
 * serverseitig gerenderten Bildschirm wie /lisa/begleiterin. Das ist kein
 * Bug, sondern die Grenze eines Fixtures ohne echtes Backend; die
 * aufrufende UI muss ehrlich bleiben, was sie damit verspricht (siehe
 * components/Rueckruf.tsx für denselben Ton).
 */
export function createRequest(customerId: CustomerId, input: RequestInput): Appointment {
  const companion = getAssignedCompanion(customerId);
  const termin: Appointment = {
    id: `termin-${Date.now()}`,
    companionId: companion?.id ?? "comp-1",
    datum: input.datum,
    uhrzeit: input.uhrzeit,
    anlass: input.anlass,
    notiz: input.notiz,
  };
  const bestehende = APPOINTMENTS[customerId] ?? [];
  APPOINTMENTS[customerId] = [termin, ...bestehende];
  return termin;
}
