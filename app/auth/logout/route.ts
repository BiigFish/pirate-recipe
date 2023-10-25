import { Database } from "@/app/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient<Database>({ cookies });

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Login error", error);
  }

  return NextResponse.redirect(`${requestUrl.origin}/login`, {
    status: 301,
  });
}
