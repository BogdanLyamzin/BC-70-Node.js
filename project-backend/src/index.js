import fs from "node:fs/promises";
import path from "node:path";
import DetectFileEncodingAndLanguage from "detect-file-encoding-and-language";

const rootDir = process.cwd();
const fileDir = path.join(rootDir, "src", "db", "file.txt");
const file2Dir = path.join(rootDir, "src", "db", "file2.txt");
const file3Dir = path.join(rootDir, "src", "db", "file3.txt");

const func = async()=> {
    try {
    // const {encoding} = await DetectFileEncodingAndLanguage(fileDir);
    // const text = await fs.readFile(fileDir, encoding);
    // console.log(text);
    // const text = await fs.readFile(fileDir, "utf-8");
    // console.log(text);
    // const buffer = await fs.readFile(fileDir);
    // const text = buffer.toString();
    // console.log(text);
    // await fs.appendFile(fileDir, "\nPHP the best");
    // await fs.writeFile(fileDir, "Mojo forever");
    // await fs.appendFile(file2Dir, "\nPHP the best");
    // await fs.writeFile(file3Dir, "Mojo forever");
    // await fs.unlink(file3Dir);
    }
    catch(error) {
        console.log(error.message);
    }
};

func();

// fs.readFile(fileDir)
//     .then(data => console.log(data))
//     .catch(error => console.log(error.message));

// fs.readFile(fileDir, (error, data)=> {
//     console.log(error);
//     console.log(data);
// });