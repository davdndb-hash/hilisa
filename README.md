# Hi Lisa — Website (Entwurf)

Rohentwurf der MVP-Seite. Next.js 15 (App Router), TypeScript, keine weiteren Abhängigkeiten.

## Seitenaufbau

Die Seite erklärt die drei Geschäftsmodelle als drei Wege, die sich nur darin
unterscheiden, **wer bezahlt**. Was Hi Lisa macht, ist in allen drei Fällen dasselbe.

| Route | Modell | Zahler | Anrede |
|---|---|---|---|
| `/` | Übersicht, Modell-Finder, Leistungen, Vertrauen, Mitarbeiten, Fragen | — | du |
| `/care` | Hi Lisa Care | Pflegekasse (§ 45b/§ 45a SGB XI) | du |
| `/privat` | Hi Lisa Privat | Selbstzahler | du |
| `/fuer-betriebe` | Hi Lisa Enterprise | Partnerbetrieb (White-Label) | Sie |
| `/mitarbeiten` | Stellenseite für Alltagsbegleiterinnen | — | du |
| `/blatt/kunden`, `/blatt/bewerber`, `/blatt/partner` | Druckvorlagen der drei Ein-Blatt-Übersichten | — | Sie |
| `/impressum`, `/datenschutz` | Rechtliches | — | — |

Jede Zweigseite hat denselben Aufbau: für wen · was es kostet · so läuft es ab ·
**was das für Begleiterinnen bedeutet** · Fragen · die beiden anderen Wege · Rückruf.
Der Abschnitt für Begleiterinnen ist der Job-Teil — er beantwortet, was der Zweig für
die Mitarbeiterin heißt, nicht nur für die Kundin.

Alles, was über die drei Zweige gesagt wird — Name, Zahler, Preis, für wen —
steht in **`lib/zweige.ts`**. Übersichtskarten, Finder, Navigation und Fußzeile lesen
von dort. Preise oder Bezeichnungen also dort ändern, nicht an sieben Stellen.

Wiederverwendbare Blöcke liegen in `components/Bausteine.tsx`. Der Modell-Finder
(`components/ModellFinder.tsx`) stellt zwei Fragen und nennt genau einen Weg —
mit echten Radiogruppen, damit Pfeiltasten und Vorleseprogramme funktionieren.

## Die drei Ein-Blatt-Übersichten

Eine Seite A4 je Zielgruppe, zum Ausdrucken, Aushängen und Weitergeben:

| PDF in `public/` | Für wen | Wo verlinkt |
|---|---|---|
| `hi-lisa-blatt-kunden.pdf` | Angehörige und Kundinnen | `/`, `/care`, `/privat`, Fußzeile |
| `hi-lisa-blatt-bewerber.pdf` | Bewerberinnen, zum Aushängen | `/mitarbeiten` |
| `hi-lisa-blatt-partner.pdf` | Partnerbetriebe, zum Weitergeben | `/fuer-betriebe` |

Warum überhaupt Papier: Internetnutzung in der Altersgruppe 78+ liegt bei 42 Prozent,
und 30 Prozent der Nichtnutzer lassen Angehörige alles Digitale erledigen
(D21-Digital-Index). Die Hälfte dieses Marktes wird nicht über eine Website erreicht.
Auf jedem Blatt ist die Telefonnummer nach der Überschrift das Größte.

### Neu erzeugen

Die PDFs sind aus den Routen `/blatt/…` gedruckt, damit Inhalt und Gestaltung **eine**
Quelle haben. Ändert sich eine Formulierung oder ein Preis, wird neu gedruckt:

```bash
npm run build
npx next start -p 4000 &
npm run blatt-pdf          # schreibt nach public/
```

Regeln, die auf dem Blatt gelten und auf dem Bildschirm nicht:

- **Alles auf eine Seite.** `.blatt` ist auf 297 mm Höhe fixiert und hat
  `overflow: hidden` — was in der Bildschirmvorschau abgeschnitten aussieht, ist auch
  im PDF abgeschnitten. Zwei Seiten heißt in der Praxis: die zweite geht verloren.
- **Der Seitenrand steckt als `padding` im Blatt**, nicht in `@page` und nicht in den
  Optionen von `page.pdf()`. Zwei Quellen für denselben Rand waren der Grund, warum
  die ersten Fassungen unbemerkt auf zwei Seiten liefen.
- **Das Raster ist zweispaltig, die Zeilenhöhe ist die des höheren Kindes.** Der
  höchste Block (die Partnertabelle) läuft deshalb über die ganze Breite, und
  ähnlich hohe Spalten stehen nebeneinander. Falsch gepaart kostet das 40 mm.
- **Die Spalten sind `<section>`-Elemente** und würden sonst die 72 px
  Abschnittspolsterung der Website erben — 38 mm Luft je Rasterzeile.
  `.blatt section { padding: 0 }` schaltet das ab.
- Kundenblatt 11 pt Fließtext; Bewerber- und Partnerblatt dürfen über
  `.blatt-kompakt` einen halben Punkt kleiner setzen, weil sie am Schreibtisch
  gelesen werden.

## Marke

Farben, Radien, Schriftgrößen und Sprache folgen dem **Hi Lisa Brand Guide v1.0
(September 2026)**. Die Token stehen an einer Stelle: `app/globals.css`.
Änderungen an Farben, Logo oder Schriftarten nur nach Abstimmung.

