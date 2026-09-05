import { embeddings } from "../utils/aichat/embedding.utils";


async function testEmbeddings() {
    const vector = await embeddings.embedQuery("How many sick leaves can I take?");
    console.log(vector);
    console.log("Vector length: ", vector.length);
}

testEmbeddings();