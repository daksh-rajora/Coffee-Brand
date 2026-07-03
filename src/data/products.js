export const products = [
  {
    id: "midnight-velvet",
    name: "Midnight Velvet",
    price: 499,
    originalPrice: 580,
    rating: 4.8,
    reviewsCount: 240,
    roastLevel: "Dark Roast",
    category: "Single Origin",
    image: "https://images.unsplash.com/photo-1627932646914-2d07570f878a?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1627932646914-2d07570f878a?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Midnight Velvet isn't just a roast; it's a mood. Imagine the quiet confidence of a moonlit night, captured in a cup. We've sourced these beans from the high-altitude volcanic soils of Central America, roasting them until they reach that perfect, shimmering dark finish.",
    quote: "The smoothness of silk, the soul of a classic jazz record.",
    isBestSeller: true,
    flavorNotes: ["Dark Chocolate", "Hazelnut"],
    weight: "250g",
    intensity: 4, // 4 out of 5 filled
    brewingGuide: {
      step1Title: "French Press (Recommended)",
      step1Desc: "Coarse grind, 4 minutes steep. Plunge slowly for that heavy, velvet body.",
      step2Title: "Pour Over",
      step2Desc: "Medium-fine grind. Focus on a slow, circular pour to highlight the chocolate notes.",
      step3Title: "The Golden Ratio",
      step3Desc: "Use 2 tbsp (10g) of coffee for every 6oz of filtered water at 200°F."
    }
  },
  {
    id: "golden-hour",
    name: "Golden Hour",
    price: 450,
    rating: 4.7,
    reviewsCount: 180,
    roastLevel: "Light Roast",
    category: "Single Origin",
    image: "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1607681034540-2c46cc71896d?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Golden Hour is a bright, refreshing light roast that brings the sunshine to your cup. Grown at high altitudes, it offers a tea-like consistency with crisp fruit notes.",
    isBestSeller: true,
    flavorNotes: ["Citrus", "Honey"],
    weight: "250g",
    intensity: 2,
    brewingGuide: {
      step1Title: "Pour Over",
      step1Desc: "Medium-fine grind, slow drip method to extract delicate citrusy highlights.",
      step2Title: "AeroPress",
      step2Desc: "Fine grind, rapid press for a sweet, clean cup.",
      step3Title: "Water Temp",
      step3Desc: "Use hot water at exactly 91°C (196°F) to protect the floral compounds."
    }
  },
  {
    id: "the-classic",
    name: "The Classic",
    price: 420,
    rating: 4.9,
    reviewsCount: 310,
    roastLevel: "Medium Roast",
    category: "Blend",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Our signature house blend, designed to be the perfect all-day cup. Nutty, sweet, and incredibly smooth with a balanced finish.",
    isBestSeller: true,
    flavorNotes: ["Nutty", "Smooth"],
    weight: "250g",
    intensity: 3,
    brewingGuide: {
      step1Title: "Drip Coffee Maker",
      step1Desc: "Medium grind, standard brewing for a reliable, well-rounded mug.",
      step2Title: "Moka Pot",
      step2Desc: "Fine grind for a rich, stovetop espresso-style concentration.",
      step3Title: "The Ratio",
      step3Desc: "Use 1.5 to 2 tbsp of coffee per 6 oz cup according to strength preference."
    }
  },
  {
    id: "velvet-decaf",
    name: "Velvet Decaf",
    price: 490,
    rating: 4.6,
    reviewsCount: 95,
    roastLevel: "Dark Roast",
    category: "Single Origin",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop"
    ],
    description: "All the rich, heavy body and dark flavor of our Midnight Velvet, decaffeinated naturally. Ideal for your late-evening sweet cravings.",
    isBestSeller: false,
    flavorNotes: ["Caffeine Free", "Sweet"],
    weight: "250g",
    intensity: 4,
    brewingGuide: {
      step1Title: "French Press",
      step1Desc: "Coarse grind, 4 minutes extraction for full body without caffeine jitters.",
      step2Title: "Espresso",
      step2Desc: "Fine grind, pull a double shot for a rich, evening decaf latte.",
      step3Title: "Storage",
      step3Desc: "Keep in a dark, airtight container to retain its chocolatey aroma."
    }
  },
  {
    id: "morning-ritual-kit",
    name: "Morning Ritual Kit",
    price: 1250,
    rating: 4.9,
    reviewsCount: 150,
    roastLevel: "Assorted",
    category: "Gift Boxes",
    image: "https://images.unsplash.com/photo-1589733901241-5e53429e1dbf?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1589733901241-5e53429e1dbf?q=80&w=600&auto=format&fit=crop"
    ],
    description: "The complete setup for your perfect morning routine. Includes a bag of Midnight Velvet, a signature copper scoop, and a solid ceramic cup.",
    isBestSeller: false,
    flavorNotes: ["Limited Edition", "Bundle"],
    weight: "1 Bundle",
    intensity: 3,
    brewingGuide: {
      step1Title: "Unboxing",
      step1Desc: "Open your ceramic cup and clean it with warm water before your first brew.",
      step2Title: "The Scoop",
      step2Desc: "Use the complimentary copper scoop—one rounded scoop is approximately 10g.",
      step3Title: "The Ritual",
      step3Desc: "Take time to smell the dry coffee grounds before pouring hot water. Enjoy the process."
    }
  },
  {
    id: "prod-coldcan",
    name: "Nitro Cold Brew Cans (4 Pack)",
    price: 680,
    rating: 4.7,
    reviewsCount: 110,
    roastLevel: "Medium Roast",
    category: "Cold Brew",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Our signature cold brew coffee, nitrogen-infused for an ultra-smooth, creamy texture. Contains zero sugar but tastes naturally sweet and refreshing.",
    isBestSeller: false,
    flavorNotes: ["Creamy", "Chocolatey", "Sweet"],
    weight: "4 x 250ml",
    intensity: 3,
    brewingGuide: {
      step1Title: "Chilling",
      step1Desc: "Chill the cans in the refrigerator for at least 4 hours before serving.",
      step2Title: "Pouring",
      step2Desc: "Pour vigorously into a clear glass to release the nitrogen cascade effect.",
      step3Title: "Serving",
      step3Desc: "Serve immediately. Do not add ice, as it dilutes the nitro cream head."
    }
  },
  {
    id: "prod-coldbrew",
    name: "Cold Brew Steep Bags",
    price: 490,
    rating: 4.6,
    reviewsCount: 65,
    roastLevel: "Dark Roast",
    category: "Cold Brew",
    image: "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Coarsely ground and sealed in filter bags for effortless steeping at home. Just submerge in cold water for 12-16 hours for a bold, low-acid cold brew.",
    isBestSeller: false,
    flavorNotes: ["Dark Cocoa", "Caramel", "Low Acidity"],
    weight: "5 Bags",
    intensity: 4,
    brewingGuide: {
      step1Title: "Steeping",
      step1Desc: "Submerge one steep bag in 500ml of cold, filtered water inside a sealed jar.",
      step2Title: "Timing",
      step2Desc: "Keep in the refrigerator for 14-18 hours. Remove the bag gently without squeezing.",
      step3Title: "Serving",
      step3Desc: "Pour over ice, dilute with a dash of milk or cold water to taste."
    }
  },
  {
    id: "prod-frenchpress",
    name: "French Press Selection",
    price: 460,
    rating: 4.8,
    reviewsCount: 140,
    roastLevel: "Medium Roast",
    category: "Ground Coffee",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop",
    thumbnails: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=600&auto=format&fit=crop"
    ],
    description: "Coarse ground selection specifically adjusted for French press extraction. Unlocks a full, rustic mouthfeel with notes of roasted almond and sweet malt.",
    isBestSeller: false,
    flavorNotes: ["Roasted Almond", "Malt", "Vanilla"],
    weight: "250g",
    intensity: 3,
    brewingGuide: {
      step1Title: "Preheating",
      step1Desc: "Rinse your French press with hot water to preheat the glass container.",
      step2Title: "Steeping",
      step2Desc: "Add coffee grounds, pour 94°C water, stir once, and let steep for 4 minutes.",
      step3Title: "Plunging",
      step3Desc: "Press down with slow, steady pressure. Pour all liquid immediately to avoid over-steep."
    }
  }
];

