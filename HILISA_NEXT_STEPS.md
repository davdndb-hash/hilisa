# Hi Lisa — Stand und nächste Schritte

**Stand:** 2026-10-02
**Branch:** `ask-lisa-preview` · **Live:** https://hilisa-git-ask-lisa-preview-davdndb-6604s-projects.vercel.app/lisa
**Begleitdokument:** `HILISA_BACKEND_SPEC.md` (für die Backend-Entwicklung, ausführlicher)

---

## 1. Was heute geschehen ist

Alles auf `ask-lisa-preview` und auf der Vorschau-URL live. Ein Teil davon ging zusätzlich auf `main` und damit in die Produktion — siehe 1.5.

### 1.1 Die Vorschau zeigte das falsche Geschäftsmodell

`ask-lisa-preview` lag sieben Commits hinter `main` und war damit auf dem Stand **vor** dem Pivot vom 23.09.2026. Wer die Vorschau öffnete, sah eine `/care`-Seite, den Pflegekassen-Rechner, den ModellFinder und im Seitenkopf die Zusage *„Deine Pflegekasse zahlt 131 Euro im Monat"*.

`main` ist jetzt hineingemerged. Alle Konflikte wurden zugunsten von `main` aufgelöst — es ist für alles außerhalb von `/lisa/**` die Wahrheit nach dem Pivot. Gelöscht: `app/care/page.tsx`, `components/ModellFinder.tsx`, `components/Rechner.tsx`. Dazu zwei Pflegekassen-Reste aus der App selbst: die Karte „Pflegekasse — kommt in einem späteren Schritt" auf `/lisa/profil` und der passende Kommentarblock in `lib/concierge-data.ts`. Beides beschrieb eine offene Entscheidung. Sie ist nicht offen, sie ist gestrichen.

> **Nicht zurückportiert:** die Zusammenfassung der Kontaktdaten in `lib/kontakt.ts` existiert nur auf `ask-lisa-preview`. Wer an `main` arbeitet, findet sie dort nicht.

### 1.2 Drei bestätigte Sicherheitslücken geschlossen

Alle drei wurden **im Kontext einer angemeldeten Nicht-Personal-Kundin gegen die echte Datenbank reproduziert**, bevor sie behoben wurden, und danach genauso nachgeprüft. Keine davon ist aus den Policies abgelesen.

| Lücke | Was möglich war | Behoben durch |
|---|---|---|
| `messages.von` fälschbar | Jede angemeldete Kundin konnte über die REST-API eine Nachricht mit `von = 'begleiterin'` einfügen. Die erschien im Chat, als hätte ihre Begleiterin sie geschrieben. | Policy prüft jetzt `von = 'kunde'`, dazu ein CHECK |
| Selbstzuweisung | `customers_owner_update` erlaubte das Schreiben **jeder** Spalte der eigenen Zeile, auch `assigned_companion_id`. Begleiterinnen sind für alle Angemeldeten lesbar — also konnte sich jede Kundin eine aussuchen, sich selbst zuweisen und einen Chat mit ihr öffnen. | BEFORE-UPDATE-Trigger; nur Personal darf diese Spalte ändern |
| `is_staff()` als RPC | Unter `/rest/v1/rpc/is_staff` für alle Angemeldeten aufrufbar | In ein neues Schema `private` verschoben, das PostgREST nicht veröffentlicht; in `ist_personal()` umbenannt |

Beim Trigger ging der erste Versuch schief: in einer `SECURITY DEFINER`-Funktion ist `current_user` die Eigentümerin der Funktion, nicht die aufrufende Rolle — die Prüfung lief also nie an. Die fehlerhafte Fassung steht bewusst noch in der Migrationshistorie, weil der Fehler leicht zu wiederholen ist.

Außerdem liegen Schemaänderungen ab jetzt als Dateien unter `supabase/migrations/`. Vorher lebte das Schema ausschließlich in Supabase' eigener Historie, eine geänderte RLS-Policy konnte also in keinem Pull Request auftauchen. Die fünf älteren Migrationen fehlen noch als Datei — `supabase/README.md` sagt, wie man sie nachzieht.

### 1.3 Telefon und Startbildschirm

**Warum das Passwortfeld kaputt aussah:** `input[type="password"]` stand nicht in der Feld-Selektorliste in `globals.css`. Das Feld fiel damit auf die Browser-Vorgabe zurück — sichtbar schmaler als das E-Mail-Feld darüber, und unter 16 px, weshalb iOS Safari beim Antippen in die Seite hineinzoomt. Ergänzt wurden `password`, `date`, `time`, `datetime-local`, `number` und `search`.

