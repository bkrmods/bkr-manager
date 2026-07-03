import { prisma } from "@/lib/prisma";

function toNumber(value: unknown) {
  if (!value) return 0;

  return Number(value);
}

export async function getInventoryData() {
  const [products, components] = await Promise.all([
    prisma.product.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.component.findMany({
      orderBy: {
        name: "asc",
      },
      include: {
        supplier: {
          select: {
            name: true,
          },
        },
      },
    }),
  ]);

  const productStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const componentStock = components.reduce(
    (total, component) => total + component.stock,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock <= product.lowStockThreshold
  );

  const lowStockComponents = components.filter(
    (component) => component.stock <= component.lowStockThreshold
  );

  return {
    summary: {
      productCount: products.length,
      componentCount: components.length,
      productStock,
      componentStock,
      lowStockCount:
        lowStockProducts.length + lowStockComponents.length,
    },

    products: products.map((product) => ({
      id: product.id,
      name: product.name,
      sku: product.sku,
      category: product.category,
      sellingPrice: toNumber(product.sellingPrice),
      costPrice: toNumber(product.costPrice),
      margin: toNumber(product.margin),
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      status: product.status,
    })),

    components: components.map((component) => ({
      id: component.id,
      name: component.name,
      sku: component.sku,
      type: component.type,
      supplierName: component.supplier?.name ?? "Aucun fournisseur",
      unitCost: toNumber(component.unitCost),
      stock: component.stock,
      lowStockThreshold: component.lowStockThreshold,
      status: component.status,
    })),
  };
}