"use client";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";

export default function Home() {
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
