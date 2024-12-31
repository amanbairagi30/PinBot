import { createClient } from "../supabase/client";

export async function signInWithDiscord(e: any) {
  e.preventDefault();
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_URL}/auth/callback`,
    },
  });
}
