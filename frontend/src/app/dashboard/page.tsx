"use client";

import Topbar from "@/components/topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/use-session";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import {
  IconCopy,
  IconInfoCircle,
  IconEye,
  IconEyeOff,
  IconCheck,
} from "@tabler/icons-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const session = useSession();
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  const [isApiKeyUploaded, setIsApiKeyUploaded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const pinbotUrl =
    "https://discord.com/oauth2/authorize?client_id=1319665441366343751&permissions=2147485696&response_type=code&redirect_uri=https%3A%2F%2Fdiscord.com&integration_type=0&scope=applications.commands+bot+messages.read";

  useEffect(() => {
    const fetchApiKey = async () => {
      if (session?.user.id) {
        try {
          const supabase = await createClient();
          const { data, error } = await supabase
            .from("gemini_keys")
            .select("key")
            .eq("id", session.user.id)
            .single();

          if (data) {
            setApiKey(data.key);
            setIsApiKeyUploaded(true);
          } else if (error) {
            console.error("Error fetching API key:", error);
          }
        } catch (err) {
          console.error("Unexpected error in fetchApiKey:", err);
        }
      }
    };

    fetchApiKey();
  }, [session?.user.id]);

  const handleSubmitAPIKey = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const supabase = await createClient();
      let result;

      const { data: existingData, error: fetchError } = await supabase
        .from("gemini_keys")
        .select("id")
        .eq("id", session?.user.id)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("Error checking existing record:", fetchError);
        throw new Error("Failed to check existing record");
      }

      if (existingData) {
        result = await supabase
          .from("gemini_keys")
          .update({ key: apiKey })
          .eq("id", session?.user.id);
      } else {
        result = await supabase.from("gemini_keys").insert({
          key: apiKey,
          identity_id: session?.user?.identities?.[0].id,
          id: session?.user.id,
        });
      }

      const { error, status } = result;

      if (status === 200 || status === 201 || status === 204) {
        setMessage({ text: "API key saved successfully!", type: "success" });
        setIsApiKeyUploaded(true);
      } else {
        console.error("Unexpected status:", status);
        throw new Error("Unexpected status from database operation");
      }

      if (error) {
        console.error("Database operation error:", error);
        throw error;
      }
    } catch (err) {
      console.error("Error in handleSubmitAPIKey:", err);
      setMessage({
        text: (err as string) || "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleApiKeyVisibility = () => {
    setShowApiKey(!showApiKey);
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(pinbotUrl);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description: "PinBot URL has been copied to clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Topbar session={session} />
      <div className="max-w-5xl px-4 mx-auto">
        <div className="my-6 bg-gradient-to-r from-secondary via-secondary to-primary/20 p-4 rounded-xl text-xl">
          Welcome back, {session?.user?.user_metadata?.name}
        </div>

        <div className="my-6 bg-gradient-to-r from-secondary via-secondary to-primary/20 p-4 rounded-xl">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">Gemini API Key</h1>
            <p className="text-sm text-neutral-400">
              This will be used to give you answers based on your pins with the
              help of AI.
            </p>
          </div>

          <div className="my-6 space-y-4 flex flex-col items-end">
            <div className="relative w-full">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setApiKey(e.target.value)
                }
                className="h-14 focus-visible:ring-2 pr-10"
                placeholder="Enter your Key"
              />
              <button
                type="button"
                onClick={toggleApiKeyVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showApiKey ? (
                  <IconEyeOff
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                ) : (
                  <IconEye
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {showApiKey ? "Hide API key" : "Show API key"}
                </span>
              </button>
            </div>
            <Button
              onClick={handleSubmitAPIKey}
              className="h-fit py-1"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>

          {message && (
            <p
              className={`mt-2 text-sm ${
                message.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message.text}
            </p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <IconInfoCircle className="w-4 h-4" />
            <p className="text-sm text-neutral-400">
              Your keys will be kept securely by saving them with encryption.
            </p>
          </div>
        </div>

        <div className="my-6 bg-gradient-to-r from-secondary via-secondary to-primary/20 p-4 rounded-xl">
          <div className="space-y-1">
            <h1 className="text-lg font-semibold">PinBot Invite URL</h1>
            <p className="text-sm text-neutral-400">
              Copy and go to this URL to invite PinBot to your server and let it
              take the burden of managing pins, while you just chat with it.
            </p>
          </div>

          {isApiKeyUploaded ? (
            <div className="bg-background flex items-center justify-between p-4 rounded-xl w-full mt-6">
              <div className="truncate">{pinbotUrl}</div>
              <Button
                variant="ghost"
                size="sm"
                className="ml-2"
                onClick={handleCopyUrl}
              >
                {isCopied ? (
                  <IconCheck className="h-4 w-4" />
                ) : (
                  <IconCopy className="h-4 w-4" />
                )}
                <span className="sr-only">{isCopied ? "Copied" : "Copy"}</span>
              </Button>
            </div>
          ) : (
            <div className="bg-background flex items-center justify-between p-4 rounded-xl w-full mt-6">
              <div className="blur-sm select-none">
                https://discord.com/oauth2/authorize?client_id=XXXXXXXXXXXXXXXXXX
              </div>
              <IconCopy className="text-gray-400" />
            </div>
          )}
          {!isApiKeyUploaded && (
            <p className="mt-2 text-sm text-yellow-500">
              Please upload your Gemini API key to view the PinBot Invite URL.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
