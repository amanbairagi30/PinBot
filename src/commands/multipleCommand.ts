import { bold, Interaction, quote, SlashCommandBuilder } from "discord.js";
import { Command } from "../interfaces/command";

export const oneHundred: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  run: async (interaction: any) => {
    await interaction.reply({
      content: "Pong",
    });
  },
};
