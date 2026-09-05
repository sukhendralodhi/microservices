import { createDocumentEmbeddings } from "../utils/aichat/embedding.utils";


async function testDocumentEmbeddings() {
    try {
        const { chunks, vectors } = await createDocumentEmbeddings();
        console.log("Total chunks:", chunks.length);
        console.log("Total vectors:", vectors.length);

        vectors.forEach((vector, index) => {
            console.log(
                `Chunk ${index + 1} vector length:`,
                vector.length);
        });
    } catch (error) {
        console.error("Embedding Error:", error);
    }
}

testDocumentEmbeddings();