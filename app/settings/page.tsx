import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../database.types";
import AccountForm from "./settings-form";
import { cache } from "react";

// export const runtime = "edge";
// export const dynamic = "force-dynamic";

export const serverSupabaseCookies = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export default async function Account() {
  const supabase = serverSupabaseCookies();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AccountForm session={session} />;
}
