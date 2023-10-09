"use client";
import { useCallback, useEffect, useState } from "react";
import { Database } from "../database.types";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/assets/modal";
import CompButton from "@/assets/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [usernameTemp, setUsernameTemp] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if (!user?.id) {
        throw new Error("You must be logged in to get your profile");
      }

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        username: usernameTemp,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      setUsername(usernameTemp);
      setOpen(false);
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }
  const modalChange = () => {
    setOpen(!open);
    setUsernameTemp("");
  };

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Settings</h1>
      <div className="flex gap-x-4">
        <p className="font-bold">Email:</p>
        <p>{session?.user.email}</p>
      </div>
      <div className="flex gap-x-4">
        <p className="font-bold">Username:</p>
        <div className="flex gap-x-2">
          <p>{username}</p>
          <Dialog open={open} onOpenChange={modalChange}>
            <DialogTrigger>
              <div className="border border-slate-600 text-slate-600 hover:bg-slate-600 hover:text-white rounded-lg px-1">
                <FontAwesomeIcon icon={faPenToSquare} className="mr-1" />
                Edit
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Username</DialogTitle>
              </DialogHeader>
              <div>
                <label htmlFor="username">Username: </label>
                <input
                  id="username"
                  className="border border-black rounded-md px-2 py-1"
                  type="text"
                  value={usernameTemp || ""}
                  onChange={(e) => setUsernameTemp(e.target.value)}
                />
              </div>
              <DialogFooter>
                <CompButton onClick={() => setOpen(false)}>Cancel</CompButton>
                <CompButton onClick={updateProfile}>Save changes</CompButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <CompButton type="submit">Sign out</CompButton>
        </form>
      </div>
    </div>
  );
}
