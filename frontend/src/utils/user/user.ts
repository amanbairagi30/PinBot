import { createClient } from "../supabase/client";

export async function signInWithDiscord() {
  const supabase = await createClient();
  await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/auth/callback`,
    },
  });
}
