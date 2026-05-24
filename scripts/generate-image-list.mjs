import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const files = fs
  .readdirSync(path.join(root, "public", "images"))
  .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
  .sort()
  .reverse();

const outDir = path.join(root, "src", "lib");
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(
  path.join(outDir, "image-list.json"),
  JSON.stringify(files, null, 2)
);

console.log(`Generated image-list.json with ${files.length} images.`);
