/**
 * Musa Kicks — Prisma Seed Data
 * Realistic seed data with 15+ shoes, 6 categories, variants, users, orders, loyalty, site settings.
 *
 * Run: npx prisma db seed
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// ── Helper ────────────────────────────────────────────────
function slug(name: string) {
  return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function sku(prefix: string, suffix: string) {
  return `MK-${prefix}-${suffix}`.toUpperCase();
}

const SIZES = ["38", "39", "40", "41", "42", "43", "44", "45"];
const STOCK_QTY = [8, 12, 15, 10, 6, 4, 2, 1];

function createVariants(colors: { name: string; hex: string }[], productSku: string) {
  return colors.flatMap((color, ci) =>
    SIZES.map((size, si) => ({
      size,
      color: color.name,
      colorHex: color.hex,
      sku: `${productSku}-${color.name.substring(0, 2).toUpperCase()}-${size}`,
      stock: ci === 0 ? STOCK_QTY[si] : Math.max(0, STOCK_QTY[si] - 2),
    }))
  );
}

// Placeholder Cloudinary images (use real ones after upload)
const PLACEHOLDER_IMAGES = [
  { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-1" },
  { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-2" },
  { url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-3" },
  { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-4" },
  { url: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-5" },
  { url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80", pid: "musa-kicks/products/casual/shoe-6" },
  { url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80", pid: "musa-kicks/products/casual/shoe-7" },
  { url: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80", pid: "musa-kicks/products/running/shoe-8" },
  { url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80", pid: "musa-kicks/products/formal/shoe-9" },
  { url: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80", pid: "musa-kicks/products/boots/shoe-10" },
  { url: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=800&q=80", pid: "musa-kicks/products/slides/shoe-11" },
  { url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-12" },
  { url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80", pid: "musa-kicks/products/casual/shoe-13" },
  { url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=800&q=80", pid: "musa-kicks/products/running/shoe-14" },
  { url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=80", pid: "musa-kicks/products/sneakers/shoe-15" },
];

async function main() {
  console.log("🌱 Starting seed...");

  // ── Cleanup ────────────────────────────────────────────
  await prisma.loyaltyPurchase.deleteMany();
  await prisma.loyaltyCycle.deleteMany();
  await prisma.reward.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.wishlistItem.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();
  await prisma.siteSettings.deleteMany();

  // ── Site Settings ──────────────────────────────────────
  const settings = [
    { key: "brandName",               value: "Musa Kicks" },
    { key: "brandEmail",              value: "hello@musakicks.com" },
    { key: "brandPhone",              value: "+923001234567" },
    { key: "brandAddress",            value: "Islamabad, Pakistan" },
    { key: "whatsappNumber",          value: "+923001234567" },
    { key: "whatsappOrderMessageTemplate", value: "Hello Musa Kicks,\n\nI would like to place an order.\n\n{orderDetails}\n\nThank you." },
    { key: "shippingFee",             value: "200" },
    { key: "freeShippingThreshold",   value: "5000" },
    { key: "loyaltyRequiredPurchases", value: "4" },
    { key: "loyaltyRewardTitle",      value: "Special Musa Kicks Gift" },
    { key: "loyaltyRewardDescription", value: "Congratulations! You have earned a special gift from Musa Kicks. Please WhatsApp us to claim your reward. We'll send you an exclusive pair or special merchandise." },
    { key: "loyaltyRewardExpirationDays", value: "90" },
    { key: "currency",                value: "PKR" },
    { key: "currencySymbol",          value: "Rs." },
    { key: "returnPeriodDays",        value: "7" },
    { key: "socialInstagram",         value: "https://instagram.com/musakicks" },
    { key: "socialFacebook",          value: "https://facebook.com/musakicks" },
  ];

  await prisma.siteSettings.createMany({ data: settings });
  console.log("✅ Site settings created");

  // ── Users ──────────────────────────────────────────────
  const adminHash = await bcrypt.hash("admin123!", 12);
  const customerHash = await bcrypt.hash("customer123!", 12);
  const customer2Hash = await bcrypt.hash("test1234!", 12);

  const admin = await prisma.user.create({
    data: { name: "Musa Khan", email: "admin@musakicks.com", passwordHash: adminHash, role: "ADMIN", phone: "+923001234567" },
  });

  const customer1 = await prisma.user.create({
    data: { name: "Ali Hassan", email: "ali@example.com", passwordHash: customerHash, role: "CUSTOMER", phone: "+923011234567" },
  });

  const customer2 = await prisma.user.create({
    data: { name: "Sara Ahmed", email: "sara@example.com", passwordHash: customer2Hash, role: "CUSTOMER", phone: "+923021234567" },
  });

  console.log("✅ Users created");

  // ── Categories ─────────────────────────────────────────
  const categoryData = [
    { name: "Sneakers",  description: "Urban and sporty sneakers for everyday style", sortOrder: 1 },
    { name: "Casual",    description: "Comfortable casual shoes for relaxed occasions", sortOrder: 2 },
    { name: "Running",   description: "Performance running shoes for active lifestyles", sortOrder: 3 },
    { name: "Formal",    description: "Elegant formal shoes for professional settings", sortOrder: 4 },
    { name: "Boots",     description: "Durable boots for all seasons and terrains", sortOrder: 5 },
    { name: "Slides",    description: "Easy-to-wear slides and sandals", sortOrder: 6 },
  ];

  const categories = await Promise.all(
    categoryData.map((cat) =>
      prisma.category.create({
        data: { name: cat.name, slug: slug(cat.name), description: cat.description, isActive: true, sortOrder: cat.sortOrder },
      })
    )
  );

  const catMap = Object.fromEntries(categories.map((c: any) => [c.name, c]));
  console.log("✅ Categories created");

  // ── Products ───────────────────────────────────────────
  const productDefs = [
    // Sneakers
    {
      name: "Musa Runner Pro",
      category: "Sneakers",
      price: 6500, compare: 8000,
      featured: true, newArrival: true, bestSeller: false,
      desc: "The Musa Runner Pro combines cutting-edge cushioning technology with a sleek urban aesthetic. Built for those who demand performance without sacrificing style.",
      shortDesc: "Premium urban sneaker with superior cushioning",
      colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "White", hex: "#f5f5f5" }],
      imgIdx: 0,
    },
    {
      name: "Musa Air Classic",
      category: "Sneakers",
      price: 5500, compare: 7000,
      featured: true, newArrival: false, bestSeller: true,
      desc: "A timeless classic reborn with modern comfort. The Musa Air Classic is the shoe that goes with everything — from casual Fridays to weekend hangouts.",
      shortDesc: "Timeless classic sneaker with modern comfort",
      colors: [{ name: "White", hex: "#f5f5f5" }, { name: "Navy", hex: "#1a237e" }, { name: "Red", hex: "#c62828" }],
      imgIdx: 1,
    },
    {
      name: "Musa Street King",
      category: "Sneakers",
      price: 7200, compare: null,
      featured: true, newArrival: true, bestSeller: false,
      desc: "Rule the streets. The Street King features a bold silhouette, premium leather upper, and cloud-like cushioning that keeps you comfortable all day.",
      shortDesc: "Bold streetwear sneaker with premium leather",
      colors: [{ name: "Brown", hex: "#5D4037" }, { name: "Black", hex: "#1a1a1a" }],
      imgIdx: 2,
    },
    {
      name: "Musa Metro Lite",
      category: "Sneakers",
      price: 4800, compare: 5500,
      featured: false, newArrival: true, bestSeller: false,
      desc: "Lightweight and breathable, the Metro Lite is your go-to for long days on your feet. Mesh upper keeps you cool while the memory foam insole provides all-day support.",
      shortDesc: "Lightweight breathable sneaker for all-day wear",
      colors: [{ name: "Grey", hex: "#9e9e9e" }, { name: "White", hex: "#f5f5f5" }],
      imgIdx: 11,
    },
    // Casual
    {
      name: "Musa Comfort Walk",
      category: "Casual",
      price: 4200, compare: 5000,
      featured: false, newArrival: false, bestSeller: true,
      desc: "Every step feels like walking on clouds. The Comfort Walk is engineered for those who prioritize comfort without compromising on style.",
      shortDesc: "Ultra-comfortable everyday casual shoe",
      colors: [{ name: "Tan", hex: "#D7CCC8" }, { name: "Dark Brown", hex: "#4E342E" }],
      imgIdx: 5,
    },
    {
      name: "Musa Weekend Slip",
      category: "Casual",
      price: 3800, compare: null,
      featured: false, newArrival: true, bestSeller: false,
      desc: "Perfect for lazy weekends and casual outings. The Weekend Slip features an easy slip-on design with a cushioned footbed for lasting comfort.",
      shortDesc: "Easy slip-on casual shoe for weekends",
      colors: [{ name: "Navy", hex: "#1a237e" }, { name: "Brown", hex: "#5D4037" }],
      imgIdx: 6,
    },
    {
      name: "Musa Linen Loafer",
      category: "Casual",
      price: 5200, compare: 6200,
      featured: true, newArrival: false, bestSeller: false,
      desc: "Sophisticated casual comfort in a premium linen construction. The Linen Loafer bridges the gap between casual and smart, making it versatile enough for any occasion.",
      shortDesc: "Premium linen loafer for sophisticated casual",
      colors: [{ name: "Beige", hex: "#D8C3A5" }, { name: "Olive", hex: "#558B2F" }],
      imgIdx: 12,
    },
    // Running
    {
      name: "Musa Sprint X",
      category: "Running",
      price: 8500, compare: 10000,
      featured: true, newArrival: true, bestSeller: true,
      desc: "Break your personal records with the Musa Sprint X. Featuring responsive foam technology and a carbon fiber plate for explosive energy return in every stride.",
      shortDesc: "High-performance running shoe with carbon fiber",
      colors: [{ name: "Orange", hex: "#FF6D00" }, { name: "Black", hex: "#1a1a1a" }],
      imgIdx: 7,
    },
    {
      name: "Musa Trail Blazer",
      category: "Running",
      price: 7500, compare: null,
      featured: false, newArrival: false, bestSeller: false,
      desc: "Conquer any terrain with the Trail Blazer. Aggressive lug pattern provides superior grip on dirt, gravel, and grass, while the waterproof upper keeps you dry.",
      shortDesc: "Trail running shoe with waterproof upper",
      colors: [{ name: "Olive", hex: "#558B2F" }, { name: "Grey", hex: "#9e9e9e" }],
      imgIdx: 13,
    },
    // Formal
    {
      name: "Musa Executive",
      category: "Formal",
      price: 9500, compare: 12000,
      featured: true, newArrival: false, bestSeller: true,
      desc: "Command the boardroom with the Musa Executive. Handcrafted from full-grain leather with a cushioned insole and a classic Oxford silhouette that never goes out of style.",
      shortDesc: "Handcrafted full-grain leather Oxford",
      colors: [{ name: "Black", hex: "#1a1a1a" }, { name: "Dark Brown", hex: "#4E342E" }],
      imgIdx: 8,
    },
    {
      name: "Musa Derby Elite",
      category: "Formal",
      price: 8200, compare: 9500,
      featured: false, newArrival: true, bestSeller: false,
      desc: "The Derby Elite is the perfect blend of traditional craftsmanship and contemporary design. Goodyear welted construction ensures long-lasting durability.",
      shortDesc: "Goodyear welted Derby shoe for professionals",
      colors: [{ name: "Cognac", hex: "#8D4E1A" }, { name: "Black", hex: "#1a1a1a" }],
      imgIdx: 8,
    },
    // Boots
    {
      name: "Musa Desert Boot",
      category: "Boots",
      price: 7800, compare: 9000,
      featured: false, newArrival: false, bestSeller: true,
      desc: "The desert boot reinvented. Soft suede upper, crepe rubber sole, and a simple silhouette that works with jeans, chinos, or even smart-casual trousers.",
      shortDesc: "Classic desert boot in soft suede",
      colors: [{ name: "Sand", hex: "#C2A06A" }, { name: "Navy", hex: "#1a237e" }],
      imgIdx: 9,
    },
    {
      name: "Musa Chelsea Pro",
      category: "Boots",
      price: 8900, compare: null,
      featured: true, newArrival: true, bestSeller: false,
      desc: "The ultimate Chelsea boot — clean silhouette, elastic side panels for easy on-and-off, and a leather sole that ages beautifully with every wear.",
      shortDesc: "Premium Chelsea boot with elastic side panels",
      colors: [{ name: "Dark Brown", hex: "#4E342E" }, { name: "Black", hex: "#1a1a1a" }],
      imgIdx: 9,
    },
    // Slides
    {
      name: "Musa Pool Slide",
      category: "Slides",
      price: 2500, compare: 3000,
      featured: false, newArrival: false, bestSeller: true,
      desc: "The premium slide you've been waiting for. Contoured footbed, adjustable strap, and non-slip outsole make the Pool Slide your new summer essential.",
      shortDesc: "Contoured pool slide with non-slip outsole",
      colors: [{ name: "White", hex: "#f5f5f5" }, { name: "Black", hex: "#1a1a1a" }, { name: "Sand", hex: "#C2A06A" }],
      imgIdx: 10,
    },
    {
      name: "Musa Sport Sandal",
      category: "Slides",
      price: 3200, compare: 4000,
      featured: false, newArrival: true, bestSeller: false,
      desc: "Adventure-ready sport sandal with adjustable webbing straps, EVA midsole for cushioning, and a grippy rubber outsole for confident footing on any surface.",
      shortDesc: "Sport sandal with adjustable straps and EVA sole",
      colors: [{ name: "Grey", hex: "#9e9e9e" }, { name: "Orange", hex: "#FF6D00" }],
      imgIdx: 14,
    },
  ];

  for (const [index, def] of productDefs.entries()) {
    const category = catMap[def.category];
    if (!category) continue;

    const productSlug = slug(def.name);
    const productSku = `MK-${def.category.substring(0, 3).toUpperCase()}-${String(index + 1).padStart(3, "0")}`;
    const img = PLACEHOLDER_IMAGES[def.imgIdx];

    await prisma.product.create({
      data: {
        name: def.name,
        slug: productSlug,
        sku: productSku,
        description: def.desc,
        shortDescription: def.shortDesc,
        price: def.price,
        compareAtPrice: def.compare,
        categoryId: category.id,
        isFeatured: def.featured,
        isNewArrival: def.newArrival,
        isBestSeller: def.bestSeller,
        isActive: true,
        images: {
          create: [
            {
              imageUrl: img.url,
              publicId: img.pid,
              altText: def.name,
              sortOrder: 0,
              isPrimary: true,
            },
          ],
        },
        variants: {
          create: createVariants(def.colors, productSku),
        },
      },
    });
  }

  console.log(`✅ ${productDefs.length} products created`);

  // ── Sample Orders ──────────────────────────────────────
  const products = await prisma.product.findMany({ include: { variants: true } });

  // Helper: create order
  async function createOrder(
    userId: string,
    productVariantPairs: { product: typeof products[0]; variantIdx: number; qty: number }[],
    status: "DELIVERED" | "PENDING" | "CONFIRMED" | "SHIPPED",
    daysAgo: number
  ) {
    const orderNumber = `MK-${Date.now().toString().slice(-8)}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
    const subtotal = productVariantPairs.reduce((s, p) => s + Number(p.product.price) * p.qty, 0);
    const shippingFee = subtotal >= 5000 ? 0 : 200;
    const total = subtotal + shippingFee;
    const createdAt = new Date(Date.now() - daysAgo * 86400000);

    return prisma.order.create({
      data: {
        orderNumber,
        userId,
        status,
        paymentStatus: status === "DELIVERED" ? "PAID" : "PENDING",
        subtotal,
        shippingFee,
        total,
        whatsappSent: true,
        createdAt,
        updatedAt: createdAt,
        items: {
          create: productVariantPairs.map(({ product, variantIdx, qty }) => {
            const variant = product.variants[variantIdx] ?? product.variants[0];
            return {
              productId: product.id,
              variantId: variant.id,
              productName: product.name,
              productSku: variant.sku,
              size: variant.size,
              color: variant.color,
              price: Number(product.price),
              quantity: qty,
            };
          }),
        },
      },
    });
  }

  // Customer 1 orders (3 delivered → loyalty progress 3/4)
  const p0 = products[0], p1 = products[1], p2 = products[4];
  const o1 = await createOrder(customer1.id, [{ product: p0, variantIdx: 2, qty: 1 }], "DELIVERED", 90);
  const o2 = await createOrder(customer1.id, [{ product: p1, variantIdx: 0, qty: 1 }], "DELIVERED", 60);
  const o3 = await createOrder(customer1.id, [{ product: p2, variantIdx: 1, qty: 2 }], "DELIVERED", 30);
  const o4 = await createOrder(customer1.id, [{ product: products[7], variantIdx: 0, qty: 1 }], "PENDING", 2);

  // Customer 2 orders (1 delivered, 1 pending)
  const o5 = await createOrder(customer2.id, [{ product: products[9], variantIdx: 0, qty: 1 }], "DELIVERED", 45);
  const o6 = await createOrder(customer2.id, [{ product: products[11], variantIdx: 2, qty: 1 }], "SHIPPED", 5);

  console.log("✅ Sample orders created");

  // ── Loyalty Cycles ─────────────────────────────────────
  // Customer 1: 3/4 progress
  const cycle1 = await prisma.loyaltyCycle.create({
    data: {
      userId: customer1.id,
      purchaseCount: 3,
      requiredCount: 4,
      status: "ACTIVE",
      startedAt: new Date(Date.now() - 90 * 86400000),
    },
  });

  await prisma.loyaltyPurchase.createMany({
    data: [
      { cycleId: cycle1.id, orderId: o1.id },
      { cycleId: cycle1.id, orderId: o2.id },
      { cycleId: cycle1.id, orderId: o3.id },
    ],
  });

  // Customer 2: 1/4 progress
  const cycle2 = await prisma.loyaltyCycle.create({
    data: {
      userId: customer2.id,
      purchaseCount: 1,
      requiredCount: 4,
      status: "ACTIVE",
      startedAt: new Date(Date.now() - 45 * 86400000),
    },
  });

  await prisma.loyaltyPurchase.create({
    data: { cycleId: cycle2.id, orderId: o5.id },
  });

  console.log("✅ Loyalty cycles created");

  // ── Sample Addresses ───────────────────────────────────
  await prisma.address.create({
    data: {
      userId: customer1.id,
      label: "Home",
      recipientName: "Ali Hassan",
      phone: "+923011234567",
      line1: "House 12, Street 5, F-7/2",
      city: "Islamabad",
      province: "Federal Capital Territory",
      country: "Pakistan",
      isDefault: true,
    },
  });

  await prisma.address.create({
    data: {
      userId: customer2.id,
      label: "Home",
      recipientName: "Sara Ahmed",
      phone: "+923021234567",
      line1: "Flat 3A, Bahria Town Phase 4",
      city: "Rawalpindi",
      province: "Punjab",
      country: "Pakistan",
      isDefault: true,
    },
  });

  console.log("✅ Addresses created");

  // ── Carts ──────────────────────────────────────────────
  const cart1 = await prisma.cart.create({ data: { userId: customer1.id } });
  const product4 = products[3];
  const variant4 = product4.variants[0];
  if (variant4) {
    await prisma.cartItem.create({
      data: {
        cartId: cart1.id,
        productId: product4.id,
        variantId: variant4.id,
        quantity: 1,
      },
    });
  }

  console.log("✅ Cart created");

  console.log("\n🎉 Seed completed successfully!\n");
  console.log("Admin login:    admin@musakicks.com  / admin123!");
  console.log("Customer login: ali@example.com      / customer123!");
  console.log("Customer login: sara@example.com     / test1234!");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
