// Prepares event photos for the Cyber Summit recap album.
//
// Usage (from frontend/):  npm run photos:recap -- <source-folder>
//
// Each image in <source-folder> is auto-rotated from its EXIF data, resized so its long
// edge is at most 1800px, and saved as a compressed JPEG to public/cyber_images/recap/
// as 01.jpg, 02.jpg, ... Byte-identical duplicates are skipped. The script finishes by
// printing an ALBUM array to paste into src/pages/CyberSummit.tsx.

import { createHash } from 'node:crypto'
import { mkdir, readdir, readFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const MAX_EDGE = 1800
const QUALITY = 80
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif', '.tif', '.tiff'])

const frontendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(frontendDir, 'public', 'cyber_images', 'recap')

const srcArg = process.argv[2]
if (!srcArg) {
  console.error('Usage: npm run photos:recap -- <source-folder>')
  process.exit(1)
}
const srcDir = path.resolve(process.cwd(), srcArg)

const files = (await readdir(srcDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

if (files.length === 0) {
  console.error(`No images found in ${srcDir}`)
  process.exit(1)
}

// The output folder is wiped below. Never let that happen to the source photos.
if (srcDir === outDir || srcDir.startsWith(outDir + path.sep)) {
  console.error(`Source folder is inside the output folder (${outDir}), which is cleared on every run.`)
  console.error('Keep your originals elsewhere, e.g. frontend/photo-originals/, and point the script at that.')
  process.exit(1)
}

// Start from a clean folder so stale photos from a previous run don't linger.
await rm(outDir, { recursive: true, force: true })
await mkdir(outDir, { recursive: true })

const seen = new Set()
const album = []

for (const file of files) {
  const input = await readFile(path.join(srcDir, file))
  const hash = createHash('sha1').update(input).digest('hex')
  if (seen.has(hash)) {
    console.warn(`skip  ${file} (duplicate)`)
    continue
  }
  seen.add(hash)

  const name = `${String(album.length + 1).padStart(2, '0')}.jpg`
  const { width, height } = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(path.join(outDir, name))

  album.push({ src: `/cyber_images/recap/${name}`, width, height, file })
  console.warn(`ok    ${file} -> ${name} (${width}x${height})`)
}

console.log('\nconst ALBUM: AlbumPhoto[] = [')
for (const { src, width, height, file } of album) {
  console.log(`  { src: '${src}', width: ${width}, height: ${height}, alt: '' }, // ${file}`)
}
console.log(']')
