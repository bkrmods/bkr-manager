"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export type CreateProductState = {
  success: boolean;
  message: string;
};

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

function isPrismaUniqueError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "P2002"
  );
}

export async function createProduct(
  previousState: CreateProductState,
  formData: FormData
): Promise<CreateProductState> {
  try {
    const name = getRequiredString(formData, "name");
    const sku = getRequiredString(formData, "sku");
    const category = getRequiredString(formData, "category");

    const description = formData.get("description");

    const sellingPrice = getNumber(formData, "sellingPrice");
    const costPrice = getNumber(formData, "costPrice");
    const stock = getNumber(formData, "stock");
    const lowStockThreshold = getNumber(formData, "lowStockThreshold");

    if (sellingPrice <= 0) {
      return {
        success: false,
        message: "Le prix de vente doit être supérieur à 0.",
      };
    }

    if (costPrice < 0) {
      return {
        success: false,
        message: "Le coût de revient ne peut pas être négatif.",
      };
    }

    if (stock < 0) {
      return {
        success: false,
        message: "Le stock ne peut pas être négatif.",
      };
    }

    if (lowStockThreshold < 0) {
      return {
        success: false,
        message: "Le seuil de stock critique ne peut pas être négatif.",
      };
    }

    const existingProduct = await prisma.product.findUnique({
      where: {
        sku,
      },
    });

    if (existingProduct) {
      return {
        success: false,
        message: "Ce SKU existe déjà. Utilise un autre SKU.",
      };
    }

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
  } catch (error) {
    if (isPrismaUniqueError(error)) {
      return {
        success: false,
        message: "Ce SKU existe déjà. Utilise un autre SKU.",
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: "Une erreur est survenue pendant la création du produit.",
    };
  }

  redirect("/inventory");
}