import { index } from "../db/pinecone";
import { getEmbeddings } from "./gemini";

import "dotenv/config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "./prompt";
import axios from "axios";
import { logger } from "../services/logger";

export const fetchAPIKey = async (id: string): Promise<string | null> => {
  try {
    const response = await axios.get(
      `${process.env.FRONTEND_URL}/api/gemini-keys?id=${id}`
    );
    if (response.data && response.data.key) {
      logger.info("API Key retrieved successfully.");
      return response.data.key;
    } else {
      logger.warn("No API key found in the response.");
      return null;
    }
  } catch (error) {
    logger.error("Error fetching API key:", error);
    return null;
  }
};

export const chat = async (
  query: string,
  guildId: string,
  messages: any,
  id: string
) => {
  const key = await fetchAPIKey(id);
  if (!key) {
    return "We couldn't find your API key , GO to https://pinbot.vercel.app/dashbaord to add your Gemini Keys and start again .";
  }
  const genAI = new GoogleGenerativeAI(key as string);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
