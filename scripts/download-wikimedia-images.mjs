// scripts/download-wikimedia-images.mjs
// Downloads monument images from Wikimedia Commons at ~1920px width
// Run with: node scripts/download-wikimedia-images.mjs

import https from "node:https";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../public/monument-images");
const RESULTS_FILE = path.resolve(__dirname, "../scripts/image-results.json");

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 50 monuments: id, name, wikipedia page title for image lookup
const MONUMENTS = [
  // ── Lesser-known ──────────────────────────────────────────────────────────
  { id: "chand-baori", wikiTitle: "Chand Baori" },
  { id: "kumbhalgarh-fort", wikiTitle: "Kumbhalgarh Fort" },
  { id: "jaisalmer-fort", wikiTitle: "Jaisalmer Fort" },
  { id: "orchha-fort", wikiTitle: "Orchha Fort" },
  { id: "mandu", wikiTitle: "Mandu, Madhya Pradesh" },
  { id: "gwalior-fort", wikiTitle: "Gwalior Fort" },
  { id: "kalinjar-fort", wikiTitle: "Kalinjar Fort" },
  { id: "badami-caves", wikiTitle: "Badami cave temples" },
  { id: "aihole", wikiTitle: "Aihole" },
  { id: "pattadakal", wikiTitle: "Pattadakal" },
  { id: "vittala-temple", wikiTitle: "Vittala Temple" },
  { id: "virupaksha-hampi", wikiTitle: "Virupaksha Temple, Hampi" },
  { id: "bidar-fort", wikiTitle: "Bidar Fort" },
  { id: "chitradurga-fort", wikiTitle: "Chitradurga Fort" },
  { id: "shravanabelagola", wikiTitle: "Gommateshwara statue" },
  { id: "belur-temple", wikiTitle: "Chennakeshava Temple, Belur" },
  { id: "golconda-fort", wikiTitle: "Golconda Fort" },
  { id: "warangal-fort", wikiTitle: "Warangal Fort" },
  { id: "ramappa-temple", wikiTitle: "Ramappa Temple" },
  { id: "qutb-shahi-tombs", wikiTitle: "Qutb Shahi tombs" },
  { id: "lepakshi-temple", wikiTitle: "Lepakshi" },
  { id: "lonar-crater", wikiTitle: "Lonar crater lake" },
  { id: "daulatabad-fort", wikiTitle: "Daulatabad Fort" },
  { id: "kanheri-caves", wikiTitle: "Kanheri Caves" },
  { id: "nalanda", wikiTitle: "Nalanda Mahavihara" },
  { id: "vikramshila", wikiTitle: "Vikramashila" },
  { id: "rohtasgarh-fort", wikiTitle: "Rohtasgarh Fort" },
  { id: "mahabodhi-temple", wikiTitle: "Mahabodhi Temple" },
  { id: "lothal", wikiTitle: "Lothal" },
  { id: "dholavira", wikiTitle: "Dholavira" },
  { id: "champaner-pavagadh", wikiTitle: "Champaner-Pavagadh Archaeological Park" },
  { id: "sivasagar-rang-ghar", wikiTitle: "Rang Ghar" },
  { id: "majuli", wikiTitle: "Majuli" },
  { id: "madan-kamdev", wikiTitle: "Madan Kamdev" },
  { id: "tawang-monastery", wikiTitle: "Tawang Monastery" },
  { id: "alchi-monastery", wikiTitle: "Alchi Monastery" },
  { id: "leh-palace", wikiTitle: "Leh Palace" },
  { id: "hemis-monastery", wikiTitle: "Hemis Monastery" },
  { id: "gangaikonda-cholapuram", wikiTitle: "Gangaikonda Cholapuram" },
  { id: "airavatesvara-temple", wikiTitle: "Airavatesvara Temple" },
  { id: "tranquebar-fort", wikiTitle: "Dansborg" },
  { id: "mattancherry-palace", wikiTitle: "Mattancherry Palace" },
  { id: "bekal-fort", wikiTitle: "Bekal Fort" },
  { id: "sarnath", wikiTitle: "Sarnath" },
  { id: "hampi-ruins", wikiTitle: "Hampi" },
  // ── Well-known ─────────────────────────────────────────────────────────────
  { id: "ajanta-caves", wikiTitle: "Ajanta Caves" },
  { id: "ellora-caves", wikiTitle: "Ellora Caves" },
  { id: "fatehpur-sikri", wikiTitle: "Fatehpur Sikri" },
  { id: "brihadeeswarar-temple", wikiTitle: "Brihadeeswarar Temple" },
  { id: "humayuns-tomb", wikiTitle: "Humayun's Tomb" },
];

