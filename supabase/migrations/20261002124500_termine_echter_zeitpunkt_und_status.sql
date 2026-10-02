-- Termine bekommen einen echten Zeitpunkt, eine Dauer und einen Status.
--
-- Bewusst additiv: datum und uhrzeit (beide text, beide not null) bleiben
-- stehen und werden weiter befuellt. Die eine Altzeile sagt "Mittwoch" /
-- "11:15" — daraus laesst sich kein Datum rekonstruieren, also behaelt sie
-- ihren Text und starts_at bleibt null. Die Oberflaeche faellt fuer solche
-- Zeilen auf den alten Text zurueck. Erst wenn keine Zeile mehr starts_at
-- null hat, koennen die beiden Textspalten weg — das ist dann eine eigene,
-- loeschende Migration und braucht eine eigene Entscheidung.

create type public.terminstatus as enum (
  'angefragt',   -- Kundin hat angefragt, Hi Lisa hat es noch nicht verteilt
  'angeboten',   -- an eine oder mehrere Begleiterinnen rausgegeben
  'angenommen',  -- eine Begleiterin hat zugesagt
  'abgelehnt',   -- niemand konnte, zurueck an Hi Lisa
  'laeuft',      -- Einsatz hat begonnen
  'erledigt',
  'storniert'
);

alter table public.appointments
  add column starts_at timestamptz,
  add column dauer_minuten integer not null default 120,
  add column status public.terminstatus not null default 'angefragt';

-- "ab zwei Stunden" steht so auf /privat und in lib/zweige.ts. Sollte das
-- Minimum auf eine Stunde sinken (offene Frage im Backend-Spec, §12.3), ist
-- das hier die eine Zeile, die sich aendert.
alter table public.appointments
  add constraint appointments_mindestens_zwei_stunden check (dauer_minuten >= 120);

create index appointments_kundin_zeitpunkt_idx
  on public.appointments (customer_id, starts_at desc nulls last);

-- -------------------------------------------------------------- Stornieren
-- Kein allgemeines UPDATE-Recht fuer Kundinnen: damit koennten sie ihren
-- Termin selbst auf 'angenommen' setzen und sich eine Zusage vortaeuschen,
-- die es nicht gibt. Stattdessen genau dieser eine Weg, der nur in Richtung
-- 'storniert' fuehrt. Die Funktion liegt in public, weil sie als
-- /rest/v1/rpc/termin_stornieren erreichbar sein soll — anders als die
-- Hilfsfunktion private.ist_personal().
create or replace function public.termin_stornieren(p_termin uuid)
returns public.appointments
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_termin public.appointments;
begin
  select * into v_termin from public.appointments where id = p_termin;

  if not found then
    raise exception 'Termin nicht gefunden' using errcode = 'P0002';
  end if;

  if v_termin.customer_id <> (select auth.uid()) and not private.ist_personal() then
    raise exception 'Kein Zugriff auf diesen Termin' using errcode = '42501';
  end if;

  if v_termin.status in ('erledigt', 'storniert') then
    raise exception 'Dieser Termin laesst sich nicht mehr stornieren'
      using errcode = '22023';
  end if;

  update public.appointments
     set status = 'storniert'
   where id = p_termin
  returning * into v_termin;

  return v_termin;
end;
$$;

revoke all on function public.termin_stornieren(uuid) from public, anon;
grant execute on function public.termin_stornieren(uuid) to authenticated;
