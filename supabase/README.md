# Datenbank-Migrationen

Bis zum 2.10.2026 lebte das Schema ausschließlich in Supabase' eigener
Migrationshistorie. Schemaänderungen waren damit nicht reviewbar: niemand
konnte in einem Pull Request sehen, dass sich eine RLS-Policy geändert hat.

Ab hier liegt jede neue Migration zusätzlich als Datei in `migrations/`.

## Die fünf älteren Migrationen nachziehen

Sie stehen noch nur in Supabase. Einmalig mit der CLI herunterladen — dafür
braucht es das Datenbank-Passwort aus dem Supabase-Dashboard
(Settings → Database):

```bash
npx supabase link --project-ref eiqtrjutjwoceilpdhmi
npx supabase db pull
```

Das legt die fehlenden Dateien an:

| Version | Name |
|---|---|
| 20260916100301 | concierge_schema |
| 20260916100323 | lock_down_handle_new_user_rpc |
| 20260916102619 | staff_and_assignment |
| 20260916102653 | lock_down_is_staff_from_anon |
| 20260916102810 | customers_email_for_staff_identification |

## Neue Migrationen

Nicht von Hand im SQL-Editor schreiben. Stattdessen:

```bash
npx supabase migration new <name>
# Datei bearbeiten, dann
npx supabase db push
```

## Noch offen

Es gibt kein Staging-Projekt. Jede Migration geht direkt auf die Produktion,
und es gibt keinen Ort, an dem man sie vorher ausprobieren könnte. Das sollte
sich vor dem ersten echten Kunden ändern.
