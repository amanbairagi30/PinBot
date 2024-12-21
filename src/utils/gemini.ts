import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export const getEmbeddings = async (text: string) => {
  const result = await model.embedContent(text);
  const embeddings = result.embedding.values;

  if (!embeddings) throw new Error("Error generating embeddings");
  console.log(embeddings);

  return embeddings;
};
