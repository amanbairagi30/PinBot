import { SlashCommandBuilder } from "discord.js";
import { CommandInt } from "../interfaces/commandInt";
import { fetchAPIKey } from "../utils/chat-with-pins";

export const ping: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!") as SlashCommandBuilder,

  run: async (interaction) => {
    if (interaction.commandName === "ping") {
      const username = interaction.user.username; // Get username
      const discriminator = interaction.user.discriminator; // Get discriminator
      const tag = interaction.user.tag;
      const id = interaction.user.id;

      console.log(await fetchAPIKey(id));

      console.log(
        `Your username is: ${discriminator} **${username}**\nYour tag is: **${tag}** and ID : ${id}`
      );
      await interaction.reply(`Pong!`);
    }
  },
};
