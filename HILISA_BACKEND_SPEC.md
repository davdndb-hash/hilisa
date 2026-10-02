# Hi Lisa — Backend Spec & To-Do

**For:** backend developer picking up the Ask Lisa app
**Repo:** `hilisa-web`, branch **`ask-lisa-preview`** (not `main` — `main` is the marketing site only)
**Stack today:** Next.js 15 (App Router) · React 19 · TypeScript · Supabase (Postgres + Auth + RLS)
**Written:** 2026-10-02 · **Rev. 2** — reference model (papa.com) folded in

---

## 0. Read this first — three things that will surprise you

1. **There is no backend code.** `app/api/` does not exist. Every database read and write
   happens from the browser with the Supabase anon key, protected only by RLS policies.
   There is no server-side validation, no service-role key, no job queue, no webhook
   handler, no email sender. The "backend" is five Postgres tables.

2. **The Supabase project is currently PAUSED.** Project `hilisa`
   (`eiqtrjutjwoceilpdhmi`, org `TunerLink`, eu-central-1) has status `INACTIVE` —
   free-tier auto-pause. Restore it from the Supabase dashboard before you can query
   anything. Everything below about the schema comes from the generated types in
   `lib/supabase/types.ts` and the previous session's handoff; **re-verify against the
   live DB once it's restored.**

3. **The business model pivoted on 23.09.2026** to *private pay only*, like papa.com.
   Pflegekasse / Pflegegrad / Entlastungsbetrag are sunset for consumers (see
   `lib/zweige.ts` and `app/page.tsx` on `main`). The customer-onboarding spec
   `OB_Kunde_neu.docx` is dated **17.09.2026 — before the pivot** — so its Step 3
   (Pflegegrad) and Step 6.1 (Pflegekasse-Check) are **obsolete**. Don't build them.
   Enterprise (`/fuer-betriebe`) still uses Pflegekasse for its own model, but that is a
   separate branch of the business and not part of this app.

---

## 1. Business rules the backend has to encode

From the live marketing site (`main` branch) and the founding docs:

| Rule | Value | Source |
|---|---|---|
| Payer | The customer, privately. No insurance, no claims. | `lib/zweige.ts` |
| Hourly rate | **42 €/h** | `lib/zweige.ts`, `app/blatt/kunden/page.tsx` |
| Minimum booking | **2 hours** per assignment | `lib/zweige.ts` |
| Travel fee | Flat fee per assignment — **amount not yet decided** ("Preis eintragen") | `app/privat/page.tsx:80` |
| Membership fee | None | `app/privat/page.tsx:80` |
| Commitment | Monthly cancellable, no minimum term | `lib/zweige.ts` |
| Companions' status | **Freelance (Honorarbasis)** — they invoice Hi Lisa, no employment contract | `app/mitarbeiten/page.tsx:77` |
| Companion prerequisite | 30 training units (bayerisches Schulungskonzept), legally required before first solo assignment | `app/mitarbeiten/page.tsx:80` |
| Companion vetting | Clean Führungszeugnis at hire, re-checked **every 3 years** | `app/mitarbeiten/page.tsx:106` |
| Hard service boundary | **No medical care.** No washing, dressing, medication, wound care. | `GRENZE` in `lib/zweige.ts` |
| Market | Munich, Germany. German UI, informal **du**. | Brand guide |

The hard service boundary is not just copy — it is the legal basis for operating without
a Pflegedienst licence. Anything the backend models as a "service category" must stay
inside it.

---

## 2. Reference model — papa.com

Hi Lisa's consumer product is a close structural match to Papa's self-pay offering at
**get.papa.com**. Papa has run 3M+ visits across 7,300 US cities, so their mechanics are
a tested answer to most of the questions in this document. Researched 2026-10-02 from
papa.com, get.papa.com, and papa.com/pals.

### 2.1 Their economics vs ours

