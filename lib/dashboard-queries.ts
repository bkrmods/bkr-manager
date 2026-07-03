import { prisma } from "@/lib/prisma";

function toNumber(value: unknown) {
  if (!value) return 0;

  return Number(value);
}

function getMonthKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}`;
}

function formatMonthLabel(date: Date) {
  const label = new Intl.DateTimeFormat("fr-FR", {
    month: "short",
  }).format(date);

  return label.charAt(0).toUpperCase() + label.slice(1).replace(".", "");
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

export async function getLowStockProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      stock: "asc",
    },
    select: {
      id: true,
      name: true,
      stock: true,
      lowStockThreshold: true,
    },
  });

  return products
    .filter((product) => product.stock <= product.lowStockThreshold)
    .slice(0, 5);
}

export async function getMonthlyGoal() {
  const now = new Date();

  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const monthlyOrders = await prisma.order.aggregate({
    where: {
      createdAt: {
        gte: startOfMonth,
      },
    },
    _sum: {
      totalAmount: true,
    },
  });

  const current = toNumber(monthlyOrders._sum.totalAmount);
  const target = 10000;

  const percentage =
    target > 0 ? Math.round((current / target) * 100) : 0;

  return {
    current,
    target,
    percentage,
    remaining: Math.max(target - current, 0),
  };
}

export async function getRecentActivity() {
  const movements = await prisma.inventoryMovement.findMany({
    take: 6,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: {
        select: {
          name: true,
        },
      },
      component: {
        select: {
          name: true,
        },
      },
    },
  });

  return movements.map((movement) => {
    const itemName =
      movement.product?.name ??
      movement.component?.name ??
      "Élément inconnu";

    return {
      id: movement.id,
      type: movement.type,
      quantity: movement.quantity,
      itemName,
      reason: movement.reason,
      createdAt: movement.createdAt,
    };
  });
}

export async function getSalesChartData() {
  const now = new Date();

  const startDate = new Date(
    now.getFullYear(),
    now.getMonth() - 5,
    1
  );

  const orders = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: startDate,
      },
    },
    select: {
      createdAt: true,
      totalAmount: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const months = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(
      now.getFullYear(),
      now.getMonth() - 5 + index,
      1
    );

    return {
      key: getMonthKey(date),
      month: formatMonthLabel(date),
      sales: 0,
    };
  });

  const salesByMonth = new Map(
    months.map((month) => [month.key, month.sales])
  );

  orders.forEach((order) => {
    const key = getMonthKey(order.createdAt);
    const currentSales = salesByMonth.get(key) ?? 0;

    salesByMonth.set(
      key,
      currentSales + toNumber(order.totalAmount)
    );
  });

  return months.map((month) => ({
    month: month.month,
    sales: salesByMonth.get(month.key) ?? 0,
  }));
}