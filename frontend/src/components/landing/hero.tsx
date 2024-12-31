"use client";
import { Bot, Video } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import GlowDiv from "./glow-div";
import Discord from "../svgs/discord";
import { IconPin } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { useSessionStore } from "@/store/session";
import { signInWithDiscord } from "@/utils/user/user";

export default function Hero() {
  const router = useRouter();
  const { session } = useSessionStore();

  return (
    <>
      <div className="flex relative mb-40 flex-col items-center h-screen w-full border-yellow-500">
        <div className="w-full absolute border-red-500 top-0 h-[30rem] bg-gradient-to-b from-background via-background/60 to-transparent z-[20]"></div>
        <div className="w-full absolute border-green-500 bottom-0 h-[30rem] bg-gradient-to-t from-background via-background/60 to-transparent z-[20]"></div>
        <div className="border-x-8 flex items-center max-w-6xl z-[1] w-full border-primary absolute h-screen">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
            const isEven = item % 2 === 0;
            return (
              <div
                key={index}
                className={cn(
                  `border-2 h-full w-[8rem]`,
                  isEven ? "bg-primary opacity-30" : "bg-primary/20 opacity-60"
                )}
              ></div>
            );
          })}
        </div>
        {/* <div className="top-[15rem] md:top-[5rem] left-[20%] z-[-1] absolute bg-gradient-to-t opacity-50 dark:opacity-100 from-primary to-blue-900  blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem] rotate-[54deg]"></div>
        <div className="-top-[35rem] opacity-10 rotate-[124deg] left-[20%] z-[-1] absolute bg-gradient-to-t dark:opacity-100 from-primary to-blue-900  blur-[8em] rounded-xl transition-all translate-x-[-50%] duration-700 ease-out w-[10rem] md:w-[10rem] h-[20rem] md:h-[60rem]"></div> */}
        {/* <div className="top-[-20rem] md:top-[-40rem] -left-[50%rem] z-[-1] absolute bg-gradient-to-t from-primary to-blue-300 opacity-50  blur-[4em] md:blur-[8em] rounded-full w-[10rem] md:w-[30rem] h-[20rem] md:h-[40rem] transition-all duration-700 ease-out rotate-[50deg]"></div> */}
        {/* <div className="bottom-[-12rem] right-[10%] z-[-1] absolute bg-gradient-to-t from-primary to-blue-800 blur-[4em] md:blur-[4em] rounded-full w-[10rem] md:w-[20rem] h-[20rem] md:h-[20rem] transition-all duration-700 ease-out rotate-[50deg]"></div> */}
        <div className="flex flex-col z-20 items-center max-h-fit w-full border-red-500">
          <div className="mt-10  text-center">
            <Badge className="mb-6 text-sm py-2 font-secondary rounded-full px-6 bg-primary/30 hover:bg-primary/30 border-[3px] border-primary">
              Easy to setup and chat 🚀
            </Badge>
            <div className="font-semibold">
              <div className="text-6xl flex text-center items-center">
                Chat with Discord Channel&apos;s Pins
              </div>
              <div className="text-6xl mt-2">with help of Pinbot</div>
            </div>
          </div>
          <div className="mt-6 text-lg font-secondary w-[40%] text-center">
            Say goodbye to scrolling, let Pinbot do the talking!
          </div>

          <div className="mt-10 flex items-center gap-4">
            <Button
              onClick={() =>
                session ? router.push("/dashboard") : signInWithDiscord()
              }
            >
              <Bot />
              {session ? <span>Dashboard </span> : <span>Invite PinBot</span>}
            </Button>

            <Button className="bg-primary/20 hover:bg-primary/30">
              <Video className="w-2 h-2" />
              <span>Watch Demo</span>
            </Button>
          </div>
          <div className="flex relative flex-col items-center mt-36">
            <div className="bg-white absolute top-[-5rem] -left-4 shadow-2xl shadow-black -rotate-12 z-20 rounded-[1.5rem] w-28 h-28 flex items-center justify-center">
              <IconPin className="w-14 text-black h-14" />
            </div>
            {/* <div className="bg-white absolute bottom-[-5rem] -right-4 shadow-2xl shadow-black -12 z-20 rounded-[1.5rem] w-28 h-28 flex items-center justify-center">
              <IconPin className="w-14 text-black h-14" />
            </div> */}
            <GlowDiv>
              <Discord />
            </GlowDiv>
          </div>
          <div className="border shadow-xl shadow-primary/15 -mt-2 bg-primary/10 flex w-[30rem] items-center gap-4 z-40 backdrop-blur-md max-h-fit p-4 rounded-3xl">
            <div className="flex border-4 border-primary p-2 rounded-xl px-4 py-3 items-center gap-2">
              <Bot />
              <div>PinBot</div>
            </div>
            <Input
              placeholder="Type to chat with discord pins..."
              className="h-[45px] rounded-lg focus-visible:ring-2 border-2 border-primary/30"
            />
          </div>
        </div>
      </div>
    </>
  );
}
