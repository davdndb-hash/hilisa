import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/supabase/types";

/**
 * Supabase-Verbindung für Server-Komponenten und Route Handler. Liest/
 * schreibt die Sitzung über Cookies — deshalb `async`, `cookies()` ist in
 * Next.js 15 ein Promise.
 */
export async function serverClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Aufruf aus einer Server Component ohne Schreibzugriff auf
            // Cookies — die Middleware erneuert die Sitzung ohnehin.
          }
        },
      },
    }
  );
}
