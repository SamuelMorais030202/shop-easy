"use client";

import { createContext, useContext, useState } from "react";
import { useProducts } from "@/hooks/useProducts";

interface Product {
  id: string;
  name: string;
  image: string;
  detail: string;
  price: string;
}

interface ProductContextType {
  products: Product[];
  search: string;
  isLoading: boolean;
  error: string | null;
  setSearch: (search: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const { products, isLoading, error } = useProducts();
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProductContext.Provider value={{ products: filteredProducts, search, setSearch, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) throw new Error("useProductContext must be used within a ProductProvider");
  return context;
}
