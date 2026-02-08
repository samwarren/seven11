import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "public", "cursors");

// Color palette - RGBA (salt-and-pepper wolf-like cattle dog)
const P = {
  ".": [0, 0, 0, 0],             // Transparent
  "O": [35, 35, 40, 255],        // Dark outline
  "K": [45, 45, 50, 255],        // Black patches
  "D": [75, 78, 88, 255],        // Dark grey
  "G": [110, 115, 125, 255],     // Medium grey (main body)
  "L": [155, 158, 168, 255],     // Light grey
  "W": [225, 225, 230, 255],     // White markings
  "S": [190, 192, 200, 255],     // Speckle (salt)
  "E": [30, 30, 35, 255],        // Eye
  "H": [255, 255, 255, 255],     // Eye shine
  "N": [60, 50, 55, 255],        // Nose
  "T": [255, 130, 140, 255],     // Tongue/pink
  "I": [130, 100, 110, 255],     // Inner ear
};

function validate(grid, name) {
  let ok = true;
  for (let i = 0; i < grid.length; i++) {
    if (grid[i].length !== 32) {
      console.error(`${name} row ${i} is ${grid[i].length} chars, expected 32: "${grid[i]}"`);
      ok = false;
    }
    for (let j = 0; j < grid[i].length; j++) {
      if (!(grid[i][j] in P)) {
        console.error(`${name} row ${i} col ${j} has unknown char '${grid[i][j]}'`);
        ok = false;
      }
    }
  }
  if (grid.length !== 32) {
    console.error(`${name} has ${grid.length} rows, expected 32`);
    ok = false;
  }
  if (!ok) process.exit(1);
}

function makeRow(str) {
  if (str.length > 32) return str.slice(0, 32);
  if (str.length < 32) return str + ".".repeat(32 - str.length);
  return str;
}

function mirrorGrid(grid) {
  return grid.map(row => row.split("").reverse().join(""));
}

function gridToPixels(grid) {
  const pixels = Buffer.alloc(32 * 32 * 4);
  for (let y = 0; y < 32; y++) {
    for (let x = 0; x < 32; x++) {
      const ch = grid[y][x];
      const color = P[ch] || P["."];
      const idx = (y * 32 + x) * 4;
      pixels[idx]     = color[0];
      pixels[idx + 1] = color[1];
      pixels[idx + 2] = color[2];
      pixels[idx + 3] = color[3];
    }
  }
  return pixels;
}

async function generatePNG(grid, filename) {
  const pixels = gridToPixels(grid);
  await sharp(pixels, {
    raw: { width: 32, height: 32, channels: 4 },
  })
    .resize(64, 64, { kernel: 'nearest' })
    .png()
    .toFile(path.join(outDir, filename));
  console.log(`Generated ${filename}`);
}

// ============================================================
// RIGHT-FACING - Long low wolf/cattle dog
// Wolf head, long stretched body, short legs, bushy tail
// Frame 1: stride A
// ============================================================
const rightFrame1 = [
  makeRow(""),                                   // 0
  makeRow(""),                                   // 1
  makeRow(""),                                   // 2
  makeRow(""),                                   // 3
  makeRow(""),                                   // 4
  makeRow(""),                                   // 5
  makeRow(""),                                   // 6
  makeRow(""),                                   // 7
  makeRow(""),                                   // 8
  makeRow("...OO..OO"),                          // 9  tall ears
  makeRow("..OIOO.OIIO"),                        // 10
  makeRow("..OIIOODIIDO"),                        // 11
  makeRow("..OKDKKKKDDO"),                        // 12 dark head
  makeRow(".OOEHDDDDDDOOOOOOOOOOOOO"),            // 13 eye, long body starts
  makeRow(".OKDDDDDDOSGDSGDSGDSGDSGO"),           // 14 face into body
  makeRow(".ODDLWWNOSGSGSGSGSGSGSGSO"),            // 15 muzzle, speckled body
  makeRow("..ODWWWOGDSGDSGDSGDSGDSGO"),            // 16 snout, body continues
  makeRow("...OOOOWSGSGSGSGSGSGSGSO"),             // 17 jaw, white belly edge
  makeRow("......OWLGDSGDSGDSGDSGOO"),             // 18 belly, tail starts
  makeRow("......OOODOOOODOOOODOOGO"),              // 19 legs attach, tail
  makeRow("......ODGO.ODGO.ODGO.OGO"),             // 20 four short legs + tail
  makeRow("......OGDO.OGDO.OGDO..O"),              // 21 legs
  makeRow("......OLOO.OLOO.OLOO"),                 // 22 paws
  makeRow("......OOOO.OOOO.OOOO"),                 // 23
  makeRow(""),                                   // 24
  makeRow(""),                                   // 25
  makeRow(""),                                   // 26
  makeRow(""),                                   // 27
  makeRow(""),                                   // 28
  makeRow(""),                                   // 29
  makeRow(""),                                   // 30
  makeRow(""),                                   // 31
];

