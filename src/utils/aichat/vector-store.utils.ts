import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
import { splitDocuments } from "./document.utils";
import { embeddings } from "./embedding.utils";


export async function createVectorStore() {

    // first get the five chunks 
    const chunks = await splitDocuments();

    // create a vector store from chunks 
    const vectorStore = await MemoryVectorStore.fromDocuments(chunks, embeddings);

    return vectorStore;
}