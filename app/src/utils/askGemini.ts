import "dotenv/config.js";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getAIResponse = async (query: string) => {
  const result = await model.generateContent(query);
  console.log(result.response.text());
  return result.response.text();
};
