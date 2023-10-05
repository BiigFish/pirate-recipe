"use client";

import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { DropdownMenuItem } from "./dropdown";
import { cn } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Props {
  icon: IconDefinition;
  text: string;
  link?: string;
  signout?: boolean;
}

const LoginButtonItem: React.FC<Props> = ({ icon, text, link, signout }) => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <Link href={link || ""}>
      <DropdownMenuItem
        className={cn(
          "hover:bg-black hover:text-white",
          signout && "hover:bg-red-400 hover:text-white"
        )}
      >
        {signout ? (
          <button
            onClick={handleSignOut}
            className="text-lg flex justify-between items-center w-full"
          >
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
          </button>
        ) : (
          <button className="text-lg flex justify-between items-center w-full">
            <FontAwesomeIcon icon={icon} />
            <span>{text}</span>
          </button>
        )}
      </DropdownMenuItem>
    </Link>
  );
};

export default LoginButtonItem;
