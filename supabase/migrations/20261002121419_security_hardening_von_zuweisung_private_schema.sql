-- Hi Lisa — drei bestaetigte Luecken schliessen.
-- Alle drei wurden vorher per Testlauf im Kontext einer normalen Kundin
-- nachgewiesen, nicht nur aus den Policies abgelesen.

-- ---------------------------------------------------------------- 1. private
-- Hilfsfunktionen gehoeren nicht in public: PostgREST veroeffentlicht public
-- als REST-API, damit war is_staff() unter /rest/v1/rpc/is_staff aufrufbar.
create schema if not exists private;
revoke all on schema private from anon, authenticated;
grant usage on schema private to authenticated;

create or replace function private.ist_personal()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.staff where id = (select auth.uid()));
$$;

revoke all on function private.ist_personal() from public, anon;
grant execute on function private.ist_personal() to authenticated;

-- Policies auf die neue Funktion umhaengen.
drop policy if exists "companions_staff_insert" on public.companions;
create policy "companions_staff_insert" on public.companions
  for insert to authenticated with check (private.ist_personal());

drop policy if exists "companions_staff_update" on public.companions;
create policy "companions_staff_update" on public.companions
  for update to authenticated using (private.ist_personal());

drop policy if exists "customers_staff_select" on public.customers;
create policy "customers_staff_select" on public.customers
  for select to authenticated using (private.ist_personal());

drop policy if exists "customers_staff_update" on public.customers;
create policy "customers_staff_update" on public.customers
  for update to authenticated using (private.ist_personal());

drop function if exists public.is_staff();

-- ------------------------------------------------------------ 2. messages.von
-- Vorher konnte jede angemeldete Kundin ueber die REST-API eine Nachricht mit
-- von = 'begleiterin' einfuegen. Die erschien im Chat so, als haette ihre
-- Begleiterin sie geschrieben.
alter table public.messages drop constraint if exists messages_von_gueltig;
alter table public.messages
  add constraint messages_von_gueltig check (von in ('kunde', 'begleiterin'));

drop policy if exists "messages_owner_insert" on public.messages;
create policy "messages_owner_insert" on public.messages
  for insert to authenticated
  with check (customer_id = (select auth.uid()) and von = 'kunde');
-- Die Gegenrichtung (von = 'begleiterin') bekommt eine eigene Policy, sobald
-- Begleiterinnen ein eigenes Login haben. Bis dahin kann sie niemand setzen.

-- --------------------------------------------- 3. Selbstzuweisung Begleiterin
-- customers_owner_update erlaubte der Kundin, jede Spalte ihrer eigenen Zeile
-- zu aendern — auch assigned_companion_id. Companions sind fuer alle
-- Angemeldeten lesbar, also konnte sich jede Kundin selbst eine Begleiterin
-- zuweisen und einen Chat mit ihr oeffnen. Spaltenweise Rechte helfen nicht,
-- weil Personal dieselbe Rolle 'authenticated' hat — deshalb ein Trigger.
create or replace function private.zuweisung_nur_durch_personal()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.assigned_companion_id is distinct from old.assigned_companion_id
     and current_user = 'authenticated'
     and not private.ist_personal() then
    raise exception 'assigned_companion_id darf nur von Hi-Lisa-Personal geaendert werden'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

drop trigger if exists customers_zuweisung_schuetzen on public.customers;
create trigger customers_zuweisung_schuetzen
  before update on public.customers
  for each row execute function private.zuweisung_nur_durch_personal();
