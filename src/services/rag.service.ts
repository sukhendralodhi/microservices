import { model } from "../config/gemini";
import { createVectorStore } from "../utils/aichat/vector-store.utils";


export async function handleRagChat(question: string) {
    // create vector store first

    // step 4 this will store whole data that we pass
    const vectorStore = await createVectorStore();

    // Find the 2 most relevant chunks
    // step 5 this will give similar results from vector db
    const relevantDocuments = await vectorStore.similaritySearch(
        question,
        2
    );

    console.log("Question:", question);

    console.log(
        "Retrieved Documents:",
        relevantDocuments.map((document) => document.pageContent)
    );

    // Combine the chunks into one string
    // this will give context from vector db 
    const context = relevantDocuments.map((document) => document.pageContent).join("\n\n");

    const prompt = `You are a helpful company policy assistant.
    Answer the user's question using ONLY the context below.
    If the answer is not available in the context, say:
    "I don't have enough information in the company policy to answer that."
    CONTEXT:
    ${context}
    QUESTION:
    ${question}`;

    const response = await model.invoke(prompt);

    return response.content;
}