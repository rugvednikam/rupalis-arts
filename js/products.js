// Rupali's Arts - Product Catalog Data
// Prices intentionally excluded as per client requirement (All inquiries go directly to Instagram DM)

const INSTAGRAM_HANDLE = 'rupalis_arts';
const INSTAGRAM_DM_URL = 'https://ig.me/m/rupalis_arts';
const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/rupalis_arts/';

const PRODUCTS_DATA = [
  {
    id: 'sunflower-aasan-orange',
    name: 'Sunflower Velvet Aasan for Ganpati Bappa',
    subtitle: 'Vibrant Orange & Emerald Green Petals',
    category: 'aasan',
    categoryName: 'Pooja Aasans',
    badge: 'Best Seller',
    featured: true,
    image: 'assets/images/sunflower-aasan-orange.jpg',
    images: [
      'assets/images/sunflower-aasan-orange.jpg',
      'assets/images/sunflower-aasan-purple.jpg'
    ],
    rating: 5.0,
    reviewsCount: 38,
    description: 'A handcrafted circular floral throne crafted specially for Ganpati Bappa and sacred pooja idols. Features multi-layered plush velvet petals in festive saffron orange and rich emerald green with a firm, elegant base.',
    features: [
      'Layered plush velvet petals with artisan stitching',
      'Perfect seat for Ganpati Bappa, Pooja idols & Kalash',
      'Sturdy non-slip base for safe deity placement',
      'Washable, reusable & crafted to last for years',
      '100% Handcrafted with Love'
    ],
    specifications: {
      'Material': 'Premium Plush Velvet & Soft Cotton Base',
      'Diameter': 'Available in Standard (10"), Large (12") & Custom sizes',
      'Ideal For': 'Ganesh Chaturthi, Diwali Pooja, Daily Mandir Decor, Housewarming',
      'Care': 'Gentle spot clean / dry in shade'
    },
    variants: [
      { name: 'Saffron Orange & Forest Green', color: '#ff7700', image: 'assets/images/sunflower-aasan-orange.jpg' },
      { name: 'Royal Purple & Pearl Cream', color: '#6a1b9a', image: 'assets/images/sunflower-aasan-purple.jpg' }
    ],
    instagramMessage: "Hi Rupali's Arts! I'm interested in ordering the Sunflower Velvet Aasan for Ganpati Bappa (Orange & Green). Could you please share the details and pricing?"
  },
  {
    id: 'sunflower-aasan-purple',
    name: 'Royal Lotus Velvet Aasan with Pearl Accents',
    subtitle: 'Concentric Spiral & Pearl-Tipped Velvet Petals',
    category: 'aasan',
    categoryName: 'Pooja Aasans',
    badge: 'Festive Luxury',
    featured: true,
    image: 'assets/images/sunflower-aasan-purple.jpg',
    images: [
      'assets/images/sunflower-aasan-purple.jpg',
      'assets/images/sunflower-aasan-orange.jpg'
    ],
    rating: 4.9,
    reviewsCount: 29,
    description: 'An exquisitely styled floral aasan featuring deep royal purple and cream velvet petals tipped with delicate pearl drops, surrounding a handcrafted concentric spiral center. Elevates any sacred altar with majestic elegance.',
    features: [
      'Artisan pearl bead detailing on every petal tip',
      'Dual-tone royal purple and ivory velvet petals',
      'Concentric braided ropework spiral center',
      'Ideal backdrop for brass and marble idols',
      'Long-lasting heirloom craft piece'
    ],
    specifications: {
      'Material': 'Micro-Velvet, Pearl Embellishments, Braided Center',
      'Diameter': 'Standard (10") / Large (14") / Custom on demand',
      'Ideal For': 'Ganesh Utsav, Laxmi Pooja, Navratri, Varalakshmi Vratham',
      'Care': 'Delicate dry brush or spot clean'
    },
    variants: [
      { name: 'Royal Purple & Pearl Cream', color: '#6a1b9a', image: 'assets/images/sunflower-aasan-purple.jpg' },
      { name: 'Saffron Orange & Forest Green', color: '#ff7700', image: 'assets/images/sunflower-aasan-orange.jpg' }
    ],
    instagramMessage: "Hi Rupali's Arts! I loved the Royal Lotus Velvet Aasan with Pearl Accents. Please share the pricing and customization options."
  },
  {
    id: 'handmade-diya-holders',
    name: 'Handmade Pearl & Kundan Diya Holders',
    subtitle: 'Available as Singles or Elegant Pairs',
    category: 'diyas',
    categoryName: 'Diya Holders',
    badge: 'Popular Gift',
    featured: true,
    image: 'assets/images/diya-holders.jpg',
    images: [
      'assets/images/diya-holders.jpg'
    ],
    rating: 5.0,
    reviewsCount: 54,
    description: 'Breathtaking handcrafted circular Diya / T-light candle bases embellished with concentric rings of lustrous faux pearls, royal blue crystal beads, golden kundan stone work, and vibrant ruby rims. Adds unmatched charm to any celebration.',
    features: [
      'Embellished with high-shine pearls and kundan crystals',
      'Fits standard wax tealights & smokeless LED tealights',
      'Heat-resistant reinforced decorative base',
      'Available in Single pieces or Festive Matching Pairs',
      'Perfect for Diwali gifting, table decor, and rangoli centerpieces'
    ],
    specifications: {
      'Material': 'Kundan Stones, Pearl Beads, Acrylic Base, Brass Ring',
      'Size': 'approx. 4.5" Diameter each',
      'Sold As': 'Individual Piece or Matching Pair (Custom Set of 4/6 available)',
      'Care': 'Wipe clean with a soft dry cloth'
    },
    variants: [
      { name: 'Royal Blue & Crimson Red Pair', color: '#1a237e', image: 'assets/images/diya-holders.jpg' }
    ],
    instagramMessage: "Hi Rupali's Arts! I'm interested in ordering the Handmade Pearl & Kundan Diya Holders (Pair). Please let me know how to order and available colors!"
  },
  {
    id: 'woolen-rangoli-small',
    name: 'Woolen Floral Mandala Rangoli (Small Size)',
    subtitle: '8-Petal Blooming Tufted Wool Mandala',
    category: 'rangoli',
    categoryName: 'Woolen Rangoli',
    badge: 'Eco Friendly',
    featured: true,
    image: 'assets/images/woolen-rangoli-small.jpg',
    images: [
      'assets/images/woolen-rangoli-small.jpg'
    ],
    rating: 4.9,
    reviewsCount: 42,
    description: 'A cheerful blooming floral mandala crafted from premium tufted wool yarn in auspicious hues of marigold orange, radiant yellow, pearl white rim, and emerald green center. 100% reusable, mess-free, and washable.',
    features: [
      'Zero powder mess — lay down in 2 seconds',
      'Ultra-soft premium woolen yarn weave',
      'Vibrant colorfast dyes that never fade',
      'Reusable year after year — eco-friendly alternative',
      'Great festive gift for family and friends'
    ],
    specifications: {
      'Material': '100% Premium Fast-Color Woolen Yarn',
      'Diameter': 'Compact / Small Size (approx. 12" - 14")',
      'Weight': 'Lightweight & easy to store flat',
      'Care': 'Gentle cold handwash, lay flat to dry'
    },
    variants: [
      { name: 'Marigold Blossom (Orange & Yellow)', color: '#ff9800', image: 'assets/images/woolen-rangoli-small.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I would like to inquire about the Woolen Floral Mandala Rangoli (Small Size). Please share more details and customization options."
  },
  {
    id: 'woolen-pathway-rangoli',
    name: 'Woolen Pathway & Border Rangoli Mats',
    subtitle: 'Sunflower Stepping Flowers with Diya Spot',
    category: 'rangoli',
    categoryName: 'Woolen Rangoli',
    badge: 'Trending Design',
    featured: true,
    image: 'assets/images/woolen-pathway.jpg',
    images: [
      'assets/images/woolen-pathway.jpg'
    ],
    rating: 5.0,
    reviewsCount: 61,
    description: 'An innovative corridor & entryway decor set consisting of sunflower petal woolen mats with a central recess for tealight candles. Arrange them in a line along walkways, stairs, or door borders to create a magical illuminated welcome path.',
    features: [
      'Modular design — line them up or cluster them',
      'Center spot securely holds tealight candles / diyas',
      'Available in individual pieces or value sets of 2, 4, 6 & 8',
      'Vivid yellow & green floral wool petal finish',
      'Transforms corridors, staircases & entranceways instantly'
    ],
    specifications: {
      'Material': 'High-Density Woolen Yarn & Anti-Skid Base',
      'Configuration': 'Available in Single, Set of 2, Set of 4, or Custom Length',
      'Diameter per Flower': 'approx. 8" - 9"',
      'Care': 'Hand washable, reusable for years'
    },
    variants: [
      { name: 'Sunflower Yellow & Earth Green', color: '#fbc02d', image: 'assets/images/woolen-pathway.jpg' }
    ],
    instagramMessage: "Hi Rupali's Arts! I'm interested in the Woolen Pathway & Border Rangoli Mats set. Please share the sets details and order procedure."
  },
  {
    id: 'detachable-paisley-rangoli',
    name: 'Detachable 2-Piece Paisley Woolen Rangoli',
    subtitle: 'Flexible Doorway & Threshold Framing Set',
    category: 'detachable',
    categoryName: 'Detachable Sets',
    badge: 'Artisan Special',
    featured: true,
    image: 'assets/images/detachable-paisley.jpg',
    images: [
      'assets/images/detachable-paisley.jpg'
    ],
    rating: 4.8,
    reviewsCount: 31,
    description: 'A versatile 2-piece detachable woolen rangoli set shaped like traditional Indian paisley (mango) motifs. Position both pieces together for an elegant entrance arch or separate them to frame both sides of your door threshold.',
    features: [
      '2 Detachable pieces for versatile arrangement',
      'Intricate yellow, green & red teardrop paisley craft',
      'Decorated with delicate beaded tassels along the outer rim',
      'Flawless fit for door frames, pooja corners, and stair tops',
      'Stores compactly in a pouch when not in use'
    ],
    specifications: {
      'Pieces': '2 Independent Symmetrical Halves',
      'Material': 'Pure Woolen Yarn, Tassel Charms, Felt Lining',
      'Total Span': 'Customizable span to fit any standard doorway',
      'Care': 'Gentle shake / spot clean / cold handwash'
    },
    variants: [
      { name: 'Sunlit Yellow & Emerald Paisley', color: '#ffb300', image: 'assets/images/detachable-paisley.jpg' }
    ],
    instagramMessage: "Hi Rupali's Arts! I want to inquire about the Detachable 2-Piece Paisley Woolen Rangoli. Could you send me pricing and custom color options?"
  },
  {
    id: 'detachable-semicircle-rangoli',
    name: 'Detachable 2-Piece Semicircle Royal Mandala',
    subtitle: 'Deep Emerald Green & Golden Yellow Dual Arch',
    category: 'detachable',
    categoryName: 'Detachable Sets',
    badge: 'Grand Entrance',
    featured: true,
    image: 'assets/images/detachable-semicircle.jpg',
    images: [
      'assets/images/detachable-semicircle.jpg'
    ],
    rating: 5.0,
    reviewsCount: 47,
    description: 'A majestic split 2-piece circular mandala in rich forest green and golden yellow wool. Designed to hug the edge of your threshold or be joined together into a full 360-degree centerpiece for pooja rooms and living spaces.',
    features: [
      'Detachable 2-piece design — use split at doorway or joined full circle',
      'Rich royal color contrast in emerald green and marigold yellow',
      'Embossed floral petal ridges for high visual depth',
      '100% reusable, eco-friendly, and washable',
      'Auspicious statement piece for festivals and weddings'
    ],
    specifications: {
      'Pieces': '2 Semicircular Interlocking Halves',
      'Material': 'High-Grade Woolen Yarn with Reinforced Edge Stitching',
      'Full Joined Diameter': 'approx. 18" - 20"',
      'Care': 'Handwash safe, roll & store easily'
    },
    variants: [
      { name: 'Royal Emerald & Golden Yellow', color: '#004d40', image: 'assets/images/detachable-semicircle.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I loved the Detachable 2-Piece Semicircle Royal Mandala. Please share the details, customization, and how to place the order!"
  },
  {
    id: 'vitthal-sacred-art',
    name: 'Lord Vitthal (Pandurang) Sacred Wall & Altar Plate',
    subtitle: 'Golden Mukut, Pearl Kanthi & Floral Border',
    category: 'sacred-art',
    categoryName: 'Sacred Wall Art',
    badge: 'Artisan Masterpiece',
    featured: true,
    image: 'assets/images/vitthal-sacred-art.jpg',
    images: [
      'assets/images/vitthal-sacred-art.jpg'
    ],
    rating: 5.0,
    reviewsCount: 52,
    description: 'A magnificent handcrafted circular sacred plate depicting Lord Vitthal (Pandurang) in devotional splendor. Features an ornate golden mukut (crown), delicate pearl necklace, makarkundal earrings, yellow sunburst halo, and a vibrant crimson-red floral petal rim. Perfect for pooja room altars, living room focal walls, and auspicious housewarming gifts.',
    features: [
      'Detailed hand-sculpted Lord Vitthal silhouette with tilak & golden crown',
      'Embellished with lustrous faux pearls, kundan gems & makarkundal',
      'Festive crimson red, saffron orange, and peacock blue color palette',
      'Versatile display: Altar backdrop or wall-mounted hanging',
      '100% Handcrafted with devotion in Maharashtra'
    ],
    specifications: {
      'Craft': 'Hand-sculpted Clay Relief & Acrylic Pearl Embellishment',
      'Diameter': 'approx. 12" - 14" Diameter',
      'Ideal For': 'Pooja Ghar, Living Room Wall, Ashadhi Ekadashi, Auspicious Gifting',
      'Care': 'Wipe gently with a soft dry cloth'
    },
    variants: [
      { name: 'Devotional Crimson & Gold', color: '#d32f2f', image: 'assets/images/vitthal-sacred-art.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I would love to inquire about the handcrafted Lord Vitthal (Pandurang) Sacred Wall & Altar Plate. Please share the details and customization options."
  },
  {
    id: 'sai-baba-tree-art',
    name: 'Shirdi Sai Baba Sacred Tree & Mirror Frame Plate',
    subtitle: 'Meditative Silhouette with Sacred Tree & Mirror Rim',
    category: 'sacred-art',
    categoryName: 'Sacred Wall Art',
    badge: 'Spiritual Aura',
    featured: true,
    image: 'assets/images/sai-baba-tree-art.jpg',
    images: [
      'assets/images/sai-baba-tree-art.jpg'
    ],
    rating: 5.0,
    reviewsCount: 44,
    description: 'An auspicious circular wall art plate portraying Shirdi Sai Baba in serene meditation under the sacred tree. Handcrafted with textured embossed green foliage, rooted tree branches, sun halo, and a traditional sparkling diamond mirror-work border that brings peace and positive energy to your space.',
    features: [
      'Serene hand-painted Sai Baba silhouette with auspicious chandan tilak',
      'Intricately sculpted green tree leaves and rooted earthen branches',
      'Sparkling diamond mirror-work border rim reflecting ambient light',
      'Brings spiritual calmness, positive aura, and blessing to homes',
      '100% Handcrafted by Rupali\'s Arts'
    ],
    specifications: {
      'Craft': 'Embossed Clay Relief with Traditional Mirror Work',
      'Diameter': 'approx. 12" - 14" Diameter',
      'Ideal For': 'Mandir Temple Backdrop, Entry Foyer, Meditation Rooms, Gifting',
      'Care': 'Dust gently with dry microfiber cloth'
    },
    variants: [
      { name: 'Sacred Green & Mirror Rim', color: '#2e7d32', image: 'assets/images/sai-baba-tree-art.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I'm interested in the Shirdi Sai Baba Sacred Tree & Mirror Frame Plate. Please share more details and order information."
  },
  {
    id: 'terracotta-velvet-vase',
    name: 'Handcrafted Terracotta Vase with Velvet Flowers',
    subtitle: 'Embossed Clay Relief, Circular Mirrors & Velvet Blooms',
    category: 'sacred-art',
    categoryName: 'Sacred Art & Decor',
    badge: 'Unique Craft',
    featured: true,
    image: 'assets/images/terracotta-velvet-vase.jpg',
    images: [
      'assets/images/terracotta-velvet-vase.jpg'
    ],
    rating: 5.0,
    reviewsCount: 36,
    description: 'A traditional terracotta pot adorned with hand-sculpted clay spiral reliefs, circular mirror work, and lotus engravings in rustic crimson. Filled with handmade plush maroon velvet blooming flowers and soft green velvet stems that add everlasting freshness to altars and festive centerpieces.',
    features: [
      'Handcrafted terracotta clay pot with embossed spiral & lotus motifs',
      'Embellished with sparkling circular mirrors and antique finish',
      'Includes handmade plush maroon velvet flowers and green velvet stems',
      'Never withers — reusable forever for festivals and home styling',
      '100% Handcrafted by Rupali\'s Arts'
    ],
    specifications: {
      'Craft': 'Clay Relief Embossing on Terracotta with Velvet Flowers',
      'Height': 'approx. 10" - 12" Total Height',
      'Ideal For': 'Pooja Altars, Living Room Shelves, Festive Centerpiece, Gifting',
      'Care': 'Wipe pot gently with dry cloth; dust velvet with soft brush'
    },
    variants: [
      { name: 'Rustic Crimson & Maroon Velvet', color: '#880e4f', image: 'assets/images/terracotta-velvet-vase.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I would love to order the Handcrafted Terracotta Vase with Velvet Flowers. Please share details and pricing!"
  },
  {
    id: 'lippan-diamond-frame',
    name: 'Traditional Lippan Art Geometric Diamond Mirror Frame',
    subtitle: 'Vibrant Multi-Color Checkered Grid with Mirror Mosaic',
    category: 'sacred-art',
    categoryName: 'Lippan & Wall Art',
    badge: 'Festive Statement',
    featured: true,
    image: 'assets/images/lippan-diamond-frame.jpg',
    images: [
      'assets/images/lippan-diamond-frame.jpg'
    ],
    rating: 5.0,
    reviewsCount: 48,
    description: 'An eye-catching diamond-oriented traditional Lippan art wall panel featuring an intricate multi-color checkered grid in auspicious green, saffron orange, royal blue, and ruby pink. Each square features central circular mirrors surrounded by white clay dot work, bordered by diamond-cut mirror glass mosaics.',
    features: [
      'Traditional mud & mirror craft (Lippan Kaam) in diamond geometry',
      'Hand-sculpted white clay relief borders and pearl-like dot work',
      'Vibrant color blocks with light-reflecting glass mirrors',
      'Ideal for entryway foyers, pooja backdrops, and balcony garden walls',
      'Authentic handcrafted art piece'
    ],
    specifications: {
      'Craft': 'Lippan Mud Relief & Mirror Mosaic Work',
      'Size': 'approx. 14" x 14" Diagonal Diamond',
      'Ideal For': 'Entryway Foyer, Mandir Backdrop, Living Room Gallery Wall',
      'Care': 'Wipe gently with a dry microfiber cloth'
    },
    variants: [
      { name: 'Multi-Color Festive Grid', color: '#ff6f00', image: 'assets/images/lippan-diamond-frame.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I'm interested in the Traditional Lippan Art Geometric Diamond Mirror Frame. Please share more details and availability."
  },
  {
    id: 'lippan-circular-mandala-mirror',
    name: 'Handcrafted Circular Lippan Art Lotus Mandala Mirror',
    subtitle: 'Diamond Mosaic Border with Painted Lotus Petals',
    category: 'sacred-art',
    categoryName: 'Lippan & Wall Art',
    badge: 'Artisan Masterpiece',
    featured: true,
    image: 'assets/images/lippan-circular-mandala-mirror.jpg',
    images: [
      'assets/images/lippan-circular-mandala-mirror.jpg'
    ],
    rating: 5.0,
    reviewsCount: 59,
    description: 'A majestic circular Lippan mirror wall piece featuring concentric bands of diamond-cut glass mosaics, golden accented borders, and hand-painted lotus mandala petals in ruby red, turquoise green, and sunlit yellow. Designed with a central high-clarity mirror to illuminate and expand any room.',
    features: [
      'Intricate handcrafted diamond mirror mosaic outer border',
      'Hand-painted traditional lotus mandala motif with gold linework',
      'High-clarity center mirror that reflects natural and festive candlelight',
      'Sturdy wall-mount hook attached for effortless hanging',
      '100% Handmade by Rupali\'s Arts in Maharashtra'
    ],
    specifications: {
      'Craft': 'Lippan Mirror Mosaic with Hand-Painted Lotus Mandala',
      'Diameter': 'approx. 12" - 14" Diameter',
      'Ideal For': 'Foyer Mirror, Living Room Feature Wall, Bedroom, Auspicious Gifting',
      'Care': 'Clean mirror glass with glass cleaner; dust border gently'
    },
    variants: [
      { name: 'Ruby Lotus & Diamond Mirror Mosaic', color: '#c2185b', image: 'assets/images/lippan-circular-mandala-mirror.jpg' }
    ],
    instagramMessage: "Hello Rupali's Arts! I loved the Circular Lippan Art Lotus Mandala Mirror. Please share the details, pricing, and how to order!"
  }
];

// Visualizer backgrounds
const VISUALIZER_BACKGROUNDS = [
  { id: 'doorstep', name: 'Wooden Entrance Doorway', gradient: 'linear-gradient(180deg, #2c1810 0%, #3e2723 50%, #4e342e 100%)', floorPattern: 'wood' },
  { id: 'marble', name: 'Marble Pooja Sanctum', gradient: 'linear-gradient(180deg, #ede8e1 0%, #f5f2eb 50%, #e6dfd5 100%)', floorPattern: 'marble' },
  { id: 'terrace', name: 'Festive Courtyard / Balcony', gradient: 'linear-gradient(180deg, #2b2d42 0%, #1a1a2e 50%, #16213e 100%)', floorPattern: 'stone' },
  { id: 'brass', name: 'Festive Urli & Floral Table', gradient: 'linear-gradient(180deg, #1c1917 0%, #292524 50%, #44403c 100%)', floorPattern: 'dark' }
];

// Customer reviews
const REVIEWS_DATA = [
  {
    author: 'Pooja Deshmukh',
    city: 'Pune',
    rating: 5,
    text: 'Ordered the Sunflower Aasan for our Ganpati Bappa this year. The finish, velvet quality, and color vibrancy are unmatched! Everyone who came for darshan complimented it.',
    product: 'Sunflower Velvet Aasan for Ganpati Bappa',
    date: 'August 2026'
  },
  {
    author: 'Snehal Kulkarni',
    city: 'Mumbai',
    rating: 5,
    text: 'The woolen rangoli is a total game changer! No more powder blowing away or making a mess. Cleaned it easily after Diwali and it still looks brand new. Truly reusable and pure art!',
    product: 'Woolen Floral Mandala Rangoli',
    date: 'November 2025'
  },
  {
    author: 'Ananya Sharma',
    city: 'Nashik',
    rating: 5,
    text: 'Ordered 4 pieces of the pathway sunflower steppers for our hallway entrance. Placing tea lights in the middle looked like a royal temple path at night. Beautiful finish and lovely packaging!',
    product: 'Woolen Pathway & Border Rangoli',
    date: 'October 2025'
  },
  {
    author: 'Meera Joshi',
    city: 'Thane',
    rating: 5,
    text: 'The 2-piece detachable mandala looks splendid at our main door. Very convenient because we can open the door without disturbing the rangoli. Highly recommend Rupali’s Arts!',
    product: 'Detachable 2-Piece Semicircle Royal Mandala',
    date: 'January 2026'
  }
];
