"use client";

import Link from "next/link";
import { useActionState } from "react";

import {
  createProduct,
  type CreateProductState,
} from "@/app/inventory/actions";

const initialState: CreateProductState = {
  success: false,
  message: "",
};

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState
  );

  return (
    <form
      action={formAction}
      className="rounded-2xl border border-gray-800 bg-[#111827] p-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Nouvelle montre
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Ajoute une montre prête à vendre dans Neon.
        </p>
      </div>

      {state.message && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
          {state.message}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Nom du produit
          </label>

          <input
            name="name"
            required
            placeholder="Datejust Arabic Blue"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            SKU
          </label>

          <input
            name="sku"
            required
            placeholder="WATCH-DJ-ARBLUE-002"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Catégorie
          </label>

          <input
            name="category"
            required
            defaultValue="Seiko Mod"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Stock
          </label>

          <input
            name="stock"
            type="number"
            min="0"
            required
            defaultValue="1"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Prix de vente
          </label>

          <input
            name="sellingPrice"
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="320"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Coût de revient
          </label>

          <input
            name="costPrice"
            type="number"
            min="0"
            step="0.01"
            required
            placeholder="100"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Seuil stock critique
          </label>

          <input
            name="lowStockThreshold"
            type="number"
            min="0"
            required
            defaultValue="2"
            className="w-full rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-gray-300">
            Description
          </label>

          <textarea
            name="description"
            rows={4}
            placeholder="Montre modifiée style Datejust avec cadran Arabic..."
            className="w-full resize-none rounded-xl border border-gray-700 bg-[#0F172A] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-end gap-4">
        <Link
          href="/inventory"
          className="rounded-xl border border-gray-700 px-5 py-3 font-medium text-gray-300 transition hover:bg-gray-800 hover:text-white"
        >
          Annuler
        </Link>

        <button
          type="submit"
          disabled={isPending}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? "Création..." : "Ajouter le produit"}
        </button>
      </div>
    </form>
  );
}