import React, { cache } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faHamburger,
  faPlus,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/app/database.types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown";
import LoginButtonItem from "./login-button-item";

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
      <DropdownMenu>
        <DropdownMenuTrigger className="text-lg">
          Menu <FontAwesomeIcon icon={faHamburger} />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {session ? (
            <>
              <LoginButtonItem
                text="Create"
                icon={faPlus}
                link="/recipe-form"
              />
              <LoginButtonItem text="Settings" icon={faGear} link="/settings" />
              <LoginButtonItem
                text="Logout"
                icon={faRightFromBracket}
                signout
              />
            </>
          ) : (
            <LoginButtonItem
              text="Login"
              icon={faRightFromBracket}
              link="/login"
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
