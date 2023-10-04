"use client";
import { useState, useEffect } from "react";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Database } from "@/app/database.types";

export function useUserData() {
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    console.log("fetch user");
    const fetchUserData = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else {
        setUser(user);
      }
    };

    fetchUserData();
  }, []);

  return user;
}
