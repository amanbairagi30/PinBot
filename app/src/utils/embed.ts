import "dotenv/config.js";
import { index } from "../db/pinecone";
import { getEmbeddings } from "./gemini";
import { logger } from "../services/logger";

export const createEmbedAndPushToDB = async (
  messages: { id: string; content: string }[],
  channelId: string,
  guildId: string
) => {
  try {
    const upsertData = await Promise.all(
      messages?.map(async (message) => {
        const embeddings = await getEmbeddings(message.content);
        return {
          id: message.id,
          values: embeddings,
          metadata: { channelId },
        };
      })
    );

    await index.namespace(guildId).upsert(upsertData);

    logger.info("Embeddings created and pushed to Pinecone successfully.");
  } catch (error) {
    logger.error("Error at embed.ts : ", error);
  }
};

export const deleteEmbedings = async (guildId: string) => {
  await index.namespace(guildId).deleteAll();
};
