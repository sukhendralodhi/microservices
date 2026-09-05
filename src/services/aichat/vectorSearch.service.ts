import { pool } from "../../lib/db";
import { embeddings } from "../../utils/aichat/embedding.utils";

export async function searchSimilarDocuments(
    question: string,
    limit: number = 2
) {
    // convert user question into embeddings
    const questionVector = await embeddings.embedQuery(question);

    // converts vector into pgvector format
    const vectorString = `[${questionVector.join(",")}]`;

    // Search for the most similar documents
    const results = await pool.query(
        `
        SELECT
            id,
            content,
            metadata,
            1 - (embedding <=> $1::vector) AS similarity
        FROM document_embeddings
        ORDER BY embedding <=> $1::vector
        LIMIT $2
        `,
        [vectorString, limit]
    )

    return results.rows;
}