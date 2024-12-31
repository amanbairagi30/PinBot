import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tag = searchParams.get("tag");
  console.log(tag);
  if (!tag) {
    return NextResponse.json({ error: "Tag is required" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    const { data: exd, error } = await supabase
      .from("gemini_keys")
      .select("key")
      .eq("tag", tag)
      .single();

    console.log(exd);
    console.log(error);

    if (error) {
      console.error("Error fetching Gemini API key:", error);
      return NextResponse.json(
        { error: "Failed to fetch API key" },
        { status: 500 }
      );
    }

    if (!exd) {
      return NextResponse.json({ error: "API key not found" }, { status: 404 });
    }

    return NextResponse.json({ key: exd.key });
  } catch (err) {
    console.error("Unexpected error in GET /api/gemini-keys:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
