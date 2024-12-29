import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Navbar from "@/components/landing/navbar";
import { SelectTheme } from "@/components/theme-toggler";
import Image from "next/image";

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
