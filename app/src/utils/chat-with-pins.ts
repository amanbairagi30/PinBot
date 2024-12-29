import { index } from "../db/pinecone";
import { getEmbeddings } from "./gemini";

import "dotenv/config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "./prompt";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const chat = async (
  query: string,
  guildId: string,
  channelId: string,
  messages: any
) => {
  console.log("inchat block");
  const embedding = await getEmbeddings(query);

  console.log("after embed : ", embedding);
  const vectorQueryResponse = await index.namespace(guildId).query({
    vector: embedding,
    topK: 2,
  });

  // Extract match IDs from the vector query response
  const matchIds = vectorQueryResponse.matches.map((match) => match.id);

  console.log("Matches ID : ", matchIds);

  // Filter messages based on the match IDs
  const filteredMessages = messages.filter((item: any) => {
    console.log("ITEM . ID ========>>>>> ", item.id);
    return matchIds.includes(item.id);
  });

  console.log("filter Message : ", filteredMessages);

  console.log("VEctor query : ", vectorQueryResponse);
  const prompt = generatePrompt(filteredMessages, query);
  const result = await model.generateContent([prompt, query]);

  console.log(result.response.text());
  return result.response.text();
};
