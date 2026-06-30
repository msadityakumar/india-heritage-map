/**
 * download-images.ts
 *
 * For every monument with a null imageUrl, this script:
 *   1. Queries the Wikipedia API to find the page's lead image filename
 *   2. Fetches the Wikimedia Commons URL for that image at 1920 px width
 *   3. Downloads the file to ../../public/monument-images/
 *   4. Updates the DB record with the local path via Prisma
 *
 * Run from the server/ directory:
 *   npm run download-images
 */

import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGE_DIR = path.resolve(__dirname, "../../public/monument-images");
const USER_AGENT =
  "IndiaHeritageMap/1.0 (educational project; contact: msadityakumar@gmail.com)";

const prisma = new PrismaClient();

// ── Wikipedia page titles for each monument id ──────────────────────────────
const WIKI_TITLES: Record<string, string> = {
  "chand-baori": "Chand Baori",
  "kumbhalgarh-fort": "Kumbhalgarh Fort",
  "jaisalmer-fort": "Jaisalmer Fort",
  orchha: "Orchha Fort",
  mandu: "Mandu, Madhya Pradesh",
  "gwalior-fort": "Gwalior Fort",
  "kalinjar-fort": "Kalinjar Fort",
  "fatehpur-sikri": "Fatehpur Sikri",
  sarnath: "Sarnath",
  "badami-caves": "Badami cave temples",
  aihole: "Aihole",
  pattadakal: "Pattadakal",
  "vittala-temple": "Vittala Temple",
  "virupaksha-temple": "Virupaksha Temple, Hampi",
  "bidar-fort": "Bidar Fort",
  "chitradurga-fort": "Chitradurga Fort",
  shravanabelagola: "Gommateshwara statue",
  "belur-temple": "Chennakeshava Temple, Belur",
  "golconda-fort": "Golconda Fort",
  "warangal-fort": "Warangal Fort",
  "ramappa-temple": "Ramappa Temple",
  "qutb-shahi-tombs": "Qutb Shahi tombs",
  "lepakshi-temple": "Lepakshi",
  "ajanta-caves": "Ajanta Caves",
  "ellora-caves": "Ellora Caves",
  "daulatabad-fort": "Daulatabad Fort",
  "lonar-crater": "Lonar crater lake",
  "kanheri-caves": "Kanheri Caves",
  nalanda: "Nalanda Mahavihara",
  vikramashila: "Vikramashila",
  "rohtasgarh-fort": "Rohtasgarh Fort",
  "mahabodhi-temple": "Mahabodhi Temple",
  lothal: "Lothal",
  dholavira: "Dholavira",
  "champaner-pavagadh": "Champaner-Pavagadh Archaeological Park",
  "rang-ghar": "Rang Ghar",
  majuli: "Majuli",
  "madan-kamdev": "Madan Kamdev",
  "tawang-monastery": "Tawang Monastery",
  "alchi-monastery": "Alchi Monastery",
  "leh-palace": "Leh Palace",
  "hemis-monastery": "Hemis Monastery",
  "brihadeeswarar-temple": "Brihadeeswarar Temple",
  "gangaikonda-cholapuram": "Gangaikonda Cholapuram",
  "airavatesvara-temple": "Airavatesvara Temple",
  "tranquebar-fort": "Dansborg",
  "padmanabhapuram-palace": "Padmanabhapuram Palace",
  "mattancherry-palace": "Mattancherry Palace",
  "bekal-fort": "Bekal Fort",
  "humayuns-tomb": "Humayun's Tomb",
};

// ── Helpers ──────────────────────────────────────────────────────────────────

async function wikiGet(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
  return res.json();
}

async function getWikipediaImageFilename(title: string): Promise<string | null> {
  const url =
    `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages` +
    `&format=json&piprop=name&titles=${encodeURIComponent(title)}`;
  const data = (await wikiGet(url)) as { query: { pages: Record<string, { pageimage?: string }> } };
  const page = Object.values(data.query.pages)[0];
  return page?.pageimage ?? null;
}

async function getCommonsImageUrl(filename: string): Promise<string | null> {
  const url =
    `https://commons.wikimedia.org/w/api.php?action=query` +
    `&titles=File:${encodeURIComponent(filename)}` +
    `&prop=imageinfo&iiprop=url&iiurlwidth=1920&format=json`;
  const data = (await wikiGet(url)) as {
    query: { pages: Record<string, { imageinfo?: { thumburl?: string; url?: string }[] }> };
  };
  const page = Object.values(data.query.pages)[0];
  return page?.imageinfo?.[0]?.thumburl ?? page?.imageinfo?.[0]?.url ?? null;
}

function fileExtFromUrl(url: string): string {
  const m = url.match(/\.(jpe?g|png|webp|gif|svg)/i);
  return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
}

async function downloadToFile(imageUrl: string, dest: string): Promise<void> {
  const res = await fetch(imageUrl, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
}

function humanSize(bytes: number): string {
  return bytes >= 1_048_576
    ? `${(bytes / 1_048_576).toFixed(1)} MB`
    : `${Math.round(bytes / 1024)} KB`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  // Only process monuments that still have no imageUrl
  const pending = await prisma.monument.findMany({
    where: { imageUrl: null },
    orderBy: { name: "asc" },
  });

  if (pending.length === 0) {
    console.log("✓ All monuments already have images. Nothing to do.");
    return;
  }

  console.log(`\n=== Downloading images for ${pending.length} monuments ===\n`);

  let ok = 0;
  let fail = 0;

  for (let i = 0; i < pending.length; i++) {
    const monument = pending[i];
    const prefix = `[${i + 1}/${pending.length}] ${monument.id}`;

    const wikiTitle = WIKI_TITLES[monument.id];
    if (!wikiTitle) {
      console.log(`${prefix}  ✗  No Wikipedia title configured — skipping`);
      fail++;
      continue;
    }

    try {
      process.stdout.write(`${prefix}  → searching Wikipedia for "${wikiTitle}"… `);

      const filename = await getWikipediaImageFilename(wikiTitle);
      if (!filename) {
        console.log(`✗  no lead image found`);
        fail++;
        continue;
      }

      const imageUrl = await getCommonsImageUrl(filename);
      if (!imageUrl) {
        console.log(`✗  Commons URL not resolved for ${filename}`);
        fail++;
        continue;
      }

      const ext = fileExtFromUrl(imageUrl);
      const localFilename = `${monument.id}.${ext}`;
      const dest = path.join(IMAGE_DIR, localFilename);
      const publicPath = `/monument-images/${localFilename}`;

      if (fs.existsSync(dest)) {
        console.log(`already cached`);
      } else {
        await downloadToFile(imageUrl, dest);
        const size = fs.statSync(dest).size;
        console.log(`✓  ${localFilename} (${humanSize(size)})`);
      }

      await prisma.monument.update({
        where: { id: monument.id },
        data: { imageUrl: publicPath },
      });

      ok++;
    } catch (err) {
      console.log(`✗  ${(err as Error).message}`);
      fail++;
    }

    // Polite delay between Wikipedia requests
    if (i < pending.length - 1) {
      await new Promise((r) => setTimeout(r, 400));
    }
  }

  console.log(`\n=== Done: ${ok} downloaded, ${fail} failed ===\n`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
