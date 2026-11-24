import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) throw new Error("MAKEFUN_OUTPUT_DIR is not set");

const entry =
  "The GPU finished in four minutes, and I spent the other two days explaining to myself why it was wrong.";

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Read-back self-check: one line, 1-200 chars, no trailing newline,
// keeps the GPU-setup anchor and the self-argument punch at the end.
const back = readFileSync(outPath, "utf8");
if (back !== entry) throw new Error("entry.txt does not match the entry");
if (back.length < 1 || back.length > 200) throw new Error("entry out of range");
if (back.endsWith("\n")) throw new Error("trailing newline");
if (back.includes("\n")) throw new Error("must be a single line");
if (back.includes("  ")) throw new Error("double space");
if (!back.includes("GPU finished in four minutes")) throw new Error("setup anchor missing");
if (!back.endsWith("why it was wrong.")) throw new Error("punch missing");
console.log(`wrote ${outPath} (${back.length} chars, 1 line)`);