// Frame 2: stride B (legs alternate)
const rightFrame2 = [
  makeRow(""),                                   // 0
  makeRow(""),                                   // 1
  makeRow(""),                                   // 2
  makeRow(""),                                   // 3
  makeRow(""),                                   // 4
  makeRow(""),                                   // 5
  makeRow(""),                                   // 6
  makeRow(""),                                   // 7
  makeRow(""),                                   // 8
  makeRow("...OO..OO"),                          // 9
  makeRow("..OIOO.OIIO"),                        // 10
  makeRow("..OIIOODIIDO"),                        // 11
  makeRow("..OKDKKKKDDO"),                        // 12
  makeRow(".OOEHDDDDDDOOOOOOOOOOOOO"),            // 13
  makeRow(".OKDDDDDDOSGDSGDSGDSGDSGO"),           // 14
  makeRow(".ODDLWWNOSGSGSGSGSGSGSGSO"),            // 15
  makeRow("..ODWWWOGDSGDSGDSGDSGDSGO"),            // 16
  makeRow("...OOOOWSGSGSGSGSGSGSGSO"),             // 17
  makeRow("......OWLGDSGDSGDSGDSGOO"),             // 18
  makeRow("......OOODOOOODOOOODOOGO"),              // 19
  makeRow(".....ODGO.ODGO.ODGO..OGO"),             // 20 shifted legs
  makeRow(".....OGDO.OGDO.OGDO...O"),              // 21
  makeRow(".....OLOO.OLOO.OLOO"),                  // 22
  makeRow(".....OOOO.OOOO.OOOO"),                  // 23
  makeRow(""),                                   // 24
  makeRow(""),                                   // 25
  makeRow(""),                                   // 26
  makeRow(""),                                   // 27
  makeRow(""),                                   // 28
  makeRow(""),                                   // 29
  makeRow(""),                                   // 30
  makeRow(""),                                   // 31
];

// ============================================================
// DOWN-FACING - wolf front view, wider stance, short legs
// ============================================================
const downFrame1 = [
  makeRow(""),                                   // 0
  makeRow(""),                                   // 1
  makeRow(""),                                   // 2
  makeRow(""),                                   // 3
  makeRow(""),                                   // 4
  makeRow(""),                                   // 5
  makeRow("........OO........OO"),               // 6  ear tips
  makeRow(".......OIOO......OOIO"),              // 7
  makeRow("......OIIOO......OOIIO"),             // 8
  makeRow(".....ODIIIDOOOOOODIIIDO"),             // 9
  makeRow(".....ODDKKDDDDDDKKDDO"),              // 10 dark mask
  makeRow("......ODDDDDDDDDDDDO"),              // 11
  makeRow("......ODDEHDDDDHEDDO"),               // 12 eyes
  makeRow("......ODDKKDDDDKKDDO"),               // 13
  makeRow(".......ODLWWNNWWLDO"),                // 14 muzzle
  makeRow(".......ODDWWWWWWDDO"),                // 15
  makeRow("........ODWWWWWWDO"),                 // 16
  makeRow("......ODGSDSGDSGDSDO"),               // 17 shoulders
  makeRow(".....ODSGSGSGSGSGSGDO"),              // 18 chest
  makeRow(".....OWWSGDSGDSGSWWDO"),              // 19
  makeRow(".....OWWGSGSGSGSGWWDO"),              // 20
  makeRow("......ODSGDSGDSGDSDO"),               // 21
  makeRow("......ODGOODOO.OODGO"),               // 22 legs
  makeRow("......OGDO.OGO..ODGO"),               // 23
  makeRow("......OGDO.ODO..ODGO"),               // 24
  makeRow("......OLLO.OLO..OLLO"),               // 25
  makeRow("......OOOO.OOO..OOOO"),               // 26
  makeRow(""),                                   // 27
  makeRow(""),                                   // 28
  makeRow(""),                                   // 29
  makeRow(""),                                   // 30
  makeRow(""),                                   // 31
];

