import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SRC = resolve(ROOT, "public/logo/devmob-logo-bg.png");

/**
 * Generate a rounded-corner PNG at the given size.
 * radiusRatio: 0 = square, 0.5 = perfect circle, 0.22 = iOS-style squircle.
 */
async function generateRounded({ size, radiusRatio = 0.22, outPath, label }) {
  const radius = Math.round(size * radiusRatio);

  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
      <rect x="0" y="0" width="${size}" height="${size}" rx="${radius}" ry="${radius}" fill="white"/>
    </svg>`,
  );

  await mkdir(dirname(outPath), { recursive: true });
  await sharp(SRC)
    .resize(size, size, { fit: "cover" })
    .composite([{ input: mask, blend: "dest-in" }])
    .png({ quality: 95, compressionLevel: 9 })
    .toFile(outPath);

  console.log(`✓ ${label.padEnd(28)}  ${size}×${size}  r=${radius}px  →  ${outPath.replace(ROOT + "/", "")}`);
}

console.log("Generating rounded logo variants from", SRC.replace(ROOT + "/", ""));
console.log("---");

// Squircle (iOS-style ~22% radius) — used as default favicon
await generateRounded({
  size: 512,
  radiusRatio: 0.22,
  outPath: resolve(ROOT, "public/logo/devmob-logo-rounded.png"),
  label: "Rounded logo (squircle)",
});

// Apple touch icon 180×180 — iOS auto-rounds, but pre-rounded looks crisper
await generateRounded({
  size: 180,
  radiusRatio: 0.22,
  outPath: resolve(ROOT, "public/apple-touch-icon.png"),
  label: "Apple touch icon",
});

// Favicon variants
await generateRounded({
  size: 32,
  radiusRatio: 0.22,
  outPath: resolve(ROOT, "public/logo/favicon-32.png"),
  label: "Favicon 32",
});
await generateRounded({
  size: 192,
  radiusRatio: 0.22,
  outPath: resolve(ROOT, "public/logo/favicon-192.png"),
  label: "Favicon 192 (PWA)",
});

console.log("---");
console.log("Done.");
