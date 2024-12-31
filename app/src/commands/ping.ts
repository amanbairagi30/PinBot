import { SlashCommandBuilder } from "discord.js";
import { CommandInt } from "../interfaces/commandInt";

export const ping: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!") as SlashCommandBuilder,

  run: async (interaction) => {
    if (interaction.commandName === "ping") {
      const username = interaction.user.username; // Get username
      const discriminator = interaction.user.discriminator; // Get discriminator
      const tag = interaction.user.tag;

      console.log(
        `Your username is: ${discriminator} **${username}**\nYour tag is: **${tag}**`
      );
      await interaction.reply(`Pong!`);
    }
  },
};
