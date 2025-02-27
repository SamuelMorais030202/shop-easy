"use client";

import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar";
import { useProductContext } from "@/contexts/product-context";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  const { products, error, isLoading } = useProductContext();

  return (
    <div>
      <Header />

      <SearchBar />

      <section className="px-6 my-6">
        {isLoading && <p>Loading products...</p>}
        {products.length === 0 && !isLoading && !error && (
          <p className="text-center text-muted-foreground text-lg mt-10">
            No products found.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
