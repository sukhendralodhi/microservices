import fs from "node:fs";
import path from "node:path";

type FileResult = {
    style: string;
    fileName: string;
    content: string;
    sizeInBytes: number;
}

const DEMO_FOLDER_PATH = path.join(process.cwd(), "file-system-callback", "call-back");
const FILE_PATH = path.join(DEMO_FOLDER_PATH, "callback.txt");


function ensureDemoFolderExist(): void {
    if (!fs.existsSync(DEMO_FOLDER_PATH)) {
        fs.mkdirSync(DEMO_FOLDER_PATH, { recursive: true })
    }
}


function runCallBackExample(): Promise<FileResult> {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            FILE_PATH, "created using callback fs",
            "utf-8",
            (writeError) => {
                if (writeError) {
                    reject(writeError);
                    return;
                }
                fs.appendFile(
                    FILE_PATH,
                    "append file using callback",
                    "utf-8",
                    (appendError) => {
                        if (appendError) {
                            reject(appendError);
                            return;
                        }
                        fs.readFile(
                            FILE_PATH,
                            "utf-8", (readError, content) => {
                                if (readError) {
                                    reject(readError);
                                    return;
                                }
                                fs.stat(FILE_PATH, (stateError, stats) => {
                                    if (stateError) {
                                        reject(stateError);
                                        return;
                                    }
                                    resolve({
                                        style: "callback",
                                        content,
                                        sizeInBytes: stats.size,
                                        fileName: path.basename(FILE_PATH)
                                    });
                                });

                            });
                    }

                );
            }
        );
    });
}


async function mainFunction(): Promise<void> {
    try {
        ensureDemoFolderExist();
        const callbackResult = await runCallBackExample();
        console.log(callbackResult);
    } catch (error) {
        const message = error instanceof Error ? error.message : "unknown error";
        console.log(message);
    }
}

mainFunction();