export const categories = [
  {
    id: "cat-ground",
    name: "Ground Coffee",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400&auto=format&fit=crop",
    itemCount: "2 Products"
  },
  {
    id: "cat-beans",
    name: "Coffee Beans",
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=400&auto=format&fit=crop",
    itemCount: "3 Products"
  },
  {
    id: "cat-cold",
    name: "Cold Brew",
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=400&auto=format&fit=crop",
    itemCount: "2 Products"
  },
  {
    id: "cat-gift",
    name: "Gift Boxes",
    image: "https://images.unsplash.com/photo-1589733901241-5e53429e1dbf?q=80&w=400&auto=format&fit=crop",
    itemCount: "1 Product"
  }
];

export const subscriptionPlans = [
  {
    id: "sub-starter",
    name: "Starter Plan",
    tagline: "Ideal for coffee enthusiasts",
    price: 1499,
    period: "month",
    description: "Get 2 curated bags of freshly roasted coffee delivered directly to your doorstep every month.",
    features: [
      "2 Bags of specialty coffee",
      "Freshly roasted and shipped",
      "Free shipping included",
      "Cancel or pause anytime"
    ],
    bagsCount: 2,
    badge: "WEEKLY / MONTHLY"
  },
  {
    id: "sub-barista",
    name: "Barista Select",
    tagline: "Our most popular choice",
    price: 2499,
    period: "month",
    description: "Get 3 premium bags of coffee + exclusive micro-lot samples + brewing recipes delivered monthly.",
    features: [
      "3 Premium coffee bags",
      "1 Free micro-lot sample (50g)",
      "Exclusive recipes & guides",
      "Free shipping & early access",
      "Cancel or pause anytime"
    ],
    bagsCount: 3,
    badge: "MOST POPULAR",
    popular: true
  },
  {
    id: "sub-connoisseur",
    name: "Connoisseur",
    tagline: "Ultimate coffee experience",
    price: 12490,
    period: "year",
    description: "A year of ultimate coffee tasting. 4 bags per month, including rare limited editions and direct farm imports.",
    features: [
      "4 Rare & limited-edition bags",
      "Direct farm import exclusives",
      "Complimentary copper scoop",
      "Priority customer support",
      "Save 20% compared to monthly"
    ],
    bagsCount: 4,
    badge: "BEST VALUE"
  }
];
