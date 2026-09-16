import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Erneuert die Supabase-Sitzung bei jedem Aufruf und schützt /lisa/* — wer
 * nicht angemeldet ist, landet auf /lisa/anmelden. Die Anmeldeseite selbst
 * bleibt offen, sonst könnte sich niemand einloggen.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const istAnmeldeSeite = request.nextUrl.pathname === "/lisa/anmelden";
  const istGeschuetzt = request.nextUrl.pathname.startsWith("/lisa");

  if (istGeschuetzt && !istAnmeldeSeite && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/lisa/anmelden";
    return NextResponse.redirect(url);
  }

  if (istAnmeldeSeite && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/lisa";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/lisa/:path*"],
};
