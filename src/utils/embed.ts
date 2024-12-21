import "dotenv/config.js";
import { index } from "../db/pinecone";
import { getEmbeddings } from "./gemini";

export const createEmbedAndPushToDB = async (
  text: string,
  channelId: string,
  guildId: string
) => {
  const embeddings = await getEmbeddings(text);
  await index.namespace(guildId).upsert([
    {
      id: channelId,
      values: embeddings,
    },
  ]);
};

export const deleteEmbedings = async (channelId: string, guildId: string) => {
  await index.namespace(guildId).deleteOne(channelId);
};
