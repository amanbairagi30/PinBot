"use client";
import React from "react";
import { Button } from "../ui/button";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import Logo from "../svgs/logo";
import { signOut } from "@/utils/supabase/user";
import { useRouter } from "next/navigation";
import { signInWithDiscord } from "@/utils/user/user";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const session = useSession();
  console.log(session);

  return (
    <>
      <main className="w-full my-6">
        <div className="flex items-center justify-between  rounded-xl">
          <div className="flex items-center gap-8">
            <div className="text-lg flex items-center gap-4">
              <div className="mb-2 rounded-lg">
                {/* <IconPin /> */}
                <Logo />
              </div>
              <div>
                <span className="font-semibold">Pin</span>
                <span className="font-semibold">Bot</span>
              </div>
            </div>
            {/* <div className="flex items-center font-semibold gap-4 text-sm">
              <span className="cursor-pointer">Products</span>
              <span className="cursor-pointer">Help</span>
              <span className="cursor-pointer">Docs</span>
            </div> */}
          </div>
          <div className="flex items-center gap-1 md:gap-4">
            {/* <Button>Connect Wallet</Button> */}
            <Link
              target="_blank"
              href={"https://github.com/amanbairagi30/PinBot"}
            >
              <Button variant={"ghost"}>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="hidden md:block">Github</span>
              </Button>
            </Link>
            {/* <Button>Connect Wallet</Button> */}
            {session ? (
              <Button
                onClick={async () => {
                  await signOut();
                  router.push("/");
                }}
                variant={"default"}
              >
                {/* <Discord /> */}
                <IconLogout />
                <span>Log Out</span>
              </Button>
            ) : (
              <Button onClick={() => signInWithDiscord()} variant={"default"}>
                {/* <Discord /> */}
                <IconLogin />
                <span>Sign Up</span>
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
