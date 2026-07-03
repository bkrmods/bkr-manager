"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

function getRequiredString(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Le champ ${key} est obligatoire.`);
  }

  return value.trim();
}

function getNumber(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string" || value.trim().length === 0) {
    return 0;
  }

  const numberValue = Number(value);

  if (Number.isNaN(numberValue)) {
    throw new Error(`Le champ ${key} doit être un nombre.`);
  }

  return numberValue;
}

export async function createProduct(formData: FormData) {
  const name = getRequiredString(formData, "name");
  const sku = getRequiredString(formData, "sku");
  const category = getRequiredString(formData, "category");

  const description = formData.get("description");
  const sellingPrice = getNumber(formData, "sellingPrice");
  const costPrice = getNumber(formData, "costPrice");
  const stock = getNumber(formData, "stock");
  const lowStockThreshold = getNumber(formData, "lowStockThreshold");

  const margin = sellingPrice - costPrice;

  await prisma.product.create({
    data: {
      name,
      sku,
      description:
        typeof description === "string" && description.trim().length > 0
          ? description.trim()
          : null,
      category,
      sellingPrice: sellingPrice.toString(),
      costPrice: costPrice.toString(),
      margin: margin.toString(),
      stock,
      lowStockThreshold,
      status: "ACTIVE",
      imageUrl: "",
    },
  });

  revalidatePath("/inventory");
  redirect("/inventory");
}