import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();

  // Brands
  const brands = [
    { name: 'Chanel', slug: 'chanel' },
    { name: 'Louis Vuitton', slug: 'louis-vuitton' },
    { name: 'Gucci', slug: 'gucci' },
    { name: 'Dior', slug: 'dior' },
    { name: 'Hermes', slug: 'hermes' },
    { name: 'Prada', slug: 'prada' },
    { name: 'YSL', slug: 'ysl' },
    { name: 'Celine', slug: 'celine' },
  ];

  for (const b of brands) {
    await prisma.brand.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }

  // Categories
  const categories = [
    { name: 'Handbags', slug: 'handbags' },
    { name: 'Wallets', slug: 'wallets' },
    { name: 'Shoes', slug: 'shoes' },
    { name: 'Watches', slug: 'watches' },
    { name: 'Jewelry', slug: 'jewelry' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: {},
      create: c,
    });
  }

  // Sample Products
  const chanel = await prisma.brand.findUnique({ where: { slug: 'chanel' } });
  const handbags = await prisma.category.findUnique({ where: { slug: 'handbags' } });

  if (chanel && handbags) {
    const user = await prisma.user.upsert({
      where: { email: 'customer@example.com' },
      update: {},
      create: {
        name: 'Sophia Laurent',
        email: 'customer@example.com',
        role: 'customer'
      }
    });

    await prisma.product.create({
      data: {
        name: 'Chanel Classic Flap Bag',
        slug: 'chanel-classic-flap-bag',
        brandId: chanel.id,
        categoryId: handbags.id,
        type: 'pre-owned',
        condition: 'Excellent',
        description: 'The iconic Chanel Classic Flap Bag in black caviar leather with gold-tone hardware.',
        price: 350000,
        sku: 'CH-CFB-001',
        stockQuantity: 1,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000', isCover: true }
          ]
        },
        reviews: {
          create: [
            {
              userId: user.id,
              rating: 5,
              comment: "Absolutely stunning. The condition was exactly as described, and the authenticity verification gave me total peace of mind."
            },
            {
              userId: user.id,
              rating: 5,
              comment: "A dream come true. The packaging was exquisite and the delivery was very secure."
            }
          ]
        },
        variants: {
          create: [
            {
              name: "Black / Gold",
              sku: "CH-CFB-001-BG",
              attributes: { color: "Black", hardware: "Gold" },
              stockQuantity: 1
            },
            {
              name: "Black / Silver",
              sku: "CH-CFB-001-BS",
              attributes: { color: "Black", hardware: "Silver" },
              stockQuantity: 1
            }
          ]
        }
      }
    });

    // Chanel Classic Flap Bag (Teal)
    await prisma.product.create({
      data: {
        name: 'Chanel Classic Flap Bag (Teal)',
        slug: 'chanel-classic-flap-bag-teal',
        brandId: chanel.id,
        categoryId: handbags.id,
        type: 'pre-owned',
        condition: 'Excellent',
        description: 'A stunning Chanel Classic Flap Bag in rare teal caviar leather with silver-tone hardware.',
        price: 420000,
        sku: 'CH-CFB-002',
        stockQuantity: 1,
        images: {
          create: [
            { url: 'https://images.unsplash.com/photo-1590739225287-bd31519780c3?q=80&w=1000', isCover: true }
          ]
        },
        variants: {
          create: [
            {
              name: "Teal / Silver",
              sku: "CH-CFB-002-TS",
              attributes: { color: "Teal", hardware: "Silver" },
              stockQuantity: 1
            }
          ]
        }
      }
    });

    // Chanel J12 Watch
    const watches = await prisma.category.findUnique({ where: { slug: 'watches' } });
    if (watches) {
      await prisma.product.create({
        data: {
          name: 'Chanel J12 Watch',
          slug: 'chanel-j12-watch',
          brandId: chanel.id,
          categoryId: watches.id,
          type: 'pre-owned',
          condition: 'Like New',
          description: 'The iconic Chanel J12 watch in white ceramic with diamond markers.',
          price: 580000,
          sku: 'CH-J12-001',
          stockQuantity: 2,
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=1000', isCover: true }
            ]
          }
        }
      });
    }

    // Woven Loafers
    const shoes = await prisma.category.findUnique({ where: { slug: 'shoes' } });
    if (shoes) {
      await prisma.product.create({
        data: {
          name: 'Intrecciato Woven Loafers',
          slug: 'intrecciato-woven-loafers',
          brandId: chanel.id, // Using Chanel as a placeholder brand
          categoryId: shoes.id,
          type: 'pre-owned',
          condition: 'Very Good',
          description: 'Hand-woven leather loafers in a classic black finish.',
          price: 85000,
          sku: 'SH-WVN-001',
          stockQuantity: 3,
          images: {
            create: [
              { url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000', isCover: true }
            ]
          }
        }
      });
    }
  }

  console.log('Seed completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
