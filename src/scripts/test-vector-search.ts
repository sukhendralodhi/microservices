import { searchSimilarDocuments } from "../services/aichat/vectorSearch.service";

async function main() {
    try {
        const question = "How many sick leaves can I take?";
        const results = await searchSimilarDocuments(question);
        console.log("Question:", question);
        console.log("\nSearch Results:");

        results.forEach((result, index) => {
            console.log(`\nResult ${index + 1}:`);
            console.log("Content:", result.content);
            console.log("Similarity:", result.similarity);
            console.log("Metadata:", result.metadata);
        });
    } catch (error) {
        console.error("Search failed:", error);
    } finally {
        process.exit(0);
    }
}

main();