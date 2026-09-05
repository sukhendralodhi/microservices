import { createVectorStore } from "../utils/aichat/vector-store.utils";

async function testVectorStore() {
    try {
        const vectorStore = await createVectorStore();

        const results = await vectorStore.similaritySearch(
            "How many sick leaves can I take?",
            2
        );

        console.log("Search Results:");

        results.forEach((document, index) => {
            console.log(`\nResult ${index + 1}:`);
            console.log("Content:", document.pageContent);
            console.log("Metadata:", document.metadata);
        });

    } catch (error) {
        console.error("Vector Store Error:", error);
    }
}

testVectorStore();