const downFrame2 = [
  makeRow(""),                                   // 0
  makeRow(""),                                   // 1
  makeRow(""),                                   // 2
  makeRow(""),                                   // 3
  makeRow(""),                                   // 4
  makeRow(""),                                   // 5
  makeRow("........OO........OO"),               // 6
  makeRow(".......OIOO......OOIO"),              // 7
  makeRow("......OIIOO......OOIIO"),             // 8
  makeRow(".....ODIIIDOOOOOODIIIDO"),             // 9
  makeRow(".....ODDKKDDDDDDKKDDO"),              // 10
  makeRow("......ODDDDDDDDDDDDO"),              // 11
  makeRow("......ODDEHDDDDHEDDO"),               // 12
  makeRow("......ODDKKDDDDKKDDO"),               // 13
  makeRow(".......ODLWWNNWWLDO"),                // 14
  makeRow(".......ODDWWWWWWDDO"),                // 15
  makeRow("........ODWWWWWWDO"),                 // 16
  makeRow("......ODGSDSGDSGDSDO"),               // 17
  makeRow(".....ODSGSGSGSGSGSGDO"),              // 18
  makeRow(".....OWWSGDSGDSGSWWDO"),              // 19
  makeRow(".....OWWGSGSGSGSGWWDO"),              // 20
  makeRow("......ODSGDSGDSGDSDO"),               // 21
  makeRow(".....ODGOO.DOO.OODGDO"),              // 22
  makeRow(".....OGDO..OGO..ODGO"),               // 23
  makeRow(".....OGDO..ODO..ODGO"),               // 24
  makeRow(".....OLLO..OLO..OLLO"),               // 25
  makeRow(".....OOOO..OOO..OOOO"),               // 26
  makeRow(""),                                   // 27
  makeRow(""),                                   // 28
  makeRow(""),                                   // 29
  makeRow(""),                                   // 30
  makeRow(""),                                   // 31
];

// ============================================================
// UP-FACING - wolf back view, bushy tail, short legs
// ============================================================
const upFrame1 = [
  makeRow(""),                                   // 0
  makeRow(""),                                   // 1
  makeRow(""),                                   // 2
  makeRow(""),                                   // 3
  makeRow(""),                                   // 4
  makeRow("..............OO"),                   // 5  tail
  makeRow("........OO...OGSO"),                  // 6  ears + tail
  makeRow(".......ODOO..OGDO"),                  // 7
  makeRow("......ODDDO..ODDO"),                  // 8
  makeRow(".....ODDDDOOOODDO"),                  // 9
  makeRow(".....ODKKDDDDKKDO"),                  // 10
  makeRow("......ODDDDDDDDDO"),                 // 11
  makeRow("......ODDDDDDDDO"),                  // 12
  makeRow(".......ODDDDDDDO"),                  // 13
  makeRow("......ODSGDSGDSGDO"),                 // 14 shoulders
  makeRow(".....ODGSGSGSGSGSGDO"),               // 15 back
  makeRow(".....OSDSGDSGDSGDSDO"),               // 16
  makeRow(".....OGSGSGSGSGSGSGDO"),              // 17
  makeRow("......ODSGDSGDSGDSDO"),               // 18
  makeRow("......OGSGSGSGSGSGDO"),               // 19
  makeRow("......ODSGDSGDSGDSDO"),               // 20
  makeRow(".......ODGOODOOODGO"),                // 21 legs
  makeRow(".......OGDO.OGO.ODGO"),               // 22
  makeRow(".......OGDO.ODO.ODGO"),               // 23
  makeRow(".......OLLO.OLO.OLLO"),               // 24
  makeRow(".......OOOO.OOO.OOOO"),               // 25
  makeRow(""),                                   // 26
  makeRow(""),                                   // 27
  makeRow(""),                                   // 28
  makeRow(""),                                   // 29
  makeRow(""),                                   // 30
  makeRow(""),                                   // 31
];