| | Papa (self-pay) | Hi Lisa Privat |
|---|---|---|
| Customer price | **$30/hr** | **42 €/h** |
| Acquisition offer | **First hour free** | none |
| Minimum | **1 hour, then billed by the minute** | 2 hours |
| Commitment | None. No subscription, no contract. | Monthly cancellable |
| Worker pay | Base **$13–18/hr**; **avg. $22/hr** incl. bonuses + one-way commute mileage | not published (Enterprise model assumes 17 €/h brutto for employed staff) |
| Worker payout speed | **2 business days**, direct to bank, no fees | — |
| Gross take | roughly **40–55 %** | ~50 % if companions get ~20 €/h |

The arbitrage spread is genuinely comparable. Two notes:

- **Papa's minimum is half of ours and they advertise it as a selling point:** *"You will
  never be forced to schedule a 4+ hour visit just to meet a policy minimum."* Our 2-hour
  minimum is the thing a price-sensitive first-time customer bounces off. Worth testing.
- **Papa pays a base rate they set, dispatches the work, and requires in-app check-in.**
  In Germany those are textbook Scheinselbständigkeit indicators. We cannot copy Papa's
  worker mechanics onto an Honorarbasis contract without legal review — see §7.

### 2.2 The mechanics worth copying

- **Passwordless auth: phone number + date of birth.** *"There's no password to
  remember."* And the proxy case is solved elegantly: *"If you signed up for a parent or
  loved one, use your phone number and their date of birth."* The credential itself
  encodes the relationship. For an 80-year-old demographic this beats our current
  email + password by a wide margin.
- **Preferred Pal, not hard assignment.** A member can request a Pal as their *"Preferred
  Papa Pal"*; a Pal can hold several such relationships. *"As long as they're available at
  your requested time, they'll be there! If they can't make it and you need someone there,
  we can send a backup Pal in their place."* Continuity is the default, the pool is the
  fallback. **This is the answer to our biggest open schema question** — see §4.
- **Pals browse and claim visits.** *"Easily see all visits near you, filter and select
  the ones that work best."* Supply-side self-service, not a dispatcher assigning work.
- **Billing is invoice-after-the-fact, net 30.** *"Papa sends an invoice to your email,
  with 30 days to pay in full. If payment is not received within 30 days of the invoice
  date, your account will be frozen and you will not be able to schedule any further
  visits."* No card on file, no pre-authorisation, no instant capture. The dunning
  mechanism is simply freezing the account. This is vastly simpler to build than what I
  originally specced — see §6.
- **In-visit check-in and location sharing** in the worker app. Doubles as the safety
  record and as the source of truth for billable minutes.
- **Every visit is rated.** Post-visit survey feeds matching and quality review.
- **Phone and text are first-class booking channels.** *"Call or text (855) 801-2549 and
  we'll book it for you."* Staff book on behalf of members. The backend needs an
  internal book-on-behalf path from day one, not just self-service.
- **Honest scope refusal:** *"They don't provide bathing, medication management, or
  nursing care. If that's what's needed, we'll tell you honestly and point you
  elsewhere."* Same boundary as our `GRENZE`, same bluntness.

### 2.3 Where the match breaks down — read this before treating Papa as a blueprint

**Papa's actual business is B2B, and the self-pay product is their newest line.** Their
own copy: *"Papa has traditionally helped members through health plans and employers, and
is now offering a self-pay option for families."* The revenue base is Medicare Advantage,
Medicaid and SNP health plans plus employer benefits — a third-party payer reimbursing
companion care at scale.

That matters for two reasons:

1. We are matching Papa's *least proven* line, not the one that built the company. The
   get.papa.com mechanics are good product design, but they are not yet evidence that
   direct-pay companion care works as a standalone business.
