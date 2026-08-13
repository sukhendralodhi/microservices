import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system-promise", "promises");
const PROMISE_FILE_PATH = path.join(DEMO_FOLDER_PATH, "promises.txt");

function ensureFolderExist(): void {
    if (!fs.existsSync(DEMO_FOLDER_PATH)) {
        fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true })
    }
}

type FileResult = {
    style: string;
    content: string;
    sizeInBytes: number;
    fileName: string;
}

async function runPromisesExample(): Promise<FileResult> {
    await fsPromises.writeFile(
        PROMISE_FILE_PATH,
        "created using prmises",
        "utf-8"
    );

    await fsPromises.appendFile(
        PROMISE_FILE_PATH,
        "appended using promises",
        "utf-8"
    );

    const content = await fsPromises.readFile(PROMISE_FILE_PATH, "utf-8");
    const stats = await fsPromises.stat(PROMISE_FILE_PATH);

    return {
        style: "promises",
        content,
        sizeInBytes: stats.size,
        fileName: path.basename(PROMISE_FILE_PATH)
    }
}

async function mainFunction(): Promise<void> {
    try {
        ensureFolderExist();
        const result = await runPromisesExample();
        console.log(result)
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.log(message);
    }
}

mainFunction();