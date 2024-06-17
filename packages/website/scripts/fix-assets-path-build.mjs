import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const swFilePath = join(process.cwd(), ".vercel/output/static/sw.js");
const fileContent = await readFile(swFilePath, "utf8");
let newFileContent = fileContent.replace(/assets\//g, "_build/assets/");
newFileContent = newFileContent.replace("//# sourceMappingURL=sw.js.map", "");
await writeFile(swFilePath, newFileContent, "utf8");