2. Papa's core model — third-party payer funding companion care — is structurally what
   Hi Lisa's Pflegekasse offering was, and what the 23.09 pivot removed. The pivot is the
   owner's call and this document doesn't reopen it; but note that **Hi Lisa Enterprise
   is the closer structural match to Papa's real revenue base than Hi Lisa Privat is.**
   If the private-pay funnel proves expensive to fill, that is the comparison to revisit.

Also: Papa requires an insured car (model year 2010+) and a driver's licence of every
Pal, because US companion care is transport-heavy. In Munich, with public transport and
our smaller radius, that requirement would shrink the applicant pool for little gain.
Make the car an attribute used in matching (`fuehrerschein`, `auto`), not a gate.

---

## 3. What exists today

### 3.1 Schema (5 tables, `public`, RLS enabled)

```
customers      id (= auth.users.id, 1:1), email, name, telefon,
               betreute_person, assigned_companion_id → companions, created_at
companions     id, name, kurzprofil, photo_url, seit, created_at
appointments   id, customer_id → customers, companion_id → companions,
               datum (text!), uhrzeit (text!), anlass, notiz, created_at
messages       id, customer_id → customers, von (text), text, created_at
staff          id (= auth.users.id), name, created_at     -- allow-list, no self-signup
```

- Function `is_staff()` → boolean, used by RLS policies.
- Trigger `handle_new_user` auto-inserts a `customers` row on signup, copying the email.
- Migrations applied: `concierge_schema`, `lock_down_handle_new_user_rpc`,
  `staff_and_assignment`, `lock_down_is_staff_from_anon`,
  `customers_email_for_staff_identification`.

### 3.2 Data-access layer

`lib/concierge-data.ts` is the **only** file that touches Supabase tables. Every screen
calls its typed functions. Keep that rule — it is what makes the backend swap a one-file
change. Current functions:

`getCustomer` · `getAssignedCompanion` · `listAppointments` · `getNextAppointment` ·
`listMessages` · `createRequest` · `sendMessage` · and staff-only `istPersonal` ·
`listCustomersForStaff` · `listCompanions` · `assignCompanion` · `createCompanion`

### 3.3 Screens wired to real data

| Route | State |
|---|---|
| `/lisa` | Avatar stage. **Voice is a stub** — `setTimeout` animation, no mic, no STT/TTS, no LLM. |
| `/lisa/begleiterin` | Shows assigned companion + next appointment, or an empty state. |
| `/lisa/neu` | Structured request form → writes a real `appointments` row. |
| `/lisa/chats` | Real message thread. Customer can send; **nobody can reply.** |
| `/lisa/profil` | **Read-only.** No self-edit form exists. |
| `/lisa/personal` | Staff-only. Create companions, assign one to a customer. |
| `/lisa/anmelden` | Email + password signup/login. |
| `middleware.ts` | Protects `/lisa/*` except `/lisa/anmelden`. |

---

## 4. Security audit — do this before anything else

These are specific, checkable concerns in the current setup, not generic advice.

- [ ] **`messages.von` is client-controlled.** `sendMessage()` hardcodes `von: "kunde"`,
      but nothing stops a signed-in customer from calling the Supabase REST endpoint
      directly with `von: "begleiterin"` and fabricating a message that appears to come
      from their companion. Fix with a RLS `WITH CHECK` constraint, a DB default +
      trigger, or by moving the insert server-side. **Verify whether a check already
      exists** once the DB is restored.
- [ ] **`customers.assigned_companion_id` is updatable from the browser.**
      `assignCompanion()` runs client-side. The RLS policy is supposed to gate it behind
      `is_staff()`. Confirm that a non-staff customer cannot self-assign a companion.
- [ ] **Email confirmation is OFF** in Supabase Auth (turned off during development
      because the default sender rejects placeholder domains). Turn it on before real
      users, and configure a real SMTP sender — Supabase's built-in sender is
      rate-limited and not production-grade. *(May become moot — see the passwordless
      question in §10.)*
- [ ] **Leaked-password protection is OFF.** Flagged by Supabase's own security advisor.
      Free to turn on.
