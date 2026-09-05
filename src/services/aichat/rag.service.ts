import { model } from "../../config/gemini";
import { searchSimilarDocuments } from "./vectorSearch.service";


export async function handleRagChat(question: string) {

    // Find relevant documents using pgvector
    const documents = await searchSimilarDocuments(question);

    const context = documents.map((document) => document.content).join("\n\n");

    const prompt = `
    You are a helpful assistant.

    Answer the user's question using ONLY the context provided below.

    If the answer is not available in the context, say:
    "I don't have enough information in the company policy to answer that."

    Context:
    ${context}

    Question:
    ${question}
`;

    const response = await model.invoke(prompt);

    return {
        answer: response.content,
        sources: documents.map((document) => ({
            content: document.content,
            metadata: document.metadata,
        })),
    };

}