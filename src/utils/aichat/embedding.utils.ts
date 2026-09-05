import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { env } from "../../config/env";
import { splitDocuments } from "./document.utils";

export const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: env.geminiApiKey
});

export async function createDocumentEmbeddings() {
    const chunks = await splitDocuments();
    const texts = chunks.map((chunk) => chunk.pageContent);

    const vectors = await embeddings.embedDocuments(texts);

    return { chunks, vectors }
}