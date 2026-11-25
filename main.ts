// The Worst App Idea Ever Pitched — make.fun entry
// Writes the pitch to /output/entry.txt, then verifies it against the gate:
// UTF-8 text, 1 to 240 characters, a single line, not only whitespace.
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const ENTRY =
  "An app that tracks all your forgotten subscriptions and charges $9.99 a month to remind you about them — including the $9.99 a month you pay for the reminder.";

function selfCheck(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`gate failed: ${chars} chars, need 1-240`);
  }
  if (text.split("\n").length !== 1) {
    throw new Error("gate failed: entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
}

mkdirSync("/output", { recursive: true });
selfCheck(ENTRY);
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read-back verification, byte-for-byte.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
}
selfCheck(back);
console.log(`wrote ${[...ENTRY].length} chars to /output/entry.txt (verified)`);
