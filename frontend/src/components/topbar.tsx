import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logout from "./logout";
import { Session } from "@supabase/supabase-js";
import { IconHome } from "@tabler/icons-react";
import Link from "next/link";

export default function Topbar({ session }: { session: Session | null }) {
  return (
    <>
      <div className="border-b-2 border-primary bg-primary/15 p-2 relative">
        <div className="absolute hidden xl:block top-0 left-0 bg-gradient-to-r from-background via-background to-transparent xl:w-60 h-40"></div>
        <div className="absolute hidden xl:block top-0 right-0 bg-gradient-to-l from-background via-background to-transparent xl:w-60 h-40"></div>
        <div className="max-w-5xl flex items-center justify-between mx-auto">
          <div className="font-semibold flex items-center gap-2 text-xl">
            <Link
              href={"/"}
              className="bg-primary/20 cursor-pointer px-2 py-1 rounded-lg"
            >
              <IconHome />
            </Link>
            <span className="bg-primary/20 px-2 py-1 rounded-lg">
              Dashboard
            </span>
          </div>
          <div className="flex items-center bg-primary/30 border-2 px-2 py-1 rounded-xl gap-4">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={session?.user?.user_metadata.avatar_url}
                alt="@shadcn"
              />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}
