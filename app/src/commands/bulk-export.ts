import { SlashCommandBuilder } from "discord.js";
import { CommandInt } from "../interfaces/commandInt";
import { getChannelIds } from "../utils/getChannelIds";
import { Bot } from "../config/initClient";
import { fetchPinnedMsgfromChannelId } from "../utils/fetchPinnedMessageFromChannelIds";
import { createEmbedAndPushToDB } from "../utils/embed";
import { logger } from "../services/logger";

export const bulkExport: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("bulk-export")
    .setDescription(
      "Bulk export entire server pins to pinecone db as embeddings."
    ) as SlashCommandBuilder,

  run: async (interaction) => {
    try {
      if (interaction.commandName === "bulk-export") {
        await interaction.deferReply({ ephemeral: true });
        const channelIds = await getChannelIds(
          interaction.guildId as string,
          Bot
        );
        const allPinnedMessages = (
          await Promise.all(
            channelIds.map(async (id: string) => {
              const pinnedMessages = await fetchPinnedMsgfromChannelId(Bot, id);
              if (!pinnedMessages || pinnedMessages.length === 0) {
                return null;
              }
              return { channelId: id, messages: pinnedMessages };
            })
          )
        ).filter((entry) => entry !== null);
        // create and push embeddings to DB
        await Promise.all(
          allPinnedMessages.map(async (element) => {
            await createEmbedAndPushToDB(
              element.messages as { id: string; content: string }[],
              element.channelId,
              String(interaction.guildId)
            );
          })
        );
        logger.info("created embeddings hurray");
        await interaction.editReply(`created embeddings hurray`);
      }
    } catch (error) {
      logger.error("Error in Bulk Export : ", error);
    }
  },
};
