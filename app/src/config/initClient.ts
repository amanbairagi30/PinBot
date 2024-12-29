import { Client, GatewayIntentBits } from "discord.js";

export const Bot = new Client({ intents: [GatewayIntentBits.Guilds] });
