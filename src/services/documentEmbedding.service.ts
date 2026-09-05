import { pool } from "../lib/db";
import { splitDocuments } from "../utils/aichat/document.utils";
import { embeddings } from "../utils/aichat/embedding.utils";


export async function storeDocumentEmbeddings() {
    const chunks = await splitDocuments();
    const texts = chunks.map((chunk) => chunk.pageContent);

    const vectors = await embeddings.embedDocuments(texts);

    for (let i = 0; i < chunks.length; i++) {
        await pool.query(
            `
            INSERT INTO document_embeddings (content, metadata, embedding)
            VALUES ($1, $2, $3)
            `,
            [chunks[i].pageContent, JSON.stringify(chunks[i].metadata), `[${vectors[i].join(",")}]`]
        )
    }

    console.log(`${chunks.length} document embeddings stored successfully`);

    // console.log("Chunks:", chunks.length);
    // console.log("Vectors:", vectors.length);
}