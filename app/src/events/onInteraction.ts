import { Interaction } from "discord.js";
import { CommandList } from "../commands/_CommandList";
import { logger } from "../services/logger";

export const onInteraction = async (
  interaction: Interaction
): Promise<void> => {
  try {
    if (interaction.isChatInputCommand()) {
      for (const command of CommandList) {
        if (interaction.commandName === command.data.name) {
          await command.run(interaction);
          break;
        }
      }
    }
  } catch (error) {
    logger.error("Error occured : ", error);
  }
};
