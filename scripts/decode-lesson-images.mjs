import { readFileSync, writeFileSync, existsSync } from "node:fs";

const pairs = [
  ["public/lesson/leaf.jpg.b64", "public/lesson/leaf.jpg"],
  ["public/lesson/canopy.jpg.b64", "public/lesson/canopy.jpg"],
  ["public/og.jpg.b64", "public/og.jpg"],
  ["public/__grok/icon-180.png.b64", "public/__grok/icon-180.png"],
];

for (const [encoded, output] of pairs) {
  if (!existsSync(encoded) || existsSync(output)) continue;
  writeFileSync(output, Buffer.from(readFileSync(encoded, "utf8"), "base64"));
}
