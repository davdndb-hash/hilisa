# Hi Lisa — Website (Entwurf)

Rohentwurf der MVP-Seite. Next.js 15 (App Router), TypeScript, keine weiteren Abhängigkeiten.

## Marke

Farben, Radien, Schriftgrößen und Sprache folgen dem **Hi Lisa Brand Guide v1.0
(September 2026)**. Die Token stehen an einer Stelle: `app/globals.css`.
Änderungen an Farben, Logo oder Schriftarten nur nach Abstimmung.

| Token | Hex | Verwendung |
|---|---|---|
| Fresh Olive | `#7C8A2A` | Große Flächen, Header, Primärbuttons |
| Clear Lilarosa | `#D64FB0` | Aktionen, Marker, Hervorhebungen |
| Soft Rose | `#F6C7E8` | Karten, Badges |
| Light Olive | `#E2EBB4` | Text auf Olive, Flächen zweiter Ordnung |
| Ink | `#191B0D` | Alle Texte auf hellem Grund |
| Paper | `#FCFBF7` | Standard-Hintergrund |

Regeln, die im Code durchgesetzt sind:

- **Lilarosa nie mit weißem Text.** `.btn-accent` setzt Ink auf Lilarosa.
- **Kein rosa Text auf Paper.** Rosa erscheint nur als Fläche.
- Fließtext nie unter 18 px (Basis ist 19 px), Bedienelemente nie unter 44 px (hier 52 px).
- Radien: 10 px Bedienelemente, 16 px Karten, 28 px Bildschirmflächen.
- Schriften: Bricolage Grotesque (Überschriften, Wortmarke, Zahlen über 24 px),
  Manrope (alles andere).

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

## Entwicklung

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```
