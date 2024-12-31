import { signOut } from "@/utils/supabase/user";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logout() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={async () => {
          await signOut();
          router.push("/");
        }}
        className="transition-all  cursor-pointer duration-500 bg-red-500/70 hover:bg-red-500/50 p-2 rounded-lg"
      >
        <LogOut className="w-4 h-4" />
      </div>
    </>
  );
}