- [ ] Run `get_advisors` (security + performance) after restoring the project and clear
      everything it reports.
- [ ] No rate limiting anywhere. Signup, message send, and request creation are all
      unthrottled.
- [ ] **DSGVO/GDPR is unaddressed.** German market, data about a vulnerable third party
      (the *betreute Person*, who is not the account holder), soon home addresses. You
      need at minimum: a lawful basis per field, a documented retention policy, an export
      and a hard-delete path, an AV-Vertrag (DPA) with Supabase, and an audit trail for
      who viewed a customer's address. The privacy page (`/datenschutz`) will need to be
      rewritten to match whatever you build — don't write that copy yourself, flag it for
      the owner.

> **Note on Papa's location sharing (§2.2):** continuous location tracking of a worker is
> far more restricted under DSGVO + BetrVG than under US law. A check-in/check-out
> timestamp with a one-off coarse location stamp is defensible; continuous tracking is
> not. Build the former.

---

## 5. Schema changes needed

### 5.1 The structural decision: preferred, not assigned

The current schema hardcodes **one companion per customer**
(`customers.assigned_companion_id`). That breaks the moment she is sick, on holiday, or
fully booked — and it cannot express the target matching flow at all.

Papa's answer (§2.2) reconciles this with our brand promise of *"Dieselbe Begleiterin,
jede Woche"*: **continuity is a preference with a fallback, not a hard binding.**

```
preferred_companions   customer_id, companion_id, rang int, seit, bis
                       -- many-to-many; rang = priority order
```

Booking then resolves as: offer to preferred companions in rank order → if none accept
within a timeout, widen to the qualified pool → if still none, escalate to staff. Drop
`customers.assigned_companion_id` once this exists.

### 5.2 Fix what's already broken

- **`appointments.datum` and `.uhrzeit` are free text.** The form stores `"Dienstag"` and
  `"14:30"` as strings. Nothing can sort, filter, remind, or detect a conflict on that.
  Replace with `starts_at timestamptz` + `duration_minutes int`.
- **`appointments` has no status.** Add a status enum:
  `angefragt → angeboten → wartet_auf_annahme → angenommen → abgelehnt → laeuft → erledigt → storniert`.
- **`companions` have no login.** `companions.id` is a standalone UUID with no link to
  `auth.users`. A companion literally cannot sign in. Add
  `auth_user_id uuid references auth.users` (nullable while staff pre-create profiles).
- **`messages` is a flat per-customer list.** It assumes exactly one thread with one
  assigned companion — which §5.1 just removed. Add `conversation_id`, scoped to a
  customer↔companion pair.
- **`customers.betreute_person` is a single text field.** Promote it to its own table.

### 5.3 New tables

