// @ts-check

import { readFile, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

/**
 * @param {string} filePath
 * @returns {Promise<string>}
 */
function createMD5 (filePath) {
  return new Promise((res) => {
    const hash = createHash("md5");

    const rStream = createReadStream(filePath);
    rStream.on("data", (data) => {
      hash.update(data);
    });
    rStream.on("end", () => {
      res(hash.digest("hex"));
    });
  });
}

const swFilePath = join(process.cwd(), ".vercel/output/static/sw.js");
const fileContent = await readFile(swFilePath, "utf8");
let newFileContent = fileContent.replace(/assets\//g, "_build/assets/");
newFileContent = newFileContent.replace("//# sourceMappingURL=sw.js.map", "");

const indexHtmlFilePath = join(process.cwd(), ".vercel/output/static/index.html");
const indexHtmlMD5 = await createMD5(indexHtmlFilePath);

newFileContent = newFileContent.replace("REV_INDEX_HTML_TO_CHANGE", indexHtmlMD5);
await writeFile(swFilePath, newFileContent, "utf8");
