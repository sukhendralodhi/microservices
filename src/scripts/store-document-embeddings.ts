import { storeDocumentEmbeddings } from "../services/documentEmbedding.service";



async function main() {
    try {
        await storeDocumentEmbeddings();
    } catch (error) {
        console.error("Failed to store embeddings:", error);
    } finally {
        process.exit();
    }
}

main();