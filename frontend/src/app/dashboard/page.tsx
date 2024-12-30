"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Page() {
  const supabase = createClient();
  const [mysession, setMySession] = useState<any>();

  useEffect(() => {
    supabase.auth.getSession().then((session) => {
      // do something here with the session like  ex: setState(session)
      console.log("SESSION :", session.data.session?.user.user_metadata.name);
      setMySession(session);
    });
  }, []);

  return <>Hello {mysession.data.session?.user.user_metadata.name}</>;
}
