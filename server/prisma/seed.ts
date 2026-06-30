import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const monuments = [
  {
    id: "rani-ki-vav",
    name: "Rani ki Vav",
    lat: 23.8595,
    lng: 72.1093,
    state: "Gujarat",
    dynasty: "Chaulukya (Solanki)",
    era: "11th century CE",
    description:
      "A seven-story stepwell built as a memorial, with over 500 sculpted panels lining its descending galleries. Buried under silt for centuries, which is why its carvings are so well preserved.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763696/3840px-Rani_ki_vav_02_bxnnqa.jpg",
  },
  {
    id: "modhera-sun-temple",
    name: "Modhera Sun Temple",
    lat: 23.5862,
    lng: 72.1297,
    state: "Gujarat",
    dynasty: "Chaulukya (Solanki)",
    era: "11th century CE",
    description:
      "Built so that sunlight strikes the main shrine directly at the equinoxes. Has a stepped temple tank with 108 miniature shrines along its edges.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763693/Sun_Temple__Modhera_07_gk9dfr.jpg",
  },
  {
    id: "hoysaleswara-temple",
    name: "Hoysaleswara Temple, Halebidu",
    lat: 13.213,
    lng: 75.999,
    state: "Karnataka",
    dynasty: "Hoysala",
    era: "12th century CE",
    description:
      "Soapstone carving so detailed it includes friezes of thousands of elephants, lions, and horses circling the base, no two exactly alike.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782844200/Hoysaleswara_Temple_at_Halebidu_1_ixx8cu.jpg",
  },
  {
    id: "bhangarh-fort",
    name: "Bhangarh Fort",
    lat: 27.0967,
    lng: 76.2986,
    state: "Rajasthan",
    dynasty: "Kachhwaha Rajput",
    era: "17th century CE",
    description:
      "A once-thriving fortified town, now a roofless ruin folk legend insists is cursed. Worth visiting for the layout of temples, havelis, and bazaar streets alone.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763691/Bhangarh_Fort_Entrance_nddjhc.jpg",
  },
  {
    id: "unakoti",
    name: "Unakoti",
    lat: 24.2667,
    lng: 92.05,
    state: "Tripura",
    dynasty: "Unknown (likely local hill kingdoms)",
    era: "7th–9th century CE (disputed)",
    description:
      "Rock-cut and bas-relief carvings of Shiva and other deities on a forested hillside, including a 30-foot Shiva head. One of the least-visited major sites in the northeast.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763690/Hindu_Dieties_on_Unakoti_hills_Tripura_India_xmsrti.jpg",
  },
  {
    id: "sanchi-stupa",
    name: "Sanchi Stupa",
    lat: 23.4793,
    lng: 77.7398,
    state: "Madhya Pradesh",
    dynasty: "Mauryan / Shunga",
    era: "3rd century BCE onward",
    description:
      "Originally commissioned by Ashoka, the gateway carvings here are some of the oldest surviving Buddhist stone art in India.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763695/3840px-Dome_of_Sanchi_lzyyjo.jpg",
  },
  {
    id: "chittorgarh-fort",
    name: "Chittorgarh Fort",
    lat: 24.8887,
    lng: 74.6269,
    state: "Rajasthan",
    dynasty: "Sisodia Rajput (Mewar)",
    era: "7th–16th century CE",
    description:
      "One of the largest fort complexes in India, with its own palaces, temples, and towers built up over nearly a millennium of Mewar rule.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763695/Chittorgarh_fort_skyline_view_vbidpr.jpg",
  },
  {
    id: "khajuraho",
    name: "Khajuraho Group of Monuments",
    lat: 24.8318,
    lng: 79.9199,
    state: "Madhya Pradesh",
    dynasty: "Chandela",
    era: "9th–11th century CE",
    description:
      "Famous for intricate sculpture work, though the temple architecture itself, the spires, the layout, the symbolism, is just as remarkable as the carvings people come for.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763694/Khajuraho_group_of_monuments_05_h48t3t.jpg",
  },
  {
    id: "shore-temple",
    name: "Shore Temple, Mahabalipuram",
    lat: 12.6166,
    lng: 80.1989,
    state: "Tamil Nadu",
    dynasty: "Pallava",
    era: "8th century CE",
    description:
      "A granite temple standing right at the edge of the Bay of Bengal, among the earliest stone-built (rather than rock-cut) structural temples in South India.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782763693/Mahabalipuram-Shore_Temple-WUS01960_oybwsr.jpg",
  },
  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    lat: 19.8876,
    lng: 86.0945,
    state: "Odisha",
    dynasty: "Eastern Ganga",
    era: "13th century CE",
    description:
      "Built in the form of a colossal stone chariot, complete with carved wheels and horses, dedicated to the sun god Surya.",
    imageUrl: "https://res.cloudinary.com/dkvsizdx6/image/upload/v1782844200/Konark_Sun_Temple_Puri_district__Odisha__India_1_1_lozwqs.jpg",
  },
];

async function main() {
  for (const m of monuments) {
    await prisma.monument.upsert({ where: { id: m.id }, update: m, create: m });
  }
  console.log(`Seeded ${monuments.length} monuments`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
