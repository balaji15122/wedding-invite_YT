/**
 * WEDDING DATA CONFIGURATION
 * ══════════════════════════════════════════════════════════════════
 * This is the single source of truth for the entire wedding website.
 * ALL components, countdowns, hero titles, metadata, calendar links,
 * and RSVP forms read strictly from this file.
 *
 * Changing any value here updates the entire application automatically.
 */

export const weddingData = {
  // Couple Information
  couple: {
    groom: {
      firstName: "Krishan",
      lastName: "Sharma",
      fullName: "Krishan Sharma",
      parents: "Mr. Rajesh Sharma & Mrs. Sunita Sharma",
      familyTitle: "The Sharma Family",
      hometown: "Jaipur, Rajasthan",
      bio: "An architect with a passion for heritage design and storytelling.",
      instagram: "#",
    },
    bride: {
      firstName: "Pooja",
      lastName: "Verma",
      fullName: "Pooja Verma",
      parents: "Mr. Mohan Verma & Mrs. Kavita Verma",
      familyTitle: "The Verma Family",
      hometown: "Jaipur, Rajasthan",
      bio: "A classical vocalist and creative director with a heart for poetry.",
      instagram: "#",
    },
    monogram: "K & P",
    hashtag: "#KrishanWedsPooja",
  },

  // Key Dates (ISO format for countdown timers & calendar links)
  dates: {
    weddingDateISO: "2026-12-03T18:00:00+05:30", // 3 December 2026, 6:00 PM IST
    weddingEndDateISO: "2026-12-04T02:00:00+05:30",
    receptionDateISO: "2026-12-06T19:00:00+05:30", // 6 December 2026, 7:00 PM IST
    receptionEndDateISO: "2026-12-06T23:59:00+05:30",
    weddingFormatted: "Thursday, 3rd December 2026",
    receptionFormatted: "Sunday, 6th December 2026",
    weddingDateShort: "03 Dec 2026",
    receptionDateShort: "06 Dec 2026",
  },

  // Sanskrit Invocation & Sacred Shloka
  blessings: {
    invocation: "॥ श्री गणेशाय नमः ॥",
    invocationEnglish: "Om Shri Ganeshaya Namaha",
    shlokaSanskrit: `माङ्गल्यं तन्तुनानेन लोकजीवनहेतुना ।
कण्ठे बध्नामि सुभगे सञ्जीव शरदः शतम् ॥`,
    shlokaTranslation:
      "This sacred mangalsutra, the foundation of a shared and auspicious life, I tie around your neck, O blessed one. May we live together in joy and prosperity for a hundred glorious autumns.",
    familyBlessingNote:
      "With the grace of Almighty and the warm blessings of our ancestors, the Sharma and Verma families joyfully invite you to witness the union of two souls.",
  },

  // Venues
  venues: {
    wedding: {
      name: "The Royal Palace Banquet",
      address: "Palace Road, Near Jal Mahal, Amer Road, Jaipur, Rajasthan 302002",
      city: "Jaipur, Rajasthan",
      landmark: "Opposite Mansagar Lake Promenade",
      phone: "+91 141 267 8900",
      googleMapsUrl: "https://maps.google.com/?q=The+Royal+Palace+Banquet+Jaipur+Rajasthan",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14227.424357288673!2d75.8364893!3d26.9535359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db106a77d13c7%3A0x7d983057ad9f8168!2sJal%20Mahal!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
      parkingInfo: "Complimentary valet parking available at Gate 2. Chauffeur lounge on premises.",
      stayInfo:
        "Luxury heritage suites reserved for outstation guests at The Heritage Grand Resort (5 mins away). Shuttle services run continuously.",
    },
    reception: {
      name: "Grand Celebration Hall",
      address: "Tonk Road, Near Jawahar Circle, Jaipur, Rajasthan 302018",
      city: "Jaipur, Rajasthan",
      phone: "+91 141 278 1234",
      googleMapsUrl: "https://maps.google.com/?q=Grand+Celebration+Hall+Jaipur+Rajasthan",
      parkingInfo: "Dedicated multi-level parking and executive valet services at the Grand Porch.",
      stayInfo: "Comfortable hospitality wing available for family and guests.",
    },
  },

  // Schedule of Events (Wedding Day: 3 Dec 2026)
  weddingEvents: [
    {
      id: "haldi",
      title: "Haldi & Phoolon Ki Holi",
      dateFormatted: "Thursday, 3 Dec 2026",
      time: "10:00 AM onwards",
      venue: "The Mango Orchard Garden, Royal Palace Banquet",
      dressCode: "Sunshine Yellow, Marigold Florals & Bandhani",
      description:
        "A morning of auspicious turmeric blessings, fragrant rose petals shower, and joyful folk dholak beats.",
      icon: "Sun",
      colorTag: "from-amber-400 to-yellow-500",
    },
    {
      id: "baraat",
      title: "Shahi Baraat & Swagat",
      dateFormatted: "Thursday, 3 Dec 2026",
      time: "06:00 PM",
      venue: "Royal Grand Gates, The Royal Palace Banquet",
      dressCode: "Royal Sherwanis, Safas & Regal Lehengas",
      description:
        "The groom's majestic royal procession with royal brass band, traditional nagadas, and Rajasthani floral welcome.",
      icon: "Music",
      colorTag: "from-rose-500 to-red-600",
    },
    {
      id: "pheras",
      title: "Jai Mala & Pheras",
      dateFormatted: "Thursday, 3 Dec 2026",
      time: "09:00 PM",
      venue: "Shahi Mandapam by the Lotus Pool",
      dressCode: "Traditional Royal Indian Finery",
      description:
        "Sacred marital vows around the holy Agni under the starlit sky, accompanied by Vedic chants and musical shehnai.",
      icon: "Flame",
      colorTag: "from-amber-500 to-orange-600",
    },
    {
      id: "dinner",
      title: "Royal Shahi Daawat",
      dateFormatted: "Thursday, 3 Dec 2026",
      time: "10:00 PM onwards",
      venue: "Grand Courtyard Banquet",
      dressCode: "Festive Glamour",
      description:
        "A feast of rich Rajasthani royal culinary delicacies, live chaat bazaars, and celebratory live Sufi melodies.",
      icon: "Utensils",
      colorTag: "from-yellow-500 to-amber-700",
    },
  ],

  // Reception Event (6 Dec 2026)
  receptionEvent: {
    id: "reception",
    title: "The Grand Wedding Reception",
    dateFormatted: "Sunday, 6th December 2026",
    time: "07:00 PM onwards",
    venue: "Grand Celebration Hall, Tonk Road, Jaipur",
    dressCode: "Black Tie, Evening Tuxedos & Glamorous Indo-Western",
    description:
      "Join us for an unforgettable evening of live symphonic melodies, felicitations, artisanal cocktails, and a grand multi-cuisine dinner banquet.",
    highlights: [
      "Live Fusion Band & Orchestra",
      "Signature Mocktails & Cocktails Bar",
      "Celebratory Cake Cutting & Photo Op",
      "Royal Multi-Cuisine Gourmet Buffet",
    ],
  },

  // Love Story Milestones
  loveStory: [
    {
      step: "01",
      title: "A Serendipitous Coffee",
      date: "December 2023",
      location: "The Heritage Roastery, Jaipur",
      description:
        "Two cups of hazelnut cappuccino and an unplanned conversation that made the world stand still. A thirty-minute hello turned into four unforgettable hours of laughing and talking about dreams.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=700&q=80",
    },
    {
      step: "02",
      title: "Sunset Over Nahargarh",
      date: "March 2024",
      location: "Nahargarh Fort, Rajasthan",
      description:
        "Watching the golden dusk melt into the twinkling night lights of the Pink City. In that quiet breeze high above the hills, we knew our stories had found their home.",
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=700&q=80",
    },
    {
      step: "03",
      title: "The Starlit Proposal",
      date: "November 2024",
      location: "Lake Pichola, Udaipur",
      description:
        "Surrounded by glowing diyas, floating marigolds, and the moon reflecting on serene lake waters, Krishan bent on one knee. With tears of joy and a beating heart, Pooja said 'Yes!'.",
      image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=700&q=80",
    },
    {
      step: "04",
      title: "Roka & Forever Promise",
      date: "February 2025",
      location: "The Verma Family Residence, Jaipur",
      description:
        "With joyful dholaks, the warm embrace of both families, and sacred blessings from our elders, we sealed our promise for a lifetime of togetherness.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=700&q=80",
    },
  ],

  // Gallery Photos (High Quality Royal Wedding Aesthetics)
  gallery: [
    {
      id: "photo-1",
      title: "A Royal Bond",
      subtitle: "Two hearts united in Jaipur",
      url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
      aspect: "portrait",
    },
    {
      id: "photo-2",
      title: "Henna of Love",
      subtitle: "Intricate bridal mehendi & shimmer",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=80",
      aspect: "landscape",
    },
    {
      id: "photo-3",
      title: "Golden Hour Glow",
      subtitle: "The majestic arches of Amer",
      url: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1000&q=80",
      aspect: "portrait",
    },
    {
      id: "photo-4",
      title: "Marigold Celebrations",
      subtitle: "Laughter, turmeric and joy",
      url: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?auto=format&fit=crop&w=1000&q=80",
      aspect: "landscape",
    },
    {
      id: "photo-5",
      title: "The Sacred Mandap",
      subtitle: "Decorated with jasmine & diyas",
      url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
      aspect: "portrait",
    },
    {
      id: "photo-6",
      title: "Joyous Smiles",
      subtitle: "Candid laughter and eternal memories",
      url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
      aspect: "landscape",
    },
  ],

  // Music System Details
  music: {
    trackPath: "/audio/wedding-song.mp3",
    title: "Royal Indian Wedding Instrumental (Shehnai & Sitar Harmony)",
    artist: "Heritage Rajasthan Symphony",
    defaultVolume: 0.65,
    autoPlayOnOpen: true,
  },

  // RSVP Contacts & Information
  rsvp: {
    deadline: "20 November 2026",
    primaryContactName: "Mr. Rajesh Sharma",
    phone: "+91 98765 43210",
    whatsappNumber: "919876543210",
    email: "celebrate@krishanpooja.wedding",
    note: "Kindly confirm your presence by 20th November 2026 to help us make comfortable arrangements for you and your family.",
  },

  // Color & Theme Palette Settings
  theme: {
    primaryMaroon: "#4A0A16",
    deepMaroon: "#26040A",
    royalGold: "#D4AF37",
    lightGold: "#FFF3B0",
    ivoryCream: "#FFF8E7",
  },
};