```
care_recipients      id, customer_id, name, geburtsdatum, telefon,
                     adresse_*, lat, lng, verhaeltnis,
                     vollmacht_bestaetigt bool, vollmacht_bestaetigt_at
                     -- geburtsdatum (not just year) if we adopt phone+DOB login
                     -- one customer may care for more than one person

service_categories   id, slug, name, beschreibung, aktiv
                     -- Einkauf, Arztbegleitung, Haushalt, Spaziergang, …
                     -- must stay inside the GRENZE (no medical care)

companion_profiles   extends companions: auth_user_id, plz, lat, lng, radius_km,
                     sprachen[], fuehrerschein bool, auto bool,
                     status (bewerbung|geschult|aktiv|pausiert|beendet)

companion_qualifications
                     companion_id, fuehrungszeugnis_geprueft_am,
                     fuehrungszeugnis_naechste_pruefung (= +3 Jahre),
                     schulung_abgeschlossen_am, schulung_einheiten int
                     -- the 3-year recheck is a public legal commitment;
                     -- it needs a reminder job, not a spreadsheet

companion_availability
                     companion_id, wochentag, von, bis, gilt_ab, gilt_bis
                     -- plus a blocked-dates table for holidays/sickness

companion_services   companion_id, service_category_id

preferred_companions see §5.1

bookings             replaces/extends appointments: care_recipient_id,
                     service_category_id, starts_at, duration_minutes,
                     status, recurrence_rule (RFC 5545 RRULE, or an enum:
                     einmalig|woechentlich|zweiwoechentlich),
                     parent_booking_id, gebucht_von (kunde|lisa|personal)
                     -- gebucht_von matters: staff book by phone (§2.2)

booking_offers       booking_id, companion_id, rang, status
                     (offen|angenommen|abgelehnt|abgelaufen),
                     gesendet_at, beantwortet_at, laeuft_ab_at

visit_checkins       booking_id, companion_id, eingecheckt_at,
                     ausgecheckt_at, abrechenbare_minuten,
                     standort_grob  -- see the DSGVO note in §4

assignment_reports   booking_id, companion_id, notiz, erstellt_at
                     -- "unsere eigene kurze Notiz nach dem Einsatz"
                     -- (app/privat/page.tsx:71)

visit_ratings        booking_id, von (kunde|begleiterin), sterne, kommentar
                     -- Papa rates every visit; it feeds matching + quality

invoices / payments  see §6

notifications        channel (email|sms|push), recipient, template, payload,
                     status, sent_at, error
                     -- one outbox table, so retries and auditing are possible

audit_log            actor_user_id, action, entity, entity_id, at, metadata
```

### 5.4 The address rule

`OB_Kunde_neu.docx` is explicit: **the address is only released to the companion once
there is an actual assignment.** That is an access-control rule, not a UI rule — enforce
it in RLS or in a server route, not by hiding a field in React.

---

## 6. Payments — entirely unbuilt, but simpler than I first thought

Nothing exists. Private pay means Hi Lisa now owns the whole money path.

**Recommended model, following Papa (§2.2):** bill after the visit, from actual
checked-in minutes, by emailed invoice on net-30 terms. Non-payment freezes the account
rather than triggering a card retry cascade. No card on file, no pre-authorisation.

This removes most of the hard parts: no SEPA mandate lifecycle, no pre-auth expiry, no
dunning state machine, no chargeback flow. It costs you working capital and collection
risk instead — which for a Munich-local business with a few hundred customers is the
cheaper trade.

What you still need:

- **Price calculation:** `max(gebuchte_minuten, minimum) → tatsächliche_minuten` × 42 €/h
  + flat travel fee. Decide whether the minimum bills on *booked* or *actual* time.
- **Tables:** `invoices`, `invoice_lines`, `payments`, `account_status` (aktiv | eingefroren).
- **A monthly or per-visit invoice run** as a scheduled job.
- **Invoicing is a legal document in Germany:** sequential numbers with no gaps, required
  fields per §14 UStG, 10-year retention (GoBD). Don't hand-roll it — use a German
  invoicing service, and confirm with the owner's tax advisor whether the service is
  USt-pflichtig or falls under §4 Nr. 16 UStG.
- **If you later add card/SEPA**, Stripe is the default — but don't build it in phase 3
  unless collections actually become a problem.

**The other direction — companion payouts.** Papa pays Pals within 2 business days,
direct to bank. Our companions are freelancers who **invoice Hi Lisa**
(`app/mitarbeiten/page.tsx:77`), which is slower and more manual. You need hours-worked
per companion per month (from `visit_checkins`) and either a self-billing (Gutschrift)
flow or at minimum a clean export. See the Scheinselbständigkeit warning in §7.

---

## 7. The worker-classification problem — flag for the owner, don't solve in code

Papa sets the hourly rate, dispatches the visits, requires in-app check-in, and mandates
their own safety training. Hi Lisa's companions are contracted on **Honorarbasis** —
freelancers issuing invoices, explicitly *"kein Arbeitsvertrag, keine Festanstellung"*.

