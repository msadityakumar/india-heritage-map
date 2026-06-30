import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const monuments = [
  // ── Original 10 ────────────────────────────────────────────────────────────
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

  // ── 50 New Monuments ───────────────────────────────────────────────────────

  // Rajasthan
  {
    id: "chand-baori",
    name: "Chand Baori, Abhaneri",
    lat: 27.0082,
    lng: 76.607,
    state: "Rajasthan",
    dynasty: "Nikumbha",
    era: "9th century CE",
    description:
      "A 13-storey stepped well with 3,500 narrow steps arranged in a perfect geometric grid descending 30 metres to the water. Built over nearly two centuries, it is one of the deepest and most visually striking stepwells in India.",
    imageUrl: null,
  },
  {
    id: "kumbhalgarh-fort",
    name: "Kumbhalgarh Fort",
    lat: 25.151,
    lng: 73.5882,
    state: "Rajasthan",
    dynasty: "Mewar (Sisodia Rajput)",
    era: "15th century CE",
    description:
      "The fort's outer wall stretches 36 kilometres — the world's second-longest continuous wall after the Great Wall of China. Birthplace of Maharana Pratap, it was never successfully stormed in its entire history.",
    imageUrl: null,
  },
  {
    id: "jaisalmer-fort",
    name: "Jaisalmer Fort",
    lat: 26.9124,
    lng: 70.907,
    state: "Rajasthan",
    dynasty: "Bhati Rajput",
    era: "12th century CE",
    description:
      "One of the only fully inhabited forts in the world. Built from golden-yellow sandstone, it glows amber at sunset — earning Jaisalmer the name 'the Golden City.' Over 3,000 people still live and trade within its walls.",
    imageUrl: null,
  },

  // Madhya Pradesh
  {
    id: "orchha",
    name: "Orchha Fort Complex",
    lat: 25.3516,
    lng: 78.6421,
    state: "Madhya Pradesh",
    dynasty: "Bundela Rajput",
    era: "16th–17th century CE",
    description:
      "A complex of palaces, temples, and cenotaphs on a river island in the Betwa. The Chhatris lining the riverside — domed memorial pavilions of Bundela rulers — are among the finest funerary monuments in Central India.",
    imageUrl: null,
  },
  {
    id: "mandu",
    name: "Mandu (Mandavgadh)",
    lat: 22.359,
    lng: 75.396,
    state: "Madhya Pradesh",
    dynasty: "Malwa Sultanate",
    era: "15th century CE",
    description:
      "A ruined medieval city spread across a plateau, famous for the Jahaz Mahal (Ship Palace), designed to look like a ship when its courtyards flooded with rainwater. The love story of Sultan Baz Bahadur and the singer Rupmati is set here.",
    imageUrl: null,
  },
  {
    id: "gwalior-fort",
    name: "Gwalior Fort",
    lat: 26.2276,
    lng: 78.1695,
    state: "Madhya Pradesh",
    dynasty: "Tomar Rajput",
    era: "8th–16th century CE",
    description:
      "A sandstone citadel rising 100 metres sheer from the plain, described by Babur as 'the pearl among fortresses in Hind.' The Man Mandir Palace inside is decorated with vivid blue-and-yellow tilework and carries carved kiosks on the parapet.",
    imageUrl: null,
  },

  // Uttar Pradesh
  {
    id: "kalinjar-fort",
    name: "Kalinjar Fort",
    lat: 24.996,
    lng: 80.4884,
    state: "Uttar Pradesh",
    dynasty: "Chandela",
    era: "7th–16th century CE",
    description:
      "One of India's most ancient hill forts, perched on the Vindhya plateau at 700 metres. The site contains rock-cut sculptures, a sacred tank, cave temples, and Chandela-era inscriptions — most tourists have never heard of it.",
    imageUrl: null,
  },
  {
    id: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    lat: 27.0945,
    lng: 77.6679,
    state: "Uttar Pradesh",
    dynasty: "Mughal",
    era: "16th century CE",
    description:
      "Akbar's grand planned capital, built in 15 years and abandoned after just 14 years of occupation — possibly due to water shortage. The Buland Darwaza at 54 metres remains the tallest gateway in the world.",
    imageUrl: null,
  },
  {
    id: "sarnath",
    name: "Sarnath",
    lat: 25.381,
    lng: 83.024,
    state: "Uttar Pradesh",
    dynasty: "Mauryan / Gupta",
    era: "3rd century BCE onward",
    description:
      "Where the Buddha delivered his first sermon after attaining enlightenment. The Lion Capital of Ashoka found here — now India's national emblem — stood atop a polished sandstone pillar in the 3rd century BCE.",
    imageUrl: null,
  },

  // Karnataka
  {
    id: "badami-caves",
    name: "Badami Cave Temples",
    lat: 15.9178,
    lng: 75.6792,
    state: "Karnataka",
    dynasty: "Badami Chalukya",
    era: "6th–7th century CE",
    description:
      "Four rock-cut temples carved into sandstone cliffs above a green lake. Cave 3 contains some of the earliest large Vaishnava carvings in Deccan art, including an 18-armed Nataraja and a massive Trivikrama panel.",
    imageUrl: null,
  },
  {
    id: "aihole",
    name: "Aihole",
    lat: 16.0003,
    lng: 75.8869,
    state: "Karnataka",
    dynasty: "Badami Chalukya",
    era: "4th–8th century CE",
    description:
      "Considered the birthplace of Indian temple architecture, with over 125 temples in a single town — an open-air laboratory where Chalukya craftsmen experimented from flat-roofed halls to the earliest curved Nagara shikharas.",
    imageUrl: null,
  },
  {
    id: "pattadakal",
    name: "Pattadakal",
    lat: 15.9481,
    lng: 75.8176,
    state: "Karnataka",
    dynasty: "Badami Chalukya",
    era: "7th–8th century CE",
    description:
      "UNESCO World Heritage Site where Chalukya kings held coronations. Nine of its ten temples are in the Dravidian style, but one — the Papanatha — fuses Nagara and Dravidian, representing a daring architectural experiment.",
    imageUrl: null,
  },
  {
    id: "vittala-temple",
    name: "Vittala Temple, Hampi",
    lat: 15.3366,
    lng: 76.4624,
    state: "Karnataka",
    dynasty: "Vijayanagara",
    era: "15th–16th century CE",
    description:
      "Home to the iconic stone chariot and musical pillars that emit different notes when struck. The chariot's wheels once rotated on stone bearings. Construction began under Devaraya II and was never fully completed.",
    imageUrl: null,
  },
  {
    id: "virupaksha-temple",
    name: "Virupaksha Temple, Hampi",
    lat: 15.335,
    lng: 76.4601,
    state: "Karnataka",
    dynasty: "Vijayanagara",
    era: "7th century CE onward",
    description:
      "Still a functioning Hindu temple after 1,300 years, with a seven-storey gopuram visible from miles away. The main shrine casts an inverted image of the tower on its inner wall — an optical phenomenon produced by a pinhole effect.",
    imageUrl: null,
  },
  {
    id: "bidar-fort",
    name: "Bidar Fort",
    lat: 17.917,
    lng: 77.532,
    state: "Karnataka",
    dynasty: "Bahmani Sultanate",
    era: "14th–15th century CE",
    description:
      "The capital fort of the Bahmani Sultanate, with elaborate Persian tilework and a triple moat unusual in the Deccan. Bidar is also home to Bidriware, a local craft of black metal inlaid with silver invented here.",
    imageUrl: null,
  },
  {
    id: "chitradurga-fort",
    name: "Chitradurga Fort",
    lat: 14.2286,
    lng: 76.4,
    state: "Karnataka",
    dynasty: "Nayaka",
    era: "17th–18th century CE",
    description:
      "A multi-walled hill fort spread over 15 km², with 19 secret entries, 38 bastions, and 4 main gates. Folk legend credits Onake Obavva — a common woman — with holding off an entire army single-handedly through one of those secret passages.",
    imageUrl: null,
  },
  {
    id: "shravanabelagola",
    name: "Gommateshwara, Shravanabelagola",
    lat: 12.8554,
    lng: 76.484,
    state: "Karnataka",
    dynasty: "Western Ganga",
    era: "10th century CE",
    description:
      "A 58-foot monolithic statue of the Jain sage Bahubali, carved from a single granite boulder atop a hill. Every 12 years it is anointed with milk, saffron, and gold powder in the Mahamastakabhisheka ceremony attended by millions.",
    imageUrl: null,
  },
  {
    id: "belur-temple",
    name: "Chennakeshava Temple, Belur",
    lat: 13.1641,
    lng: 75.8685,
    state: "Karnataka",
    dynasty: "Hoysala",
    era: "12th century CE",
    description:
      "Took 103 years to build under three Hoysala kings. The outer walls carry 648 decorative panels of celestial women — no two alike — plus dense friezes of elephants, horses, and foliage carved in chloritic schist (soapstone).",
    imageUrl: null,
  },

  // Telangana
  {
    id: "golconda-fort",
    name: "Golconda Fort",
    lat: 17.3833,
    lng: 78.4011,
    state: "Telangana",
    dynasty: "Qutb Shahi",
    era: "13th–17th century CE",
    description:
      "Built on a granite hill 120 metres high, the fort has an acoustic system so precise that a clap at the main entrance is audible clearly at the summit 90 metres away. Golconda was also the world's primary diamond-trading hub for centuries.",
    imageUrl: null,
  },
  {
    id: "warangal-fort",
    name: "Warangal Fort",
    lat: 17.9687,
    lng: 79.5942,
    state: "Telangana",
    dynasty: "Kakatiya",
    era: "12th–13th century CE",
    description:
      "Originally a four-gate fortress with a moat, today famous for its tall carved gateway arches — the Kakatiya Kala Thoranam — that became the official symbol of Telangana state. The 1000-Pillar Temple nearby features a star-shaped ground plan.",
    imageUrl: null,
  },
  {
    id: "ramappa-temple",
    name: "Ramappa Temple",
    lat: 18.0594,
    lng: 79.9477,
    state: "Telangana",
    dynasty: "Kakatiya",
    era: "13th century CE",
    description:
      "UNESCO World Heritage Site built with lightweight porous bricks that float on water — possibly to reduce load on soft ground. The only temple in India named after its sculptor rather than its deity: the master craftsman Ramappa.",
    imageUrl: null,
  },
  {
    id: "qutb-shahi-tombs",
    name: "Qutb Shahi Tombs, Hyderabad",
    lat: 17.395,
    lng: 78.382,
    state: "Telangana",
    dynasty: "Qutb Shahi",
    era: "16th–17th century CE",
    description:
      "Seven rulers of the Qutb Shahi dynasty built their own tombs in a garden complex during their lifetimes. The tombs blend Persian, Pashtun, and Hindu architecture, and surround a mosque and a bathhouse.",
    imageUrl: null,
  },

  // Andhra Pradesh
  {
    id: "lepakshi-temple",
    name: "Lepakshi Veerabhadra Temple",
    lat: 13.8059,
    lng: 77.6094,
    state: "Andhra Pradesh",
    dynasty: "Vijayanagara",
    era: "16th century CE",
    description:
      "Famous for its 'hanging pillar' — one of 70 pillars that does not fully rest on the ground; a cloth can be passed beneath it. The ceiling paintings in the Natya Mandapa are among the finest surviving Vijayanagara murals.",
    imageUrl: null,
  },

  // Maharashtra
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    lat: 20.5519,
    lng: 75.7033,
    state: "Maharashtra",
    dynasty: "Satavahana / Vakataka / Chalukya",
    era: "2nd century BCE – 6th century CE",
    description:
      "30 rock-cut Buddhist caves whose paintings — depicting Jataka tales with sophisticated anatomy and emotional depth — are masterpieces of ancient world art. Lost for over 1,300 years before a British officer stumbled upon them while hunting in 1819.",
    imageUrl: null,
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    lat: 20.0268,
    lng: 75.1779,
    state: "Maharashtra",
    dynasty: "Rashtrakuta / Chalukya / Yadava",
    era: "6th–11th century CE",
    description:
      "34 caves cut into basalt representing Buddhist, Hindu, and Jain traditions side by side. The Kailasa Temple (Cave 16) is the world's largest monolithic rock excavation — two million tonnes of rock removed by hammer and chisel alone.",
    imageUrl: null,
  },
  {
    id: "daulatabad-fort",
    name: "Daulatabad Fort",
    lat: 19.9369,
    lng: 75.2154,
    state: "Maharashtra",
    dynasty: "Yadava / Delhi Sultanate",
    era: "12th–14th century CE",
    description:
      "Sultan Muhammad bin Tughluq relocated the entire population of Delhi here in 1327 — then abandoned the city two years later. The fort's spiral entrance tunnel was designed to disorient attackers with heat, darkness, and hidden traps.",
    imageUrl: null,
  },
  {
    id: "lonar-crater",
    name: "Lonar Crater Lake",
    lat: 19.975,
    lng: 76.509,
    state: "Maharashtra",
    dynasty: "N/A (natural; medieval temples on rim)",
    era: "c. 50,000 years ago (temples: 7th–12th century CE)",
    description:
      "A nearly circular lake formed by a meteorite impact 52,000 years ago — one of only four hyper-velocity impact craters in basaltic rock on Earth. Medieval Hindu and Buddhist temples ring its edge, adding a human layer to the geological wonder.",
    imageUrl: null,
  },
  {
    id: "kanheri-caves",
    name: "Kanheri Caves",
    lat: 19.2154,
    lng: 72.9052,
    state: "Maharashtra",
    dynasty: "Satavahana / Traikutaka / Shilaharas",
    era: "1st century BCE – 10th century CE",
    description:
      "Over 100 Buddhist caves carved into a basalt hill inside what is now a national park in Mumbai — one of the largest Buddhist cave complexes accessible in any major world city. The rock-cut water-management system still channels rainwater as intended.",
    imageUrl: null,
  },

  // Bihar
  {
    id: "nalanda",
    name: "Nalanda Mahavihara",
    lat: 25.1358,
    lng: 85.4438,
    state: "Bihar",
    dynasty: "Gupta / Pala",
    era: "5th–12th century CE",
    description:
      "UNESCO World Heritage Site and the world's first residential university, hosting up to 10,000 students and 2,000 teachers from China, Korea, Persia, and beyond. Its nine-storey library, the Dharmaganja, burned for three months when destroyed.",
    imageUrl: null,
  },
  {
    id: "vikramashila",
    name: "Vikramashila",
    lat: 25.3102,
    lng: 87.2875,
    state: "Bihar",
    dynasty: "Pala",
    era: "8th–12th century CE",
    description:
      "Founded by Pala king Dharmapala as a rival to Nalanda, specialising in Vajrayana and Tantric Buddhism. Destroyed by Bakhtiyar Khilji in 1203 — the same campaign that ended Buddhist monastic education in India for centuries.",
    imageUrl: null,
  },
  {
    id: "rohtasgarh-fort",
    name: "Rohtasgarh Fort",
    lat: 24.5742,
    lng: 83.8851,
    state: "Bihar",
    dynasty: "Rohtas dynasty / Sher Shah Suri",
    era: "7th–16th century CE",
    description:
      "A massive hilltop fort at 1,500 feet accessible by only four steep pathways. Its position in the Kaimur Range made it virtually impossible to besiege — it was never successfully stormed throughout its history.",
    imageUrl: null,
  },
  {
    id: "mahabodhi-temple",
    name: "Mahabodhi Temple, Bodh Gaya",
    lat: 24.696,
    lng: 84.9914,
    state: "Bihar",
    dynasty: "Ashokan / Gupta (reconstructed)",
    era: "3rd century BCE (reconstructed 5th–6th century CE)",
    description:
      "UNESCO World Heritage Site marking the exact spot where the Buddha attained enlightenment. The 55-metre diamond-shaped spire is one of the earliest examples of fully developed Indian brick temple architecture, still standing after 1,500 years.",
    imageUrl: null,
  },

  // Gujarat
  {
    id: "lothal",
    name: "Lothal",
    lat: 22.5217,
    lng: 72.2515,
    state: "Gujarat",
    dynasty: "Indus Valley Civilization",
    era: "c. 2400–1900 BCE",
    description:
      "Home to the world's earliest known dockyard — a 37-metre basin connected to an estuary, allowing ships to lock in and out with tides. Lothal also had a bead factory and what appears to be the earliest known use of a compass-like tool.",
    imageUrl: null,
  },
  {
    id: "dholavira",
    name: "Dholavira",
    lat: 23.8869,
    lng: 70.2162,
    state: "Gujarat",
    dynasty: "Indus Valley Civilization",
    era: "c. 3000–1500 BCE",
    description:
      "UNESCO World Heritage Site on the Rann of Kutch. Its defining feature is a sophisticated water conservation system — a network of reservoirs and rock-cut channels designed to capture every drop of seasonal rain. Also holds what may be the world's oldest signboard.",
    imageUrl: null,
  },
  {
    id: "champaner-pavagadh",
    name: "Champaner-Pavagadh",
    lat: 22.4836,
    lng: 73.5417,
    state: "Gujarat",
    dynasty: "Muzaffarid (Gujarat Sultanate)",
    era: "8th–16th century CE",
    description:
      "The only pre-Mughal Islamic city in India still largely intact. The Jama Masjid here is considered an architectural masterpiece that directly influenced the mosque Akbar later built at Fatehpur Sikri. The hilltop Kalika Mata temple remains an active pilgrimage site.",
    imageUrl: null,
  },

  // Assam
  {
    id: "rang-ghar",
    name: "Rang Ghar, Sivasagar",
    lat: 26.9934,
    lng: 94.6277,
    state: "Assam",
    dynasty: "Ahom Kingdom",
    era: "18th century CE",
    description:
      "Asia's first amphitheatre, built for Ahom royalty to watch bullfights and buffalo fights. The two-storey oval pavilion, built partly without mortar, is the oldest surviving sports arena on the continent.",
    imageUrl: null,
  },
  {
    id: "majuli",
    name: "Majuli Island",
    lat: 26.95,
    lng: 94.17,
    state: "Assam",
    dynasty: "Ahom / Vaishnavite",
    era: "15th century CE onward",
    description:
      "The world's largest river island (though rapidly shrinking due to erosion), home to Vaishnavite Sattra monasteries that have preserved a unique tradition of mask-making, classical dance, and illuminated manuscript writing for 600 years.",
    imageUrl: null,
  },
  {
    id: "madan-kamdev",
    name: "Madan Kamdev",
    lat: 26.231,
    lng: 91.591,
    state: "Assam",
    dynasty: "Pala / Koch",
    era: "9th–10th century CE",
    description:
      "A ruined complex of over 50 temples on a forested hillside with exquisitely carved erotic sculpture comparable to Khajuraho — yet almost completely unknown outside Assam. Its lush, overgrown setting makes every visit feel like a rediscovery.",
    imageUrl: null,
  },

  // Arunachal Pradesh
  {
    id: "tawang-monastery",
    name: "Tawang Monastery",
    lat: 27.5859,
    lng: 91.8678,
    state: "Arunachal Pradesh",
    dynasty: "Gelug Buddhist",
    era: "17th century CE",
    description:
      "India's largest Buddhist monastery and the second-largest in Asia after Potala Palace in Lhasa. Perched at 10,000 feet, it houses 450 monks and a library of 400-year-old manuscripts including a 28-volume Kangyur written in gold ink.",
    imageUrl: null,
  },

  // Ladakh
  {
    id: "alchi-monastery",
    name: "Alchi Monastery",
    lat: 34.2338,
    lng: 77.1834,
    state: "Ladakh",
    dynasty: "Tibetan Buddhist (Rinchen Zangpo)",
    era: "10th–11th century CE",
    description:
      "Founded by the 'Great Translator' Rinchen Zangpo, Alchi's 1,000-year-old wall paintings are the oldest surviving Buddhist murals in the western Himalayas. Unlike most Ladakhi monasteries perched on hilltops, it sits calmly in the Indus valley.",
    imageUrl: null,
  },
  {
    id: "leh-palace",
    name: "Leh Palace",
    lat: 34.1642,
    lng: 77.5847,
    state: "Ladakh",
    dynasty: "Namgyal",
    era: "17th century CE",
    description:
      "A nine-storey palace built by King Sengge Namgyal that strikingly resembles the Potala Palace in Lhasa — which was built shortly afterward. It dominates Leh from a craggy ridge and contains a collection of royal regalia and Thangka paintings.",
    imageUrl: null,
  },
  {
    id: "hemis-monastery",
    name: "Hemis Monastery",
    lat: 33.922,
    lng: 77.7031,
    state: "Ladakh",
    dynasty: "Drukpa Kagyu Buddhist",
    era: "17th century CE",
    description:
      "The richest and largest monastery in Ladakh. Every June, monks perform Cham masked dances at the Hemis Festival, and once every 12 years a colossal thangka (painted silk scroll) — one of the largest in the world — is unfurled for display.",
    imageUrl: null,
  },

  // Tamil Nadu
  {
    id: "brihadeeswarar-temple",
    name: "Brihadeeswarar Temple, Thanjavur",
    lat: 10.7828,
    lng: 79.1317,
    state: "Tamil Nadu",
    dynasty: "Chola",
    era: "11th century CE",
    description:
      "Built by Raja Raja Chola I in just seven years, the 216-foot tower is the tallest temple vimana of its era. The 80-tonne capstone was raised to the summit using a ramp extending 6 kilometres — without elephants or modern machinery.",
    imageUrl: null,
  },
  {
    id: "gangaikonda-cholapuram",
    name: "Gangaikonda Cholapuram",
    lat: 11.2065,
    lng: 79.4509,
    state: "Tamil Nadu",
    dynasty: "Chola",
    era: "11th century CE",
    description:
      "Built by Rajendra I after conquering Bengal and bringing back Ganges water on his elephants. The name means 'city of the Chola who took the Ganga.' The temple's sunken relief panels of Nataraja are finer than those at Thanjavur.",
    imageUrl: null,
  },
  {
    id: "airavatesvara-temple",
    name: "Airavatesvara Temple, Darasuram",
    lat: 10.9573,
    lng: 79.3502,
    state: "Tamil Nadu",
    dynasty: "Chola",
    era: "12th century CE",
    description:
      "The most intimate of the three Great Living Chola Temples. The entire outer staircase is designed as a massive stone chariot complete with wheels and horses — an architectural idea the Konark Sun Temple echoed a century later.",
    imageUrl: null,
  },
  {
    id: "tranquebar-fort",
    name: "Dansborg Fort, Tranquebar",
    lat: 11.0266,
    lng: 79.8512,
    state: "Tamil Nadu",
    dynasty: "Danish East India Company",
    era: "17th century CE",
    description:
      "The only surviving Danish fort in Asia, built in 1620 and held for over 200 years before being sold to the British. Tranquebar (Tharangambadi) remains a remarkably intact colonial town of Danish-style row houses on the Coromandel Coast.",
    imageUrl: null,
  },
  {
    id: "padmanabhapuram-palace",
    name: "Padmanabhapuram Palace",
    lat: 8.2459,
    lng: 77.3263,
    state: "Tamil Nadu",
    dynasty: "Travancore (Venad)",
    era: "16th century CE",
    description:
      "The largest wooden palace complex in Asia and the traditional seat of the Travancore royal family. Its floors have been polished since the 16th century with a mix of egg white, charcoal, and vegetable dye — producing a mirror-like finish still visible today.",
    imageUrl: null,
  },

  // Kerala
  {
    id: "mattancherry-palace",
    name: "Mattancherry Palace",
    lat: 9.9575,
    lng: 76.2592,
    state: "Kerala",
    dynasty: "Portuguese / Dutch (Cochin kingdom)",
    era: "16th century CE",
    description:
      "Built by the Portuguese in 1555 as a gift to the Raja of Cochin. The murals inside — depicting the Ramayana and Mahabharata in Kerala's flat, two-dimensional painting style — are among the largest and finest examples of this tradition anywhere.",
    imageUrl: null,
  },
  {
    id: "bekal-fort",
    name: "Bekal Fort",
    lat: 12.3887,
    lng: 75.0376,
    state: "Kerala",
    dynasty: "Kolathiri / Hyder Ali",
    era: "17th century CE",
    description:
      "The largest and best-preserved fort in Kerala, jutting into the Arabian Sea on a headland. Its unusual keyhole-shaped design lets defenders fire along the outer walls through angled rifle holes. Later restored by Hyder Ali's father.",
    imageUrl: null,
  },

  // Delhi
  {
    id: "humayuns-tomb",
    name: "Humayun's Tomb",
    lat: 28.5933,
    lng: 77.2507,
    state: "Delhi",
    dynasty: "Mughal",
    era: "16th century CE",
    description:
      "The first true Mughal garden-tomb and the direct architectural prototype of the Taj Mahal — built 60 years before it by Humayun's widow. The double dome, char bagh layout, and red sandstone with white marble inlay were all innovations pioneered here.",
    imageUrl: null,
  },
];

async function main() {
  for (const m of monuments) {
    await prisma.monument.upsert({ where: { id: m.id }, update: m, create: m });
  }
  console.log(`Seeded ${monuments.length} monuments`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
