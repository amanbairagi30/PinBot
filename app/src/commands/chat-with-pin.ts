import { SlashCommandBuilder } from "discord.js";
import { CommandInt } from "../interfaces/commandInt";
import { getChannelIds } from "../utils/getChannelIds";
import { fetchPinnedMsgfromChannelId } from "../utils/fetchPinnedMessageFromChannelIds";
import { chat } from "../utils/chat-with-pins";
import { Bot } from "../config/initClient";
import { logger } from "../services/logger";

export const chatWithPin: CommandInt = {
  data: new SlashCommandBuilder()
    .setName("chat-with-pin")
    .setDescription("Chat with your pins")
    .addStringOption((option) =>
      option
        .setName("chat")
        .setDescription("query to give to AI")
        .setRequired(true)
    ) as SlashCommandBuilder,

  run: async (interaction) => {
    if (interaction.commandName === "chat-with-pin") {
      try {
        await interaction.deferReply();
        const id = interaction.user.id;
        console.log(id);

        const query = interaction.options.getString("chat");
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
              return pinnedMessages;
            })
          )
        )
          .filter((entry) => entry !== null)
          .flat();
        logger.debug(allPinnedMessages);
        let response;
        response = await chat(
          query as string,
          interaction.guildId as string,
          allPinnedMessages,
          id
        );
        await interaction.editReply(response);
      } catch (error) {
        logger.error("Error at Chat with Pin : ", error);
        await interaction.editReply(
          `An error occurred while exporting messages: ${error}`
        );
      }
    }
  },
};