Copying Papa's control mechanics onto that contract raises **Scheinselbständigkeit**
exposure: a rate we set, work we dispatch, training we require, tools we mandate, and
check-in we enforce are exactly the indicators the Deutsche Rentenversicherung looks for
in a Statusfeststellungsverfahren. The downside is retroactive social-security
contributions.

This is a legal question for the owner and their advisor, not a technical one. But it
has a direct schema consequence, so it should be answered before Phase 2:

- If companions stay genuinely freelance, the model must let them **set their own rates
  and decline freely** — which argues for an offer/claim board, not assignment.
- If they become employees, you need `employment_contracts`, payroll export, working-time
  records (ArbZG), and holiday accrual — a much bigger build.

Build the offer/claim board either way; it is the lower-risk shape.

---

## 8. Target customer flow (`OB_Kunde_neu.docx`, pivot-corrected)

Items struck through are dead after the 23.09 pivot.

1. **For whom?** — "für mich selbst" / "für Angehörige".
   Self: name, birth date, phone, address (address gated per §5.4).
   Relative: same fields for the care recipient + a checkbox *"Ich bin bevollmächtigt, in
   dieser Sache zu handeln"*. **Store the timestamp of that confirmation** — it is a legal
   declaration.
2. **Location** — PLZ or live location on a Google Maps view. Needs a Maps API key and a
   geocoding step; store `lat`/`lng` so matching can do a radius query.
   *Papa opens the entire funnel with the ZIP field alone — one input before any personal
   data. Worth copying: it qualifies the lead and costs the user nothing.*
3. ~~**Pflegegrad**~~ — **obsolete.** Private pay only.
4. **Handoff to Lisa** — "Begleiterin finden".
5. **Lisa start screen** — primary CTA starts the conversation; a visible **direct-path
   button** goes straight to the written form, bypassing the chat. The direct path is a
   hard requirement, not a fallback — it is for older users who want a normal form.
   (The existing `/lisa/neu` form is already that direct path; keep it.)
   *Add phone and text as equal third and fourth channels, per §2.2.*
6. **Lisa conversation:**
   - **6.0 AI disclosure.** Lisa must state at the start that she is an AI, not a human.
     Treat this as legally required (EU AI Act transparency), unmissable, and logged.
   - ~~6.1 Pflegekasse check~~ — **obsolete.**
   - **6.2 Service selection** — ask what's needed, show matching categories.
   - **6.3 Learning over time** — remember recurring patterns ("every Tuesday morning")
     and proactively suggest them. Needs structured booking history, which is the main
     reason §5.2 matters.
   - **6.4 Date & recurrence** — one-off, weekly, biweekly.
   - **6.5 Matching** — preferred companions first, then the qualified pool (§5.1).
   - **6.6 Customer confirms.**
   - **6.7 Request goes to the companion** — pending until *she* accepts. This is
     `booking_offers`.

**Open in the source doc:** which fields a relative's record needs beyond the self case;
and where "favourites / recurring bookings" belong in the UI. Papa answers the second one
— favourites are a *Preferred Pal* relationship on the member's account, not a property
of the companion's profile (§5.1).

---

## 9. The Lisa AI layer — unbuilt

`components/concierge/Eingabeleiste.tsx` is a **pure animation**: a `setTimeout` chain
that plays listening → thinking → calm and returns a canned string. No microphone, no
speech recognition, no speech synthesis, no model call.

To make it real you need:

- **A server route** (`app/api/lisa/route.ts`) — the model key must never reach the
  browser. Streaming response.
- **Tool/function calling** over the real domain: `sucheVerfuegbareBegleiterinnen`,
  `erstelleBuchung`, `zeigeNaechstenTermin`, `aendereTermin`. Lisa should *call* the same
  functions the direct-path form calls, not reimplement them.
- **A conversation store** (`conversations`, `conversation_messages`) — separate from the
  customer↔companion `messages` table.
