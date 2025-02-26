"use client";

import { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<IProduct[]>(`http://localhost:3333/products`, {
          params: { q: search },
        });
        setProducts(response.data);
      } catch (err) {
        setError("Failed to fetch products");
        console.log(err)
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [search]);

  return { products, isLoading, error };
}
