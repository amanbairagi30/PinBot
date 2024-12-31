import Particles from "@/components/ui/particles";
import { createClient } from "@/utils/supabase/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }
  return (
    <section className="max-h-screen h-screen relative overflow-hidden">
      <div className=" md:bottom-[-30rem] left-[50%] translate-x-[-50%] z-[-1] absolute bg-gradient-to-t from-primary opacity-80  blur-[4em] md:blur-[8em] rounded-full w-[10rem] md:w-[30rem] h-[20rem] md:h-[40rem] transition-all duration-700 ease-out rotate-[50deg]"></div>

      <div className="font-secondary z-20">{children}</div>
      <div className="relative -translate-y-20 z-[-1] border-red-500 h-[calc(100vh-70vh)]">
        <Particles
          className="absolute h-screen inset-0 z-0"
          quantity={400}
          ease={80}
          color={"#4f46e5"}
          refresh
        />
      </div>
    </section>
  );
}