- **Guardrails:** never promise a booking a companion hasn't accepted (§8.6.7), never
  give medical advice (the `GRENZE`), always open with the AI disclosure.
- **Voice** is a separate architecture decision the owner has deferred. Text first.
- **Cost and latency** need a budget before this ships.

> Note: Papa, at 3M+ visits, has **no AI concierge at all** — they use a web form plus a
> phone number. Lisa is our differentiator, but she is not on the critical path to a
> working business. Phase her accordingly.

---

## 10. Everything else that's missing

- **No companion-facing app at all.** Companions can't log in, see assignments, accept or
  decline, message a customer, check in, or file a report. This is the single biggest
  hole: without it the accept/reject loop cannot exist and the chat is one-way by
  construction. Papa runs this as a dedicated mobile app; we can start with a mobile web
  view.
- **No notifications of any kind.** Creating a request or sending a message alerts nobody.
  Pick a transactional email provider (Resend/Postmark) and an SMS provider early — most
  of the flow is meaningless without them.
- **No customer self-edit.** `/lisa/profil` is read-only; today the only way data gets in
  is a staff member or raw SQL.
- **The marketing-site callback form sends nothing.** `components/Rueckruf.tsx` has a TODO
  listing exactly what it needs: a route handler at `app/api/rueckruf/route.ts`, a
  cookieless spam defence (honeypot + server-side rate limit), and a consent text agreed
  against the privacy policy. This is on **`main`**, not `ask-lisa-preview`.
- **No file uploads.** Needed for companion photos (`photo_url` exists but nothing writes
  it), CVs, and Führungszeugnis scans. A Führungszeugnis scan is especially sensitive —
  private bucket, signed URLs, short retention.
- **No admin beyond `/lisa/personal`.** No booking overview, no cancellation handling, no
  refunds, no dispute trail, no book-on-behalf screen for phone bookings.
- **No tests, no CI, no error tracking, no structured logging, no staging DB.**
  Migrations live only in Supabase's history — there is no `supabase/migrations/`
  directory, so schema changes aren't code-reviewable. Fix that first.
- **"Radar"** in the slide-out menu is a disabled stub. Open question for the owner.

---

## 11. To-do list, in the order I'd do it

### Phase 0 — Unblock & make safe *(days)*
1. Restore the paused Supabase project; re-verify the live schema against §3.1.
2. Run the security advisor; fix everything it reports.
3. Audit the two RLS holes in §4 (`messages.von`, `assigned_companion_id`).
4. Turn on email confirmation + leaked-password protection; wire a real SMTP sender.
5. Move migrations into the repo (`supabase/migrations/`) with the CLI. Add a staging project.
6. Add error tracking (Sentry) and structured request logging.

### Phase 1 — Make the data model real *(1–2 weeks)*
7. `appointments.datum/uhrzeit` → `starts_at timestamptz` + `duration_minutes`.
8. Add the booking `status` enum, `booking_offers`, and `preferred_companions` (§5.1);
   drop `assigned_companion_id`.
9. Split `betreute_person` into `care_recipients`; add address + geocoding + §5.4 gating.
10. Introduce `service_categories`, seeded from the site's existing categories.
11. Link `companions` to `auth.users`; add `companion_profiles`, `_qualifications`,
    `_availability`, `_services`.
12. Introduce `app/api/` and move every **write** server-side. Reads can stay on RLS;
    no client should ever write a status or an offer response again.

### Phase 2 — Close the loop *(2–3 weeks)*
13. **Companion app**: login, offer inbox, accept/decline, chat reply, check-in/out,
    post-visit report. Nothing else works until this exists.
14. Notification outbox + email/SMS provider; wire request-created, offer-sent,
    offer-accepted, offer-declined, reminder-24h.