| Token | Hex | Verwendung |
|---|---|---|
| Fresh Olive | `#7C8A2A` | Große Flächen ohne Text, Linien, Marker |
| Deep Olive | `#6D7925` | **Abweichung, abzustimmen:** olive Flächen mit Text, oliver Text, Primärbuttons |
| Clear Lilarosa | `#D64FB0` | Aktionen, Marker, Hervorhebungen |
| Soft Rose | `#F6C7E8` | Karten, Badges |
| Light Olive | `#E2EBB4` | Text auf Olive, Flächen zweiter Ordnung |
| Ink | `#191B0D` | Alle Texte auf hellem Grund |
| Paper | `#FCFBF7` | Standard-Hintergrund |

Regeln, die im Code durchgesetzt sind:

- **Lilarosa nie mit weißem Text.** `.btn-accent` setzt Ink auf Lilarosa.
- **Kein rosa Text auf Paper.** Rosa erscheint nur als Fläche.
- Fließtext nie unter 18 px (Basis ist 19 px), Bedienelemente nie unter 44 px (hier 52 px).
- **Kein abgeschwächter Text auf oliver Fläche.** Jede Transparenz drückt den Kontrast
  unter 4,5:1.
- Radien: 10 px Bedienelemente, 16 px Karten, 28 px Bildschirmflächen.
- Schriften: Bricolage Grotesque (Überschriften, Wortmarke, Zahlen über 24 px),
  Manrope (alles andere).

## Barrierefreiheit

Geprüft mit axe-core (WCAG 2.1 A und AA plus Best Practices) auf allen sechs Routen,
bei 1280 px und bei 390 px: **null Verstöße**.

Zwei Dinge mussten dafür vom Brand Guide abweichen — beide sind mit dem Markeninhaber
abzustimmen:

1. **Fresh Olive `#7C8A2A` reicht für Text nicht.** Kleiner oliver Text auf Paper und
   Papiertext auf oliver Fläche kommen nur auf 3,67:1, gefordert sind 4,5:1
   (WCAG 1.4.3). Derselbe Farbton 12 Prozent dunkler — `#6D7925`, im Code
   `--olive-ink` und `--olive-deep` — erreicht 4,6:1 in beide Richtungen.
   Fresh Olive bleibt für Flächen ohne Text, Linien und Marker.
2. **Light Olive als Label auf Olive** erreicht nur 3,8:1. Labels auf oliver Fläche
   sind daher Paper.

Weiteres, was im Code steht und nicht wegoptimiert werden darf:

- Sprunglink zum Inhalt, sichtbar sobald er den Fokus hat
- Menü auf dem Telefon mit `aria-expanded`, Escape und Klick außerhalb
- Die Musterrechnung auf `/fuer-betriebe` scrollt seitwärts und ist deshalb
  mit `tabIndex` und Namen als Bereich erreichbar
- Das Ergebnis des Modell-Finders liegt in einem `aria-live`-Bereich
- Fußzeilenlinks sind Navigation, keine Fußnoten: mindestens 44 px hoch

## Datenschutz

`next/font` lädt Bricolage Grotesque und Manrope **zur Bauzeit** herunter und liefert
sie von der eigenen Domain. Es geht keine IP-Adresse an Google — das war der Streitpunkt
im Urteil des LG München I (3 O 17493/20). Es werden keine Cookies gesetzt und kein
Analytics geladen, deshalb braucht die Seite **kein Cookie-Banner**.

## Was noch fehlt

- [ ] Telefonnummer, Firmierung, Adresse und Preise eintragen (überall als Platzhalter markiert)
- [ ] Rückrufformular an ein Postfach oder CRM anbinden (`app/api/rueckruf/route.ts`)
- [ ] Impressum und Datenschutzerklärung anwaltlich prüfen lassen
- [ ] Bildmarke von einer Grafikerin als saubere Vektordatei nachziehen lassen
- [ ] Echte Fotos statt keiner Fotos — Stockbilder schaden hier dem Vertrauen
- [ ] `robots: noindex` in `app/layout.tsx` entfernen, wenn die Seite live geht
- [ ] Privaten Stundenpreis in `lib/zweige.ts` eintragen (steht dort als `Preis eintragen`)
- [ ] Stadtteile in der Frageliste auf `/` eintragen
- [ ] Abweichung von Fresh Olive zu Deep Olive für Text mit dem Markeninhaber abstimmen
- [ ] Stundenlohn auf `/mitarbeiten` und im Bewerberblatt eintragen, sobald die
      arbeitsrechtliche Einordnung geklärt ist — beide Stellen sagen bis dahin
      bewusst „wir nennen die Zahl im Erstgespräch"
- [ ] Nach jeder Textänderung an einem Blatt: `npm run blatt-pdf` und prüfen, dass
      die PDFs einseitig bleiben

## Entwicklung

```bash
npm install
npm run dev            # http://localhost:3000
npm run build
npm run blatt-pdf      # PDFs der Ein-Blatt-Übersichten neu drucken
```

Die Blätter lassen sich unter `/blatt/kunden`, `/blatt/bewerber` und `/blatt/partner`
im Browser prüfen — sie liegen dort als Blatt auf grauem Grund, in der Größe, in der
sie gedruckt werden.