const upFrame2 = [
  makeRow(""),                                   // 0
  makeRow(""),                                   // 1
  makeRow(""),                                   // 2
  makeRow(""),                                   // 3
  makeRow(""),                                   // 4
  makeRow("..............OO"),                   // 5
  makeRow("........OO...OGSO"),                  // 6
  makeRow(".......ODOO..OGDO"),                  // 7
  makeRow("......ODDDO..ODDO"),                  // 8
  makeRow(".....ODDDDOOOODDO"),                  // 9
  makeRow(".....ODKKDDDDKKDO"),                  // 10
  makeRow("......ODDDDDDDDDO"),                 // 11
  makeRow("......ODDDDDDDDO"),                  // 12
  makeRow(".......ODDDDDDDO"),                  // 13
  makeRow("......ODSGDSGDSGDO"),                 // 14
  makeRow(".....ODGSGSGSGSGSGDO"),               // 15
  makeRow(".....OSDSGDSGDSGDSDO"),               // 16
  makeRow(".....OGSGSGSGSGSGSGDO"),              // 17
  makeRow("......ODSGDSGDSGDSDO"),               // 18
  makeRow("......OGSGSGSGSGSGDO"),               // 19
  makeRow("......ODSGDSGDSGDSDO"),               // 20
  makeRow("......ODGOODO.OODGDO"),               // 21 legs spread
  makeRow("......OGDO.OGO..ODGO"),               // 22
  makeRow("......OGDO.ODO..ODGO"),               // 23
  makeRow("......OLLO.OLO..OLLO"),               // 24
  makeRow("......OOOO.OOO..OOOO"),               // 25
  makeRow(""),                                   // 26
  makeRow(""),                                   // 27
  makeRow(""),                                   // 28
  makeRow(""),                                   // 29
  makeRow(""),                                   // 30
  makeRow(""),                                   // 31
];

// LEFT = mirrored RIGHT
const leftFrame1 = mirrorGrid(rightFrame1);
const leftFrame2 = mirrorGrid(rightFrame2);

validate(rightFrame1, "rightFrame1");
validate(rightFrame2, "rightFrame2");
validate(downFrame1,  "downFrame1");
validate(downFrame2,  "downFrame2");
validate(upFrame1,    "upFrame1");
validate(upFrame2,    "upFrame2");
validate(leftFrame1,  "leftFrame1");
validate(leftFrame2,  "leftFrame2");

// NOTE: right/left frames swapped to fix mirror direction
await generatePNG(rightFrame1, "dog-walk-left-1.png");
await generatePNG(rightFrame2, "dog-walk-left-2.png");
await generatePNG(leftFrame1,  "dog-walk-right-1.png");
await generatePNG(leftFrame2,  "dog-walk-right-2.png");
await generatePNG(upFrame1,    "dog-walk-up-1.png");
await generatePNG(upFrame2,    "dog-walk-up-2.png");
await generatePNG(downFrame1,  "dog-walk-down-1.png");
await generatePNG(downFrame2,  "dog-walk-down-2.png");

console.log("Done! All 8 walking dog cursor PNGs generated.");
