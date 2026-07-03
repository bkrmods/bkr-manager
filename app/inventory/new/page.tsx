import PageHeader from "@/components/shared/PageHeader";
import ProductForm from "@/components/inventory/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8 p-8">
      <PageHeader
        title="Ajouter un produit"
        subtitle="Crée une nouvelle montre prête à vendre dans BKR Manager."
      />

      <ProductForm />
    </div>
  );
}