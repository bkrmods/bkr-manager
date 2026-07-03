import { prisma } from "@/lib/prisma";

function toNumber(value: unknown) {
  if (!value) return 0;

  return Number(value);
}

export async function getDashboardMetrics() {
  const [orderMetrics, productStock] = await Promise.all([
    prisma.order.aggregate({
      _count: {
        _all: true,
      },
      _sum: {
        totalAmount: true,
        profit: true,
      },
    }),

    prisma.product.aggregate({
      _sum: {
        stock: true,
      },
    }),
  ]);

  return {
    revenue: toNumber(orderMetrics._sum.totalAmount),
    orders: orderMetrics._count._all,
    stock: productStock._sum.stock ?? 0,
    profit: toNumber(orderMetrics._sum.profit),
  };
}

export async function getRecentOrders() {
  const orders = await prisma.order.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return orders.map((order) => {
    const firstItem = order.items[0];

    return {
      id: order.orderNumber,
      customer: `${order.customer.firstName} ${order.customer.lastName ?? ""}`.trim(),
      product: firstItem?.product.name ?? "Produit inconnu",
      amount: toNumber(order.totalAmount),
      status: order.status,
    };
  });
}