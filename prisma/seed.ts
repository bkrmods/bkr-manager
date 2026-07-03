import { prisma } from "../lib/prisma";

async function main() {
  console.log("Start seeding BKR Manager database...");

  await prisma.inventoryMovement.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.buildComponent.deleteMany();
  await prisma.build.deleteMany();
  await prisma.component.deleteMany();
  await prisma.product.deleteMany();
  await prisma.supplier.deleteMany();

  const supplier = await prisma.supplier.create({
    data: {
      name: "Shenzhen Changthai Technology Co., Ltd.",
      country: "China",
      alibabaUrl: "https://www.alibaba.com",
      whatsapp: "+86",
      email: "supplier@example.com",
      currency: "USD",
      averageDeliveryDays: 12,
      qualityRating: 4,
      notes: "Fournisseur principal pour les montres et composants.",
    },
  });

  const movement = await prisma.component.create({
    data: {
      name: "Mouvement NH35",
      sku: "COMP-NH35-001",
      type: "MOVEMENT",
      supplierId: supplier.id,
      unitCost: "28.00",
      stock: 15,
      lowStockThreshold: 5,
      status: "ACTIVE",
    },
  });

  const caseDatejust = await prisma.component.create({
    data: {
      name: "Boîtier Datejust 40mm",
      sku: "COMP-CASE-DJ40-001",
      type: "CASE",
      supplierId: supplier.id,
      unitCost: "32.00",
      stock: 8,
      lowStockThreshold: 3,
      status: "ACTIVE",
    },
  });

  const dialArabicBlue = await prisma.component.create({
    data: {
      name: "Cadran Arabic Blue",
      sku: "COMP-DIAL-ARBLUE-001",
      type: "DIAL",
      supplierId: supplier.id,
      unitCost: "18.00",
      stock: 6,
      lowStockThreshold: 3,
      status: "ACTIVE",
    },
  });

  const braceletJubilee = await prisma.component.create({
    data: {
      name: "Bracelet Jubilee",
      sku: "COMP-BRACELET-JUB-001",
      type: "BRACELET",
      supplierId: supplier.id,
      unitCost: "22.00",
      stock: 10,
      lowStockThreshold: 4,
      status: "ACTIVE",
    },
  });

  const datejustBlue = await prisma.product.create({
    data: {
      name: "Datejust Arabic Blue",
      sku: "WATCH-DJ-ARBLUE-001",
      description: "Montre modifiée style Datejust avec cadran Arabic Blue.",
      category: "Seiko Mod",
      sellingPrice: "320.00",
      costPrice: "100.00",
      margin: "220.00",
      stock: 3,
      lowStockThreshold: 2,
      status: "ACTIVE",
      imageUrl: "",
    },
  });

  const gmtPepsi = await prisma.product.create({
    data: {
      name: "GMT Pepsi",
      sku: "WATCH-GMT-PEPSI-001",
      description: "Montre modifiée style GMT Pepsi.",
      category: "Seiko Mod",
      sellingPrice: "350.00",
      costPrice: "115.00",
      margin: "235.00",
      stock: 2,
      lowStockThreshold: 2,
      status: "ACTIVE",
      imageUrl: "",
    },
  });

  const build = await prisma.build.create({
    data: {
      productId: datejustBlue.id,
      quantity: 1,
      totalCost: "100.00",
      status: "COMPLETED",
    },
  });

  await prisma.buildComponent.createMany({
    data: [
      {
        buildId: build.id,
        componentId: movement.id,
        quantityUsed: 1,
        unitCost: "28.00",
      },
      {
        buildId: build.id,
        componentId: caseDatejust.id,
        quantityUsed: 1,
        unitCost: "32.00",
      },
      {
        buildId: build.id,
        componentId: dialArabicBlue.id,
        quantityUsed: 1,
        unitCost: "18.00",
      },
      {
        buildId: build.id,
        componentId: braceletJubilee.id,
        quantityUsed: 1,
        unitCost: "22.00",
      },
    ],
  });

  const customer = await prisma.customer.create({
    data: {
      firstName: "Lucas",
      lastName: "Martin",
      email: "lucas@example.com",
      phone: "0600000000",
      platform: "VINTED",
      address: "Paris, France",
      totalSpent: "320.00",
      orderCount: 1,
      notes: "Premier client de test.",
    },
  });

  const order = await prisma.order.create({
    data: {
      orderNumber: "BKR-1001",
      customerId: customer.id,
      platform: "VINTED",
      status: "DELIVERED",
      totalAmount: "320.00",
      totalCost: "100.00",
      profit: "220.00",
      shippingCarrier: "La Poste",
      trackingNumber: "TEST123456",
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: datejustBlue.id,
      quantity: 1,
      unitPrice: "320.00",
      unitCost: "100.00",
      profit: "220.00",
    },
  });

  await prisma.inventoryMovement.createMany({
    data: [
      {
        type: "PURCHASE",
        componentId: movement.id,
        quantity: 15,
        reason: "Achat fournisseur initial",
      },
      {
        type: "PURCHASE",
        componentId: caseDatejust.id,
        quantity: 8,
        reason: "Achat fournisseur initial",
      },
      {
        type: "PURCHASE",
        componentId: dialArabicBlue.id,
        quantity: 6,
        reason: "Achat fournisseur initial",
      },
      {
        type: "PURCHASE",
        componentId: braceletJubilee.id,
        quantity: 10,
        reason: "Achat fournisseur initial",
      },
      {
        type: "BUILD",
        productId: datejustBlue.id,
        quantity: 1,
        reason: "Assemblage Datejust Arabic Blue",
      },
      {
        type: "SALE",
        productId: datejustBlue.id,
        quantity: -1,
        reason: "Vente commande BKR-1001",
      },
      {
        type: "ADJUSTMENT",
        productId: gmtPepsi.id,
        quantity: 2,
        reason: "Stock initial GMT Pepsi",
      },
    ],
  });

  console.log("Seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });