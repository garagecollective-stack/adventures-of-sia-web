import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs';
import canvasPkg from '@napi-rs/canvas';
import fs from 'fs';
import path from 'path';

const { createCanvas, DOMMatrix, Path2D, ImageData } = canvasPkg;
// pdfjs expects some browser globals
if (!globalThis.DOMMatrix && DOMMatrix) globalThis.DOMMatrix = DOMMatrix;
if (!globalThis.Path2D && Path2D) globalThis.Path2D = Path2D;
if (!globalThis.ImageData && ImageData) globalThis.ImageData = ImageData;

const IDS = ['issue-1', 'issue-2', 'issue-3', 'issue-4', 'issue-5', 'issue-6', 'issue-7', 'issue-8'];
const dir = 'public/comics';
const manifest = {};

for (const id of IDS) {
  const data = new Uint8Array(fs.readFileSync(path.join(dir, id + '.pdf')));
  const doc = await pdfjs.getDocument({
    data, disableWorker: true,
    standardFontDataUrl: 'node_modules/pdfjs-dist/standard_fonts/',
  }).promise;
  const n = doc.numPages;
  const outDir = path.join(dir, id);
  fs.mkdirSync(outDir, { recursive: true });

  let ratio = 1.4;
  for (let i = 1; i <= n; i++) {
    const page = await doc.getPage(i);
    const vp0 = page.getViewport({ scale: 1 });
    ratio = vp0.height / vp0.width;
    const scale = 1100 / vp0.width;            // ~1100px wide pages
    const vp = page.getViewport({ scale });
    const canvas = createCanvas(Math.ceil(vp.width), Math.ceil(vp.height));
    const ctx = canvas.getContext('2d');
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const buf = await canvas.encode('jpeg', 82);
    fs.writeFileSync(path.join(outDir, `page-${i}.jpg`), buf);
    process.stdout.write(`  ${id} page ${i}/${n}   \r`);
  }
  manifest[id] = { pages: n, ratio: Number(ratio.toFixed(3)) };
  console.log(`\n${id}: ${n} pages (ratio ${ratio.toFixed(3)})`);
}

fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('DONE', JSON.stringify(manifest));
