import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { env } from "./env";

export const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    apiKey: env.geminiApiKey
});