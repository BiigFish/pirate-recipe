import { Database } from "@/app/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const supabase = createRouteHandlerClient<Database>({ cookies });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("sign out error", error);
    }
  }

  return NextResponse.redirect(new URL("/", req.url), {
    status: 302,
  });
}
