import express, { json } from "express";
import { Events, REST, Routes } from "discord.js";
import "dotenv/config.js";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { Bot } from "./config/initClient";
import cors from "cors";
import { CommandList } from "./commands/_CommandList";

const app = express();
app.use(json());
app.use(cors());
const port = process.env.PORT || 5000;

// Set up the Express server
app.get("/", (req, res) => {
  res.send("SERVER is UP!");
  console.log("SERVER is UP!");
});

// Start the Express server
app.listen(port, () => {
  console.log("Listening at port:", port);
});

const commands = CommandList.map((item) => item.data.toJSON());

const rest = new REST({ version: "9" }).setToken(
  process.env.BOT_TOKEN as string
);

// Set up the Discord bot
(async () => {
  Bot.on("ready", (client) => onReady(client));
  Bot.on(
    Events.InteractionCreate,
    async (interaction) => await onInteraction(interaction)
  );
  Bot.on("guildCreate", async (guild) => {
    try {
      console.log(`Joined a new guild: ${guild.name}`);

      await rest.put(
        Routes.applicationGuildCommands(
          process.env.CLIENT_ID as string,
          guild.id
        ),
        {
          body: commands,
        }
      );

      console.log("Successfully registered commands for guild!");
    } catch (error) {
      console.error("Error registering commands:", error);
    }
  });
  await Bot.login(process.env.BOT_TOKEN);
})();
