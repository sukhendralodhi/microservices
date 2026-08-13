import path from "node:path";

// path.join() => uses the correct seprator for the current os 

// user/sukhendra/project/file.txt (mac)
// c:/user/sukhendra/project/file.txt (windows)

// process.cwd() => the folder from the where the nodejs process was started 

const projectRoot = process.cwd();
console.log(projectRoot);

const userId = "43";
const originalFileName = "profile.png";

// IMPORTANT => path.join() -> creates a path string
// it will not create the folder
// it does not check whether the file exist or not
const uploadFilePath = path.join(
    projectRoot, "uploads", "users", userId, originalFileName
)

console.log(uploadFilePath);

// final part of path (here for exmaple if we get then we will get profile.png)
const finalPath = path.basename(uploadFilePath);
const fileExtensionName = path.extname(uploadFilePath);
const parentFolder = path.dirname(uploadFilePath);

console.log("The final path is:", finalPath);
console.log("Extension of file: ", fileExtensionName);
console.log("Parent folders of file: ", parentFolder);