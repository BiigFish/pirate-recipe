import Link from "next/link";
import React, { cache } from "react";
import CompButton from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/app/database.types";

export const serverSupabaseCookies = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
});

export default async function LoginButton() {
  const supabase = serverSupabaseCookies();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="absolute top-2 right-2 flex gap-x-2 items-center">
      {session ? (
        <div className="text-2xl space-x-8">
          <Link href="/recipe-form">
            <button>
              d <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
          <Link href="/settings">
            <button>
              f<FontAwesomeIcon icon={faGear} />
            </button>
          </Link>
        </div>
      ) : (
        <Link href="/login">
          <CompButton>Log In</CompButton>
        </Link>
      )}
    </div>
  );
}