Weiter:

- **Safe-Area-Abstände** überall, plus `viewport-fit=cover` in `app/layout.tsx` — ohne das ist jedes `env(safe-area-inset-*)` konstant 0. Der schwebende Menüknopf saß vorher auf dem Home-Indicator des iPhones, wo die Systemgeste den Druck abfängt.
- **Der Chat hat jetzt eine eigene Scrollfläche**: Kopf oben fest, Liste scrollt, Schreibzeile unten fest. Der erste Versuch war eine haftende Schreibzeile; sie öffnete den Verlauf nicht verlässlich an der neuesten Nachricht, weil sich die Seitenhöhe noch ändert, wenn die Schriften die Ersatzschrift ablösen, und der Router zusätzlich eine Scrollposition wiederherstellt.
- **Eigene Nachrichten waren unsichtbar.** `--light-olive` ist derselbe Hexwert wie `--body-wash`. Wer was gesagt hatte, ließ sich nur an der Ausrichtung erraten. Dieselbe Falle traf die ausgewählte Anlass-Option im Anfrageformular.
- **Installierbar**: `app/manifest.ts`, Symbole in PNG (iOS ignoriert ein SVG als `apple-touch-icon` und legt stattdessen einen Screenshot der Seite auf den Startbildschirm), maskierbare Variante für Android, Kurzbefehle für „Neue Anfrage" und „Chats". Erzeugt von `scripts/pwa-icons.mjs` aus derselben Bildmarke wie `app/icon.svg`.

Zwei Fehler fielen beim Prüfen nebenbei auf: der Mikrofonknopf wechselte nie die Farbe (die CSS-Regel gab es, das Attribut setzte niemand), und `/lisa/personal` hatte vier `<select>` ohne Beschriftung (axe `select-name`, kritisch).

### 1.4 Was Kundinnen jetzt selbst können

Drei Dinge, die vorher nicht gingen:

1. **Eigene Angaben eintragen.** `/lisa/profil` war eine reine Anzeige. Name, Telefon und betreute Person kamen nur über Personal oder direktes SQL hinein — entsprechend waren bei allen vier Testkonten alle drei Felder leer. Die zugewiesene Begleiterin steht bewusst nicht im Formular, die darf nur Personal ändern.

