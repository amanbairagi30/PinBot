import { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      setSession: (newSession) => set(() => ({ session: newSession })),
    }),
    {
      name: "session",
    }
  )
);
