import { Client } from "discord.js";
import { logger } from "../services/logger";

export const onReady = async (Bot: Client): Promise<void> => {
  try {
    logger.info(`Logged in as ${Bot.user?.tag}!`);
  } catch (error) {
    logger.error("Error is : ", error);
  }
};