function httpsGet(url, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error("Too many redirects"));
    const opts = new URL(url);
    https.get(
      { hostname: opts.hostname, path: opts.pathname + opts.search, headers: { "User-Agent": "IndiaHeritageMap/1.0 (educational open-source project; contact: msadityakumar@gmail.com)" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith("http") ? res.headers.location : `https://${opts.hostname}${res.headers.location}`;
          res.resume();
          return resolve(httpsGet(next, redirectCount + 1));
        }
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ statusCode: res.statusCode, body: data, headers: res.headers }));
        res.on("error", reject);
      }
    ).on("error", reject);
  });
}

function downloadFile(url, dest, redirectCount = 0) {
  return new Promise((resolve, reject) => {
    if (redirectCount > 10) return reject(new Error("Too many redirects"));
    const opts = new URL(url);
    https.get(
      { hostname: opts.hostname, path: opts.pathname + opts.search, headers: { "User-Agent": "IndiaHeritageMap/1.0 (educational open-source project; contact: msadityakumar@gmail.com)" } },
      (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const next = res.headers.location.startsWith("http") ? res.headers.location : `https://${opts.hostname}${res.headers.location}`;
          res.resume();
          return resolve(downloadFile(next, dest, redirectCount + 1));
        }
        if (res.statusCode !== 200) {
          res.resume();
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve(dest)));
        file.on("error", (e) => { fs.unlink(dest, () => {}); reject(e); });
      }
    ).on("error", reject);
  });
}

async function getWikipediaImageFilename(wikiTitle) {
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=name&titles=${encodeURIComponent(wikiTitle)}`;
  const res = await httpsGet(url);
  const data = JSON.parse(res.body);
  const pages = data.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  return page?.pageimage || null;
}

async function getWikimediaImageUrl(filename) {
  // Use the Commons API to get the URL at 1920px width
  const url = `https://commons.wikimedia.org/w/api.php?action=query&titles=File:${encodeURIComponent(filename)}&prop=imageinfo&iiprop=url&iiurlwidth=1920&format=json`;
  const res = await httpsGet(url);
  const data = JSON.parse(res.body);
  const pages = data.query?.pages;
  if (!pages) return null;
  const page = Object.values(pages)[0];
  return page?.imageinfo?.[0]?.thumburl || page?.imageinfo?.[0]?.url || null;
}

function getExtension(url) {
  const match = url.match(/\.(jpg|jpeg|png|webp|gif|svg)/i);
  return match ? match[1].toLowerCase() : "jpg";
}

async function processMonument(monument, index, total) {
  const { id, wikiTitle } = monument;
  console.log(`[${index + 1}/${total}] ${id} — searching Wikipedia for "${wikiTitle}"…`);

  try {
    const filename = await getWikipediaImageFilename(wikiTitle);
    if (!filename) {
      console.log(`  ✗ No image found for "${wikiTitle}"`);
      return { id, imageUrl: null, localFile: null, error: "no image on Wikipedia page" };
    }
    console.log(`  → Commons file: ${filename}`);

    const imageUrl = await getWikimediaImageUrl(filename);
    if (!imageUrl) {
      console.log(`  ✗ Could not resolve Commons URL for ${filename}`);
      return { id, imageUrl: null, localFile: null, error: "Commons URL not found" };
    }
    console.log(`  → URL: ${imageUrl.substring(0, 80)}…`);

    const ext = getExtension(imageUrl);
    const localFilename = `${id}.${ext}`;
    const dest = path.join(OUTPUT_DIR, localFilename);

    // Skip download if file already exists
    if (fs.existsSync(dest)) {
      console.log(`  ✓ Already downloaded: ${localFilename}`);
      return { id, imageUrl, localFile: `/monument-images/${localFilename}` };
    }

    await downloadFile(imageUrl, dest);
    const stat = fs.statSync(dest);
    console.log(`  ✓ Saved: ${localFilename} (${(stat.size / 1024).toFixed(0)} KB)`);

    return { id, imageUrl, localFile: `/monument-images/${localFilename}` };
  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
    return { id, imageUrl: null, localFile: null, error: err.message };
  }
}

async function main() {
  console.log(`\n=== Wikimedia Image Downloader ===`);
  console.log(`Output: ${OUTPUT_DIR}\n`);

  const results = [];
  for (let i = 0; i < MONUMENTS.length; i++) {
    const result = await processMonument(MONUMENTS[i], i, MONUMENTS.length);
    results.push(result);
    // Polite delay between requests
    if (i < MONUMENTS.length - 1) await new Promise((r) => setTimeout(r, 300));
  }

  const successful = results.filter((r) => r.imageUrl);
  const failed = results.filter((r) => !r.imageUrl);

  console.log(`\n=== Summary ===`);
  console.log(`✓ ${successful.length} images downloaded`);
  if (failed.length) {
    console.log(`✗ ${failed.length} failed:`);
    failed.forEach((f) => console.log(`   ${f.id}: ${f.error}`));
  }

  fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to ${RESULTS_FILE}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
