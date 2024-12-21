import { index } from "../db/pinecone";
import { getEmbeddings } from "./gemini";

import "dotenv/config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

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
    topK: 4,
    filter: { channelId },
  });

  console.log("VEctor query : ", vectorQueryResponse);
  const prompt = `You are the best AI model in the world and can help people to query the answer to their pins in discord to the particular channel , you have been provided with the query of the user which goes like this : '${query} and its vector also ${vectorQueryResponse}' . Now you also been provided with the context here : ${String(
    messages.map((x: any) => x.content.toString())
  )}, so now you need to answer user query to find the best posible pins conbtent as per their query `;
  const result = await model.generateContent(prompt);

  console.log(result.response.text());
  return result.response.text();
};