15. Customer self-edit + full onboarding per §8 steps 1–2 (ZIP-first).
16. Matching service: preferred → qualified pool, filtered by service ∩ radius ∩
    availability, ranked by rating. Start rule-based and boring.
17. Recurrence (one-off / weekly / biweekly) with generated occurrences.
18. Visit ratings after every booking.
19. Staff book-on-behalf screen (phone bookings are a first-class channel).

### Phase 3 — Money *(1–2 weeks with the net-30 model)*
20. Decide the travel fee amount and whether the minimum bills booked or actual time (§13).
21. Invoice generation from `visit_checkins`, emailed, net 30.
22. `account_status` freeze on overdue, unfreeze on payment.
23. Compliant invoicing (sequential numbering, §14 UStG, GoBD retention).
24. Companion payout accounting / Gutschrift export.

### Phase 4 — Lisa *(open-ended, not on the critical path)*
25. Server route + streaming + conversation store.
26. Tool calling over the Phase 1–2 domain functions.
27. AI disclosure, guardrails, cost budget.
28. Pattern learning (§8.6.3) — needs months of real history first. Build the history now,
    the suggestions later.
29. Voice — only after the owner decides the architecture.

### Cross-cutting, don't defer
- DSGVO: lawful basis, retention, export, hard delete, Supabase DPA, audit log.
- Rate limiting on every public endpoint.
- The Führungszeugnis 3-year re-check needs a scheduled job from day one of Phase 2 — it
  is a commitment the company makes publicly on `/mitarbeiten`.

---

## 12. Decisions only the owner can make

Papa's answer is given where one exists — as evidence, not as a verdict.

| # | Decision | Papa's answer |
|---|---|---|
| 1 | Charge model — pre-auth, or invoice after? | **Invoice by email, net 30, freeze on non-payment.** |
| 2 | Travel flat fee amount (site says "Preis eintragen") | Folded into the hourly rate; Pals get mileage separately. |
| 3 | Minimum booking — keep 2 h, or cut to 1 h? | **1 h, then by the minute** — advertised as a selling point. |
| 4 | Offer a free first hour as acquisition? | **Yes**, it's their headline. |
| 5 | Auth — keep email+password, or go passwordless phone + DOB? | **Phone + DOB, no password.** Proxy = requester's phone + recipient's DOB. |
| 6 | One companion per customer, or preferred + pool? | **Preferred Pal + backup from the pool.** *Answer this before Phase 1 — it is the most structural of the twelve.* |
| 7 | Companion status — stay Honorarbasis, or employ? (§7) | Papa sets rates and dispatches; not transferable to German law. **Needs a lawyer.** |
| 8 | Cancellation / no-show policy | Not published. |
| 9 | Is the service USt-pflichtig? | n/a — blocks invoicing, tax advisor question. |
| 10 | Which fields a relative's record needs | n/a — open in `OB_Kunde_neu.docx`. |
| 11 | What "Radar" means under this model | n/a. |
| 12 | Voice I/O architecture | Papa has no AI layer at all. |

---

## 13. House rules carried over

- German UI copy, informal **du** (Enterprise uses **Sie**; this app is consumer).
- German identifiers and comments in code, matching the existing repo.
- Never invent legal, pricing, or billing copy — use the site's `„… eintragen"`
  placeholder convention and flag it.
- No new npm dependencies without asking the owner first.
- axe-core (wcag2a + wcag2aa), zero violations, checked at desktop and ~390px, after
  every screen.
- Public assets must not live under `/public/lisa/` — the middleware matcher `/lisa/:path*`
  intercepts them and redirects to login. Use `/public/marke/`.
- Never run `npm run build` while `next dev` is running against the same `.next` folder.
- `NEXT_PUBLIC_*` env vars are baked in at build time — changing one in Vercel requires a
  **fresh deployment**, not just a save.
- Branch discipline: webapp work → `ask-lisa-preview`; marketing-site work → `main`.
  The two have diverged; don't cherry-pick blindly.
