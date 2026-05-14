import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { mkdirSync } from 'fs';

// SVG designed at 512x512 base
const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <!-- Background -->
  <rect width="512" height="512" rx="96" fill="#7c3aed"/>
  <!-- Card stack: back card -->
  <rect x="100" y="130" width="260" height="340" rx="24" fill="#5b21b6" opacity="0.7"/>
  <!-- Card stack: middle card -->
  <rect x="126" y="108" width="260" height="340" rx="24" fill="#6d28d9" opacity="0.85"/>
  <!-- Card stack: front card (white) -->
  <rect x="152" y="86" width="260" height="340" rx="24" fill="white"/>
  <!-- Speech bubble icon on card -->
  <ellipse cx="282" cy="240" rx="72" ry="60" fill="#7c3aed"/>
  <polygon points="270,295 258,330 302,295" fill="#7c3aed"/>
  <!-- Dots in speech bubble -->
  <circle cx="250" cy="240" r="10" fill="white"/>
  <circle cx="282" cy="240" r="10" fill="white"/>
  <circle cx="314" cy="240" r="10" fill="white"/>
</svg>`;

mkdirSync('./public/icons', { recursive: true });

const sizes = [192, 512];
for (const size of sizes) {
  await sharp(Buffer.from(svgSource))
    .resize(size, size)
    .png()
    .toFile(`./public/icons/icon-${size}x${size}.png`);
  console.log(`Generated icon-${size}x${size}.png`);
}

// Also generate a maskable icon (512x512 with safe zone padding)
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" fill="#7c3aed"/>
  <!-- Card stack: back card -->
  <rect x="100" y="130" width="260" height="340" rx="24" fill="#5b21b6" opacity="0.7"/>
  <!-- Card stack: middle card -->
  <rect x="126" y="108" width="260" height="340" rx="24" fill="#6d28d9" opacity="0.85"/>
  <!-- Card stack: front card (white) -->
  <rect x="152" y="86" width="260" height="340" rx="24" fill="white"/>
  <!-- Speech bubble -->
  <ellipse cx="282" cy="240" rx="72" ry="60" fill="#7c3aed"/>
  <polygon points="270,295 258,330 302,295" fill="#7c3aed"/>
  <circle cx="250" cy="240" r="10" fill="white"/>
  <circle cx="282" cy="240" r="10" fill="white"/>
  <circle cx="314" cy="240" r="10" fill="white"/>
</svg>`;

await sharp(Buffer.from(maskableSvg))
  .resize(512, 512)
  .png()
  .toFile('./public/icons/icon-512x512-maskable.png');
console.log('Generated icon-512x512-maskable.png');

console.log('All icons generated successfully.');
