import "dotenv/config.js";
import { index } from "../db/pinecone";
import { getEmbeddings } from "./gemini";

export const createEmbedAndPushToDB = async (
  messages: { id: string; content: string }[],
  channelId: string,
  guildId: string
) => {
  const upsertData = await Promise.all(
    messages.map(async (message) => {
      const embeddings = await getEmbeddings(message.content);
      return {
        id: message.id,
        values: embeddings,
        metadata: { channelId },
      };
    })
  );

  await index.namespace(guildId).upsert(upsertData);

  console.log("Embeddings created and pushed to Pinecone successfully.");
};

export const deleteEmbedings = async (channelId: string, guildId: string) => {
  await index.namespace(guildId).deleteOne(channelId);
};
