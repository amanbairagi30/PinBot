import { useSessionStore } from "@/store/session";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export function useSession() {
  const { session, setSession } = useSessionStore();

  const getUserData = async () => {
    try {
      const supabase = createClient();
      const { data: session, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(session.session);
    } catch (err) {
      console.error("Failed to fetch session:", err);
      setSession(null);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return session;
}
