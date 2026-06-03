import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const htmlPath = path.resolve(__dirname, '..', '..', 'frontend', 'productos.html');

function parsePrice(value: string): number {
  const cleaned = value.replace(/[^0-9,\.]/g, '').replace(/\./g, '').replace(/,/g, '.');
  return Number(cleaned) || 0;
}

function parseProductsFromHtml(html: string) {
  const articleRegex = /<article[^>]*>([\s\S]*?)<\/article>/gi;
  const products: Array<{ name: string; description: string; price: number; imageUrl: string }> = [];
  let match;

  while ((match = articleRegex.exec(html))) {
    const block = match[1];
    const titleMatch = block.match(/<h4[^>]*>([^<]+)<\/h4>/i);
    const descriptionMatch = block.match(/<p[^>]*class="producto-descripcion"[^>]*>([\s\S]*?)<\/p>/i);
    const priceMatch = block.match(/<p[^>]*class="producto-precio"[^>]*>[^$]*\$([0-9\.,]+)[^<]*<\/p>/i);
    const imageMatch = block.match(/<img[^>]*src="([^"]+)"/i);

    if (!titleMatch || !descriptionMatch || !priceMatch || !imageMatch) {
      continue;
    }

    const name = titleMatch[1].trim();
    const description = descriptionMatch[1].trim();
    const price = parsePrice(priceMatch[1]);
    const rawImageUrl = imageMatch[1].trim();
    const imageUrl = rawImageUrl.startsWith('http://') || rawImageUrl.startsWith('https://')
      ? rawImageUrl
      : rawImageUrl.startsWith('/')
      ? rawImageUrl
      : `/${rawImageUrl}`;

    products.push({ name, description, price, imageUrl });
  }

  return products;
}

async function main() {
  if (!fs.existsSync(htmlPath)) {
    throw new Error(`No se encontró el archivo de productos en ${htmlPath}`);
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const products = parseProductsFromHtml(html);

  if (!products.length) {
    console.log('No se encontraron productos en el HTML.');
    return;
  }

  const adminEmail = 'calmaplus-seed@localhost';
  let admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    admin = await prisma.user.create({
      data: {
        name: 'Seed Admin',
        email: adminEmail,
        password: 'seeded-password',
        role: 'admin',
      },
    });
    console.log(`Usuario admin creado: ${adminEmail}`);
  }

  let createdCount = 0;

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });
    if (existing) {
      console.log(`Producto ya existe: ${product.name}`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl,
        createdById: admin.id,
      },
    });
    createdCount += 1;
    console.log(`Producto creado: ${product.name}`);
  }

  console.log(`Seed finalizado. Productos creados: ${createdCount}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