2. **Einen echten Termin nennen.** Tag und Uhrzeit waren freier Text („z. B. Dienstag"); nichts ließ sich sortieren, erinnern oder auf Überschneidung prüfen. Jetzt Datumsfeld mit heutigem Tag als Untergrenze, Uhrzeit und Dauer, gespeichert als `starts_at timestamptz` plus `dauer_minuten`.

   Alles rechnet **ausdrücklich in Europe/Berlin**. Ohne feste Zone formatiert der Server (auf Vercel in UTC) anders als der Browser — im besten Fall ein Hydration-Fehler, im schlechtesten ein Arzttermin, der zwei Stunden danebenliegt. Die Umrechnung in `lib/termine.ts` läuft in zwei Durchgängen, weil der Zeitversatz selbst vom Zeitpunkt abhängt; gegen beide Umstellungstage 2026 geprüft.

   Das Formular zeigt außerdem, was der Termin kostet (Dauer × 42 €). Die **Anfahrtspauschale bleibt Platzhalter** — der Betrag ist nicht entschieden.

3. **Sehen, was aus einer Anfrage wurde, und sie absagen.** Eine abgeschickte Anfrage war vorher eine Sackgasse. Termine haben jetzt einen Status, `/lisa/begleiterin` listet alle mit einer Erklärung in normalem Deutsch, und es gibt ein zweistufiges Absagen.

   Das Absagen läuft über eine Datenbankfunktion, nicht über ein UPDATE: ein allgemeines Schreibrecht würde einer Kundin auch erlauben, ihren Status selbst auf „angenommen" zu setzen und sich eine Zusage vorzutäuschen, die keine Begleiterin gegeben hat.

**Geprüft:** axe-core (wcag2a + wcag2aa) null Verstöße auf allen sieben `/lisa`-Bildschirmen, kein Querüberlauf bei 320 px und 375 px, Produktionsbau läuft durch.

### 1.5 Was davon in die Produktion ging

Auf `main` (und damit live auf hilisa-omega.vercel.app) liegt **nur, was die öffentliche Website betrifft**:

- `lib/kontakt.ts` — Telefon, WhatsApp und E-Mail an 25 Stellen in 10 Dateien zusammengeführt. Die Werte sind unverändert Platzhalter; sobald es echte gibt, ändert sich **eine** Datei statt 25 Stellen.
- Die fehlenden Feldtypen im CSS-Selektor und die Tap-Highlight-Farbe.

**Nicht in der Produktion:** die Ask-Lisa-App selbst. `/lisa` und `/manifest.webmanifest` antworten dort mit 404 — nachgeprüft. Ebenfalls nicht übernommen: `viewport-fit=cover` samt Safe-Area-Abständen. Die braucht die App, weil sie einen Knopf an den unteren Bildschirmrand heftet; die Website hat kein einziges fest positioniertes Element und bekäme dadurch im Querformat nur Inhalt unter die Notch.

Nebenbei aufgeräumt: zwei Regeln, die der Telefon-Durchgang doppelt bzw. zu breit gesetzt hatte. `-webkit-text-size-adjust` stand zweimal da, und `overscroll-behavior-y: none` hing am `body` — gedacht für die App-Fläche, abgeschaltet hat es damit aber auch das Herunterziehen zum Neuladen auf den Marketing-Seiten. Jetzt auf `.lisa-schale` begrenzt.

**Die beiden Branches sind jetzt deckungsgleich**, bis auf die 14 Webapp-Commits: `ask-lisa-preview` liegt null Commits hinter `main`. Genau diese Divergenz war heute früh das erste Problem — bitte so halten.

---

## 2. Was ich von dir brauche, bevor es weitergeht

Ohne diese sechs Dinge stehen die Schritte 5 bis 7 still.

| Was | Wofür | Wo es hingehört |
|---|---|---|
| **SMS-Zugangsdaten** — Twilio (oder MessageBird/Vonage): Account SID, Auth Token, Absendernummer | Telefon-Anmeldung. Ohne das kann kein Code verschickt und keine einzige Anmeldung getestet werden. SMS nach Deutschland kosten pro Nachricht — einplanen. | Supabase → Authentication → Providers → Phone |
| **Transaktionsmails** — Resend oder Postmark: API-Key plus eine Domain, deren DNS du setzen kannst | Alle Benachrichtigungen. Der eingebaute Supabase-Versand ist durchsatzbegrenzt und nicht produktionstauglich. | Vercel-Umgebungsvariable + Supabase SMTP |
| **Anthropic API-Key** und eine monatliche Obergrenze | Lisas Chat. Ausschließlich serverseitig, **niemals** als `NEXT_PUBLIC_`. | Vercel, Scope Preview |
| **Echte Telefonnummer, WhatsApp-Nummer, E-Mail-Adresse** | `lib/kontakt.ts` steht auf Platzhaltern, jeder `tel:`-Knopf zeigt auf `+4989000000`. | `lib/kontakt.ts` |
| **Eine echte Domain** | `metadataBase` ist wörtlich `hilisa.example`. Das bricht Open-Graph-Vorschauen, `start_url` im Manifest und Links in E-Mails. | `app/layout.tsx` |
| **Freigabe für neue npm-Pakete** — `resend`, `@anthropic-ai/sdk`, `zod` | Hausregel ist, vorher zu fragen. Die PWA brauchte keins. | — |

**Zwei Minuten im Supabase-Dashboard, die nur du machen kannst:**

- **Leaked-Password-Protection einschalten** (Authentication → Policies). Der einzige noch offene Sicherheitshinweis; über die API nicht erreichbar.
- **Personal-Zugang für `davdndb@gmail.com`.** Das steht seit der Sitzung vom 16.09. aus:
  ```sql
  insert into public.staff (id, name) values
    ('eb95766d-e4aa-4396-9725-48b127866434', 'David')
  on conflict (id) do nothing;
  ```

---

## 3. Anmeldung — entschieden, aber vertagt

**Entschieden am 2.10.2026:** passwortlos über **Telefonnummer + sechsstelligen SMS-Code**. Das Geburtsdatum wird **bei der Registrierung** erhoben, nicht als Zugangsdatum — dort tut es die Arbeit, die es bei Papa tatsächlich tut: die Beziehung festlegen („ich buche für mich" vs. „für eine andere Person") samt Vollmachtsbestätigung und deren Zeitstempel.

Die wörtliche Papa-Variante (Telefonnummer + Geburtsdatum *als* Zugang) ist damit vom Tisch. Sie wären zwei erratbare Angaben als einziger Schutz gewesen, Supabase Auth kann das nicht von sich aus, und es hätte eine eigene Route gebraucht, die Sitzungen mit dem Service-Role-Key ausstellt — für eine App, die später die Wohnadresse einer pflegebedürftigen Person hält.

**Gebaut wird das vorerst nicht.** Bis dahin bleibt E-Mail + Passwort in Betrieb. Zwei Dinge gehören deshalb weiterhin erledigt, auch wenn die Anmeldung später ersetzt wird:

- **Leaked-Password-Protection einschalten** (siehe Abschnitt 2). Solange Passwörter im Einsatz sind, zählt das.
- **E-Mail-Bestätigung ist weiterhin aus.** Sie wurde in der Entwicklung abgeschaltet, weil der eingebaute Supabase-Versand Platzhalterdomains ablehnt. Vor echten Nutzerinnen muss sie an — oder die Telefon-Anmeldung muss bis dahin stehen. Es gibt außerdem **kein Passwort-Zurücksetzen**; wer sein Passwort vergisst, braucht dich im Supabase-Dashboard.

## 4. Die Reihenfolge von hier an

### Schritt 3 — Datenmodell (1–2 Wochen)

Jetzt die Änderungen, die Daten verlieren, und die, die auf eine Begleiterinnen-Ansicht hinarbeiten:

- `datum`/`uhrzeit` (Text) löschen, sobald keine Zeile mehr `starts_at = null` hat. Heute ist das genau eine Altzeile („Mittwoch", „11:15").
- `customers.assigned_companion_id` durch eine Tabelle `preferred_companions` ersetzen (viele-zu-viele mit Rang). Eine fest zugewiesene Begleiterin bricht in dem Moment, in dem sie krank ist, Urlaub hat oder ausgebucht ist. Papas Antwort: Wunsch-Begleiterin zuerst, Pool als Rückfall.
- `betreute_person` (ein Textfeld) zu einer Tabelle `care_recipients` ausbauen, mit Adresse. **Die Adresse wird erst freigegeben, wenn ein Einsatz zustande gekommen ist** — das ist eine Zugriffsregel in RLS, kein ausgeblendetes Feld in React.
- `companions` an `auth.users` hängen. Heute kann sich eine Begleiterin schlicht nicht anmelden.
- `service_categories`, gefüllt aus den Kategorien, die auf der Website schon stehen.
- **Ein Staging-Projekt anlegen.** Es gibt keins. Jede Migration geht direkt auf die Produktion.

### Schritt 5 — Anmeldung und Benachrichtigungen *(blockiert, siehe Abschnitt 2 und 3)*

Telefon-Anmeldung, dazu ein Postfach-Tabelle für Benachrichtigungen (eine Tabelle, damit Wiederholversuche und Nachvollziehbarkeit möglich sind) und die ersten Anlässe: Anfrage eingegangen, Angebot raus, Zusage, Absage, Erinnerung 24 h vorher.

### Schritt 6 — Begleiterinnen-Ansicht (2–3 Wochen)

Das größte Loch. Ohne sie bleibt der Chat einseitig und kann keine Anfrage je angenommen werden.

Nach deinen Entscheidungen: **Begleiterinnen registrieren sich selbst**, und offene Einsätze laufen über ein **Angebots-/Annahme-Brett** statt über Zuteilung. Zur Selbstregistrierung ein Hinweis, der in den Build gehört: der Führungszeugnis-Nachweis und die 30 Schulungseinheiten sind Voraussetzung für den ersten Einsatz. Wenn die Anmeldung offen ist, muss die Prüfung an anderer Stelle greifen — über ein Statusfeld (`bewerbung → geschult → aktiv`), das darüber entscheidet, wer überhaupt Einsätze sieht. Sonst meldet sich jemand an und steht nächste Woche in einer fremden Wohnung.

Die Dreijahres-Wiedervorlage des Führungszeugnisses ist eine Zusage, die auf `/mitarbeiten` öffentlich steht. Sie braucht einen geplanten Job, keine Tabelle.

### Schritt 7 — Lisa *(blockiert auf den API-Key)*

Serverroute, Streaming, Werkzeugaufrufe auf dieselben Funktionen, die auch das Formular benutzt, KI-Hinweis nach EU-AI-Act, Kostenbudget. **Nicht auf dem kritischen Pfad**: Papa wickelt über 3 Mio. Besuche ohne jede KI-Schicht ab, mit einem Formular und einer Telefonnummer.

### Querschnitt, nicht aufschieben

- **DSGVO.** Deutscher Markt, Daten über eine schutzbedürftige dritte Person, die nicht die Kontoinhaberin ist, bald dazu Wohnadressen. Nötig sind mindestens: Rechtsgrundlage je Feld, Löschfristen, Auskunft und echte Löschung, ein AV-Vertrag mit Supabase, ein Protokoll darüber, wer eine Adresse gesehen hat. Die Datenschutzseite muss danach neu geschrieben werden — **diesen Text nicht von mir schreiben lassen.**
- **Scheinselbständigkeit.** Begleiterinnen arbeiten auf Honorarbasis. Ein von uns gesetzter Satz, von uns verteilte Arbeit, von uns verlangte Schulung und erzwungenes Einchecken sind genau die Merkmale, auf die die Deutsche Rentenversicherung schaut. Das Angebots-/Annahme-Brett ist die risikoärmere Form, aber die Frage gehört zu einer Anwältin.
- Ratenbegrenzung auf jedem öffentlichen Endpunkt. Fehlerverfolgung (Sentry). Tests. Es gibt bisher nichts davon.
- `components/Rueckruf.tsx` auf **`main`** verschickt nach wie vor nichts.

---

## 5. Entscheidungen, die nur du treffen kannst

Die Papa-Antwort steht dabei, wo es eine gibt — als Beleg, nicht als Urteil.

| Frage | Papa |
|---|---|
| Anfahrtspauschale — welcher Betrag? | In den Stundensatz eingerechnet |
| Mindestbuchung bei 2 Stunden lassen oder auf 1 senken? | **1 Stunde, danach minutengenau** — und sie bewerben es als Vorteil |
| Erste Stunde gratis als Einstieg? | **Ja**, das ist ihre Schlagzeile |
| Abrechnung: Vorautorisierung oder Rechnung danach? | **Rechnung per E-Mail, 30 Tage, bei Nichtzahlung Konto einfrieren** |
| Ist die Leistung umsatzsteuerpflichtig? | Frage an die Steuerberatung, blockiert die Rechnungsstellung |
| Absage- und Nichterscheinen-Regel? | Nicht veröffentlicht |
| Was „Radar" im Menü bedeuten soll | — (steht weiterhin als „Bald verfügbar" da) |

