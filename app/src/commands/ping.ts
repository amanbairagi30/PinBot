import { SlashCommandBuilder } from "discord.js";
import { CommandInt } from "../interfaces/commandInt";

export const ping: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!") as SlashCommandBuilder,

  run: async (interaction) => {
    if (interaction.commandName === "ping") {
      await interaction.reply(`Pong!`);
    }
  },
};
