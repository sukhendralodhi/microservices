

import { TextLoader } from "@langchain/classic/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// step 1 
export async function loadDocument() {
    const loader = new TextLoader("src/documents/company-policy.txt");
    const documents = await loader.load();

    return documents;
}

// step 2 
export async function splitDocuments() {
    // load the orignal documents 
    const documents = await loadDocument();

    // create the textspillter 
    const textSpilitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20
    });

    const chunks = await textSpilitter.splitDocuments(documents);

    return chunks;
}


// console.log(loadDocument);