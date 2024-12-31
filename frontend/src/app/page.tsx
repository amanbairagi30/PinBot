"use client";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import { useSession } from "@/hooks/use-session";
import { useSessionStore } from "@/store/session";
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Home() {
  const session = useSession();
  return (
    <>
      <main className="max-w-7xl mx-auto">
        <div className="px-4">
          <Navbar />
          <Hero />
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
}
