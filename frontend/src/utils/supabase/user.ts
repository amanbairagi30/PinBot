import { createClient } from "./client";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
