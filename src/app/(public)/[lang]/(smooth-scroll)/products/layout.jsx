import { ProductNavBar } from "@/features/pages/products/layouts/product-nav-bar";

export default function ProductLayout({ children }) {
  return (
    <>
      <ProductNavBar />
      {children}
    </>
  );
}
