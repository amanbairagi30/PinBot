import express, { json } from "express";
import { Events } from "discord.js";
import "dotenv/config.js";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { Bot } from "./config/initClient";
import cors from "cors";

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

// Set up the Discord bot
(async () => {
  Bot.on("ready", (client) => onReady(client));
  Bot.on(
    Events.InteractionCreate,
    async (interaction) => await onInteraction(interaction)
  );
  await Bot.login(process.env.BOT_TOKEN);
})();
