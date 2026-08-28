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
    description: "Valentine's Day design <br>Ripple Ring Box features a screw-on lid with a satisfying click and a RippleMe$",
    url: "https://i.imgur.com/xoUgSbS.png",
    originalPrice: 15,
    salePrice: null,
  },
  {
    id: 2,
    title: "Rombocube",
    description: "Minimalist cube-shaped candle holder. Square version. <br>Designed by: <bold>Creaserra</bold>",
    url: "https://i.imgur.com/53wW664.jpeg",
    originalPrice: 10,
    salePrice: null,
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
