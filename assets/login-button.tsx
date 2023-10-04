"use client";
import { useUserData } from "@/hooks/useUserData";
import Link from "next/link";
import React from "react";
import CompButton from "./button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faPlus } from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {
  const userId = useUserData()?.id;

  return (
    <div className="absolute top-2 right-2 flex gap-x-2 items-center">
      {userId ? (
        <div className="text-2xl space-x-8">
          <Link href="/recipe-form">
            <button>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </Link>
          <Link href="/settings">
            <button>
              <FontAwesomeIcon icon={faGear} />
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
};

export default LoginButton;
