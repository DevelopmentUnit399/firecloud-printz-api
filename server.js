import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, {
  origin: '*'
});

// Product Dataset
const products = [
  {
    id: 1,
    title: "Ripple Ring Box",
    description: "Valentine's Day design Ripple Ring Box features a screw-on lid with a satisfying click and a RippleMesh texture. The model is designed for Valentine's Day, but it also works as a jewelry box. Who will be the luchy person to receive a proposal?",
    designer: "Lunfardo",
    url: "https://i.imgur.com/xoUgSbS.png",
    originalPrice: 15,
    salePrice: null,
    categories: ["Valentine's Day"],
    variants: [
      { name: "Heart Color", options: ["Red", "Light Blue", "Orange", "Pink"] },
      { name: "Inside Color", options: ["Red", "Light Blue", "Orange", "Pink"] },
      { name: "Outside Color", options: ["Red", "Light Blue", "Orange", "Pink"] }
    ],
  },
  {
    id: 2,
    title: "Rombocube",
    description: "Minimalist cube-shaped candle holder. Square version.",
    designer: "Creaserra",
    url: "https://i.imgur.com/53wW664.jpeg",
    originalPrice: 10,
    salePrice: null,
    categories: ["Art & Decorative"],
    variants: [
      { name: "Lid Color", options: ["Black", "Brown", "Gray", "Green", "Light Blue", "Orange", "Pink", "Red", "White", "Yellow"] },
      { name: "Box Color", options: ["Black", "Brown", "Gray", "Green", "Light Blue", "Orange", "Pink", "Red", "White", "Yellow"] }
    ],
  },
  {
    id: 3,
    title: "IAP Clock And Light",
    description: "Clock with indirect LED or RGB light.",
    designer: "Iamprinted",
    url: "https://i.imgur.com/MTz9Uuy.jpeg",
    originalPrice: 60,
    salePrice: null,
    categories: ["Tools & Functional"],
    variants: [
      { name: "Clock Base Color", options: ["Black", "Brown", "Gray", "Green", "Light Blue", "Orange", "Pink", "Red", "White", "Yellow"] },
      { name: "LED Type", options: ["White LED", "RGB LED"] }
    ],
  },
  {
    id: 4,
    title: "FLIRTY | Heart Photo & Card Display with Flexible Legs",
    description: "This poseable heart has legs and attitude. FLIRTY is a charming little desk-topper designed to hold your favorite photo, card, or mini print with style. Perfect for gifting, decorating, or just making your shelf 200% cuter.",
    designer: "Vireo Studio",
    url: "https://i.imgur.com/hkHKCnl.png",
    originalPrice: 8,
    salePrice: null,
    categories: ["Valentine's Day"],
    variants: [
      { name: "Color", options: ["Black", "Brown", "Gray", "Green", "Light Blue", "Orange", "Pink", "Red", "White", "Yellow"] }
    ],
  },
  {
    id: 5,
    title: "Amoline Heart Tray",
    description: "Valentine's Day gifts often feel temporary. Amoline was created to be a subtle, functional piece that remains useful on a desk or nightstand long after the day has passed. The design features a rhythmic, ribbed heart shape. The deep slats are spaced to hold a Polaroid or a small card, while the smooth center provides a home for jewelry or daily essentials. This version includes recesses on the bottom for rubber feet to ensure it stays securely in place. Dimensions: 207 x 184 x 22mm.",
    designer: "additiveworks",
    url: "https://i.imgur.com/noqkhdZ.jpeg",
    originalPrice: 14,
    salePrice: null,
    categories: ["Valentine's Day"],
    variants: [
      { name: "Size", options: ["Small", "Large"] },
      { name: "Color", options: ["Black", "Brown", "Gray", "Green", "Light Blue", "Orange", "Pink", "Red", "White", "Yellow"] }
    ],
  }
];

// GET: All Products
fastify.get('/api/products', async (request, reply) => {
  return products;
});

// GET: Single product by ID (e.g. /api/products/1)
fastify.get('/api/products/:id', async (request, reply) => {
  const { id } = request.params;
  const product = products.find((b) => b.id === Number(id));

  if (!product) {
    return reply.status(404).send({ error: 'Product not found' });
  }

  return product;
});

// GET: Single product by Name (e.g. /api/products/search?title=ripple)
fastify.get('/api/products/search', async (request, reply) => {
  const { title } = request.query

  if (!title) {
    return reply.status(400).send({ error: 'Please provide a ?title= query parameter'})
  }

    // Find matches (case-insensitive partial match)
  const matches = products.filter((p) =>
      p.title.toLowerCase().includes(title.toLowerCase())
  )

  if (matches.length === 0) {
    return reply.status(404).send({ error: 'No products found matching that title'})
  }

  return matches
})

// Start the server
const start = async () => {
  try {
    const port = process.env.PORT || 4000;
    await fastify.listen({ port: Number(port), host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
