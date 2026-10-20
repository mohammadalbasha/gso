import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-primary-500">New product</h1>
      <ProductForm />
    </div>
  );
}
