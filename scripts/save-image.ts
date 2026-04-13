import fs from 'fs';
import path from 'path';

const images = [
  { name: 'teal-bag.png', prompt: 'A high-end studio photograph of a teal Chanel Classic Flap Bag in caviar leather with silver hardware, luxury aesthetic, clean white background.' },
  { name: 'j12-watch.png', prompt: 'A high-end studio photograph of a white Chanel J12 ceramic watch with diamond markers, luxury aesthetic, clean white background.' },
  { name: 'woven-loafers.png', prompt: 'A high-end studio photograph of black woven leather loafers, luxury aesthetic, clean white background.' },
  { name: 'black-bag.png', prompt: 'A high-end studio photograph of a black Chanel Classic Flap Bag in caviar leather with gold hardware, luxury aesthetic, clean white background.' }
];

async function saveImage(name, base64) {
  const filePath = path.join('public/images', name);
  fs.writeFileSync(filePath, Buffer.from(base64, 'base64'));
  console.log(`Saved ${name}`);
}

// This script will be called with base64 data as arguments
const [,, name, base64] = process.argv;
if (name && base64) {
  saveImage(name, base64);
}
