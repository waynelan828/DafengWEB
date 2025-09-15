/*
  Generate brand assets (logo variants + favicons) from source images.

  Usage:
    - Place your source files in `public/brand/`:
        - mark.(png|jpg|jpeg|webp|svg)  -> square icon/logomark (preferred for favicons)
        - logo.(png|jpg|jpeg|webp|svg)  -> full logo for header
      If `mark.*` is missing, the script falls back to `logo.*` for favicons.

    - Run:
        npm run brand:gen

    - Outputs:
        public/brand/logo.png
        public/brand/logo-dark.png
        public/favicon/apple-touch-icon.png (180x180)
        public/favicon/favicon-32x32.png
        public/favicon/favicon-16x16.png
        public/favicon/favicon.ico (multi-size)
*/

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const root = process.cwd();
const brandDir = path.join(root, 'public', 'brand');
const faviconDir = path.join(root, 'public', 'favicon');

const exts = ['png', 'jpg', 'jpeg', 'webp', 'svg'];

async function findFirstExisting(baseName) {
  for (const ext of exts) {
    const p = path.join(brandDir, `${baseName}.${ext}`);
    try {
      await fs.access(p);
      return p;
    } catch {}
  }
  return null;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function enhanceForGeneral(img) {
  return img.clone().normalize().modulate({ saturation: 1.06 }).linear(1.04, -6);
}

function enhanceForDarkBg(img) {
  return img.clone().normalize().modulate({ brightness: 2, saturation: 2 }).linear(1.02, -4);
}

async function writePng(pipeline, file) {
  await pipeline.png({ compressionLevel: 9 }).toFile(file);
}

async function generate() {
  await ensureDir(brandDir);
  await ensureDir(faviconDir);

  const sourceLogo = (await findFirstExisting('logo')) || (await findFirstExisting('logo-source'));
  const sourceMark = (await findFirstExisting('mark')) || sourceLogo;

  if (!sourceLogo && !sourceMark) {
    console.error('No source images found. Please add `public/brand/mark.png` (square) and/or `public/brand/logo.png`.');
    process.exit(1);
  }

  // Prepare logo variants for header
  if (sourceLogo) {
    const logoBuffer = await fs.readFile(sourceLogo);
    const base = sharp(logoBuffer, { limitInputPixels: false });
    // Keep good resolution; UI constrains display height. Transparent background preserved.
    const logoLight = enhanceForGeneral(base).resize({ width: 1024, withoutEnlargement: true, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } });
    const logoDark = enhanceForDarkBg(base).resize({ width: 1024, withoutEnlargement: true, fit: 'inside', background: { r: 0, g: 0, b: 0, alpha: 0 } });

    await writePng(logoLight, path.join(brandDir, 'logo.png'));
    await writePng(logoDark, path.join(brandDir, 'logo-dark.png'));
  }

  // Favicons from mark (fallback to logo)
  if (sourceMark) {
    const markBuffer = await fs.readFile(sourceMark);
    const iconBase = enhanceForGeneral(sharp(markBuffer, { limitInputPixels: false }));

    // Square canvas with transparent padding if needed
    const toSquare = async (size) =>
      iconBase
        .clone()
        .resize({ width: size, height: size, fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } });

    await writePng(await toSquare(180), path.join(faviconDir, 'apple-touch-icon.png'));
    await writePng(await toSquare(32), path.join(faviconDir, 'favicon-32x32.png'));
    await writePng(await toSquare(16), path.join(faviconDir, 'favicon-16x16.png'));

    // ICO (multi-size using png-to-ico)
    const icoPngBufs = await Promise.all([
      (await toSquare(16)).png().toBuffer(),
      (await toSquare(32)).png().toBuffer(),
      (await toSquare(48)).png().toBuffer(),
    ]);
    const icoBuf = await pngToIco(icoPngBufs);
    const icoOut = path.join(faviconDir, 'favicon.ico');
    await fs.writeFile(icoOut, icoBuf);
  }

  console.log('Brand assets generated under public/brand and public/favicon');
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
