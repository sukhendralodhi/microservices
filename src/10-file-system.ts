import fs from "node:fs";
import path from "node:path";


const DEMO_FOLDER_PATH = path.join(process.cwd(), 'file-system', 'fs-demo');
const SYNC_FILE_PATH = path.join(DEMO_FOLDER_PATH, 'sync-note.txt');

type FileResult = {
    style: string;
    fileName: string;
    content: string;
    sizeInBytes: number;
}


// fs = file system
// create folders
// write files 
// read files 
// check file information 
// delete files 


// sync apis 
// call back apis 
// promise apis 


// sync apis 

// WHEN WE USE SYNC APIS
// small startup scripts
// build scripts 
// local demos 

// NOT GOOD OR EVEN BAD PRACTICE 
// http req handlers 
// high trafic apis 
// background jobs 

function ensureDemoFolderExist(): void {
    if (!fs.existsSync(DEMO_FOLDER_PATH)) {
        fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true })
    }
}


function runSyncExample(): FileResult {
    // write content to a file
    fs.writeFileSync(SYNC_FILE_PATH, "created using sync fs", "utf-8");
    // here if file not exist then it create file but if already exist then it just replace the content of that file

    // append in the last of file content 
    fs.appendFileSync(SYNC_FILE_PATH, "appended using sync fs", "utf-8");

    const content = fs.readFileSync(SYNC_FILE_PATH, "utf-8");

    const stats = fs.statSync(SYNC_FILE_PATH);

    return {
        style: "sync",
        content,
        fileName: path.basename(SYNC_FILE_PATH),
        sizeInBytes: stats.size
    }
}

async function mainFUnction(): Promise<void> {
    try {
        ensureDemoFolderExist();
        const syncResult = runSyncExample();
        console.log(syncResult);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.log("file system error", message);
    }
}

mainFUnction();