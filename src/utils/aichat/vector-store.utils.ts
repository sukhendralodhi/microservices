import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { splitDocuments } from "./document.utils";
import { embeddings } from "./embedding.utils";

let vectorStore: MemoryVectorStore | null = null;

export async function getVectorStore() {
    if (vectorStore) {
        console.log("Using existing vector store");
        return vectorStore;
    }
    console.log("Creating vector store...");
    const chunks = await splitDocuments();

    vectorStore = await MemoryVectorStore.fromDocuments(
        chunks,
        embeddings
    )

    console.log("Vector store created successfully");

    return vectorStore;
}