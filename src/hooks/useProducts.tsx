"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/axios";

export interface IProduct {
  id: string;
  name: string;
  detail: string;
  price: string;
  hero?: string;
  image: string;
  offer?: string;
}

export function useProducts(search: string) {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('products', {
        params: {
          q: search
        },
      });
  
      setProducts(response.data);

    } catch (err) {
      setError("Failed to fetch products");
      console.log(err)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return { products, isLoading, error };
}
