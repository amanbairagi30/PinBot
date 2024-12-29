import { Client, Message } from "discord.js";
import { logger } from "../services/logger";

export const fetchPinnedMsgfromChannelId = async (
  client: Client<boolean>,
  channelId: string
) => {
  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel?.isTextBased()) {
      return "";
    }
    const pinnedMessage = await channel.messages.fetchPinned();
    return pinnedMessage.map((msg: Message) => {
      return {
        id: msg.id ?? "",
        content: msg.content ?? "",
      };
    });
  } catch (error) {
    logger.error("Error at fetch pin message : ", error);
  }
};
