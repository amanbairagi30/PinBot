import { Events } from "discord.js";
import "dotenv/config.js";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { Bot } from "./config/initClient";

(async () => {
  Bot.on("ready", (client) => onReady(client));
  Bot.on(
    Events.InteractionCreate,
    async (interaction) => await onInteraction(interaction)
  );
  await Bot.login(process.env.BOT_TOKEN);
})();
