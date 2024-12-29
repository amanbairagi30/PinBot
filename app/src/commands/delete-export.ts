import { SlashCommandBuilder } from "discord.js";
import { CommandInt } from "../interfaces/commandInt";
import { deleteEmbedings } from "../utils/embed";
import { logger } from "../services/logger";

export const deleteExport: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("delete")
    .setDescription("deletes the embeddings") as SlashCommandBuilder,

  run: async (interaction) => {
    if (interaction.commandName === "delete") {
      try {
        await interaction.deferReply({ ephemeral: true });
        await deleteEmbedings(String(interaction.guildId));
        await interaction.editReply("Deleted successfully");
      } catch (error) {
        logger.error("Error at Delete Export : ", error);
        await interaction.reply(`${error}`);
      }
    }
  },
};
