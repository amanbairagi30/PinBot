import {
  Client,
  Events,
  GatewayIntentBits,
  Interaction,
  MessageFlags,
} from "discord.js";
import "dotenv/config.js";
import { onInteraction } from "./events/interaction";

(async () => {
  const Bot = new Client({ intents: [GatewayIntentBits.Guilds] });
  Bot.on("ready", (client) => console.log(`Logged in as ${client.user.tag}!`));
  Bot.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName);

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
    }
  });
  await Bot.login(process.env.BOT_TOKEN);
})();
