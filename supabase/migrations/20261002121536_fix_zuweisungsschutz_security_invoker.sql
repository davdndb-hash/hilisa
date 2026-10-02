-- Der Trigger aus der vorigen Migration hat nicht gegriffen: in einer
-- SECURITY DEFINER-Funktion ist current_user die Eigentuemerin der Funktion
-- (postgres), nicht die aufrufende Rolle. Die Bedingung
-- "current_user = 'authenticated'" war damit nie wahr.
--
-- SECURITY INVOKER behebt das — die Funktion braucht selbst keine erhoehten
-- Rechte, sie prueft nur und wirft. Der Lesezugriff auf public.staff liegt in
-- private.ist_personal(), die weiterhin SECURITY DEFINER ist.
--
-- Die Pruefung auf current_user laesst Zugriffe durch, die nicht ueber
-- PostgREST als angemeldete Person kommen (service_role, SQL-Editor) — sonst
-- koennte niemand mehr per Hand eine Zuweisung korrigieren. Die geschachtelte
-- Form stellt sicher, dass ist_personal() fuer diese Rollen gar nicht erst
-- aufgerufen wird; sie haben keine USAGE-Rechte auf dem Schema private.
create or replace function private.zuweisung_nur_durch_personal()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  if new.assigned_companion_id is distinct from old.assigned_companion_id
     and current_user = 'authenticated' then
    if not private.ist_personal() then
      raise exception 'assigned_companion_id darf nur von Hi-Lisa-Personal geaendert werden'
        using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;
