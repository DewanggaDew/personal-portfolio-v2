#!/usr/bin/env node
/**
 * optimize-images.mjs
 *
 * Re-encodes every raster image in `src/imports/` (or a custom directory)
 * to a well-compressed WebP using sharp. Originals in non-webp formats are
 * removed by default once their replacement is on disk; pass `--keep-source`
 * to retain them. Idempotent: re-running on already-optimized files leaves
 * the originals untouched if the new output would be larger.
 *
 * Flags
 *   --dir=<path>          input directory (default: src/imports)
 *   --quality=<0..100>    WebP quality (default: 82)
 *   --effort=<0..6>       WebP encoder effort (default: 6 = best ratio)
 *   --max-width=<px>      clamp longest edge by width; 0 disables (default: 1024)
 *   --keep-source         do not delete .jpg/.jpeg/.png after WebP is written
 *   --dry-run             print plan only, write nothing
 */

import { readdir, stat, readFile, writeFile, unlink } from "node:fs/promises";
import { join, parse, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const SUPPORTED_INPUTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".tiff", ".tif"]);

function parseArgs(argv) {
  const out = {
    dir: "src/imports",
    quality: 82,
    effort: 6,
    maxWidth: 1024,
    keepSource: false,
    dryRun: false,
  };
  for (const arg of argv.slice(2)) {
    if (arg === "--keep-source") out.keepSource = true;
    else if (arg === "--dry-run") out.dryRun = true;
    else if (arg.startsWith("--dir=")) out.dir = arg.slice("--dir=".length);
    else if (arg.startsWith("--quality=")) out.quality = Number(arg.slice("--quality=".length));
    else if (arg.startsWith("--effort=")) out.effort = Number(arg.slice("--effort=".length));
    else if (arg.startsWith("--max-width=")) out.maxWidth = Number(arg.slice("--max-width=".length));
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: optimize-images [options]

  --dir=<path>          input directory (default: src/imports)
  --quality=<0..100>    WebP quality (default: 82)
  --effort=<0..6>       WebP encoder effort (default: 6)
  --max-width=<px>      clamp longest edge; 0 disables (default: 1024)
  --keep-source         keep .jpg/.png originals after WebP is written
  --dry-run             print plan only`);
      process.exit(0);
    }
  }
  if (!Number.isFinite(out.quality) || out.quality < 1 || out.quality > 100) {
    throw new Error(`--quality must be 1..100 (got ${out.quality})`);
  }
  if (!Number.isFinite(out.effort) || out.effort < 0 || out.effort > 6) {
    throw new Error(`--effort must be 0..6 (got ${out.effort})`);
  }
  if (!Number.isFinite(out.maxWidth) || out.maxWidth < 0) {
    throw new Error(`--max-width must be >= 0 (got ${out.maxWidth})`);
  }
  return out;
}

function pad(s, n) {
  s = String(s);
  return s + " ".repeat(Math.max(0, n - s.length));
}

function formatBytes(n) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} kB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  const opts = parseArgs(process.argv);
  const projectRoot = resolve(fileURLToPath(import.meta.url), "..", "..");
  const inputDir = resolve(projectRoot, opts.dir);

  const entries = await readdir(inputDir);
  const files = [];
  for (const name of entries) {
    const p = join(inputDir, name);
    const s = await stat(p);
    if (!s.isFile()) continue;
    const { ext } = parse(name);
    if (!SUPPORTED_INPUTS.has(ext.toLowerCase())) continue;
    files.push({ name, path: p, ext: ext.toLowerCase(), size: s.size });
  }

  if (files.length === 0) {
    console.log(`No supported images found in ${inputDir}`);
    return;
  }

  console.log(
    `Optimizing ${files.length} image(s) in ${opts.dir} ` +
      `(quality=${opts.quality}, effort=${opts.effort}, ` +
      `maxWidth=${opts.maxWidth || "off"}, ` +
      `removeSource=${!opts.keepSource}, dryRun=${opts.dryRun})\n`,
  );

  console.log(pad("SOURCE", 56), pad("BEFORE", 12), pad("AFTER", 12), "SAVED");
  console.log("-".repeat(96));

  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of files) {
    const { name: baseName } = parse(f.name);
    const outName = `${baseName}.webp`;
    const outPath = join(inputDir, outName);
    const inPlace = f.ext === ".webp";

    // Read the source into memory first so we never hold a file handle on
    // the source while writing the destination. On Windows, holding both
    // open at once with the same path triggers EPERM/UNKNOWN errors.
    const sourceBuf = await readFile(f.path);
    let pipeline = sharp(sourceBuf, { failOn: "error" });
    const meta = await pipeline.metadata();
    if (opts.maxWidth > 0 && meta.width && meta.width > opts.maxWidth) {
      pipeline = pipeline.resize({ width: opts.maxWidth, withoutEnlargement: true });
    }
    pipeline = pipeline.webp({
      quality: opts.quality,
      effort: opts.effort,
      smartSubsample: true,
    });

    const buf = await pipeline.toBuffer();
    const newSize = buf.length;
    const saved = f.size - newSize;
    const ratio = ((saved / f.size) * 100).toFixed(1);

    let status = "OK";
    if (newSize >= f.size) {
      status = "SKIP (would grow)";
    }

    console.log(
      pad(f.name, 56),
      pad(formatBytes(f.size), 12),
      pad(formatBytes(newSize), 12),
      `${saved >= 0 ? "-" : "+"}${formatBytes(Math.abs(saved))}  (${ratio}%)  ${status}`,
    );

    if (status === "OK" && !opts.dryRun) {
      // We already have the encoded bytes in memory, so a simple write is safe
      // (the buffer can't be corrupted by a partial encode). Atomic rename was
      // tried first but Windows refuses rename-over when another process
      // (e.g. an IDE preview) holds a read handle on the destination.
      await writeFile(outPath, buf);
      // Sanity-check the written file before touching the source.
      const verify = await readFile(outPath);
      if (verify.length !== newSize) {
        throw new Error(`Verification failed for ${outName}: size mismatch`);
      }
      if (!inPlace && !opts.keepSource) {
        await unlink(f.path);
      }
    }

    totalBefore += f.size;
    totalAfter += status === "OK" ? newSize : f.size;
  }

  console.log("-".repeat(96));
  console.log(
    pad("TOTAL", 56),
    pad(formatBytes(totalBefore), 12),
    pad(formatBytes(totalAfter), 12),
    `-${formatBytes(totalBefore - totalAfter)}  (${(((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1)}%)`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