---

## 6. Was man wissen sollte, bevor man etwas anfasst

- **Deutsche Oberfläche, Duzen.** Enterprise siezt, diese App nicht. Bezeichner und Kommentare im Code ebenfalls deutsch.
- **Keine Rechts-, Preis- oder Abrechnungstexte erfinden.** Platzhalterform „… eintragen" benutzen und melden.
- **Keine neuen npm-Pakete ohne Rückfrage.**
- **axe-core nach jedem Bildschirm**, Desktop und ~390 px, null Verstöße.
- **Keine öffentlichen Dateien unter `/public/lisa/`** — der Middleware-Matcher `/lisa/:path*` fängt sie ab und leitet zur Anmeldung um. `/public/marke/` benutzen.
- **`npm run build` nie laufen lassen, während `next dev` auf demselben `.next` arbeitet.** Zwei Entwicklungsserver gleichzeitig auf demselben Ordner übrigens auch nicht — genau das war heute der Fall und erzeugt die beschriebenen Geistererscheinungen.
- **`NEXT_PUBLIC_*` wird beim Bauen eingebacken.** Eine Änderung in Vercel braucht ein frisches Deployment, nicht nur ein Speichern.
- **Branch-Disziplin:** Webapp → `ask-lisa-preview`, Website → `main`.

### Testkonten

`testfamilie2@gmail.com` (Personal, hat Begleiterin und Termine), `gewoehnlichekundin@gmail.com` (normale Kundin, zum Prüfen der Personal-Sperre), `davdndb@gmail.com` (deins, noch kein Personal). Passwort wie gehabt.

> Diese Konten sind reine Testdaten. Sobald die Telefon-Anmeldung steht, verlieren sie ohnehin ihren Zweck — und **vor dem ersten echten Kunden gehören sie gelöscht**, zusammen mit den Beispielnachrichten im Chat.
