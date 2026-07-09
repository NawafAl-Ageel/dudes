import { readFile } from "node:fs/promises";
import path from "node:path";

let cached: Promise<ArrayBuffer> | undefined;

export function loadArabicFont(): Promise<ArrayBuffer> {
  if (!cached) {
    const fontPath = path.join(process.cwd(), "src/fonts/IBMPlexArabic-Text.ttf");
    cached = readFile(fontPath).then((buffer) => {
      return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
    });
  }
  return cached;
}
