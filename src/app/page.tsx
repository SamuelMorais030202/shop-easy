"use client";

import { useState } from "react";

import { Header } from "@/components/header"
import { X, Search, ShoppingCart, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [search, setSearch] = useState("");
  const { products, error, isLoading } = useProducts(search);
  const { addToCart, cart, removeFromCart } = useCart();

  const isProductInCart = (productId: string) => {
    return cart.some((product) => product.id === productId);
  };

  return (
    <div>
      <Header cartLength={cart.length} />

      <section className="flex justify-between gap-2 px-6 mt-6">
        <header>
          <h3 className="text-xl font-semibold text-foreground">
            Products:
          </h3>
        </header>

        <div className="relative flex items-center gap-2">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 pl-8 pr-10 border rounded-lg bg-background text-foreground border-border focus:outline-none focus:ring-2 focus:ring-primary"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute left-2 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
          )}

          <Button className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/80">
            <Search size={20} />
          </Button>
        </div>
      </section>

      <section className="px-6 my-6">
        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="border p-4 rounded-lg shadow">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-md"
                onError={(e) => (e.currentTarget.src = "/image-default.png")}
              />
              <CardTitle className="text-lg font-semibold mt-2">{product.name}</CardTitle>
              <CardDescription className="text-sm text-gray-600">{product.detail}</CardDescription>
              <strong className="text-lg text-primary">
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(Number(product.price))}
              </strong>

              {isProductInCart(product.id) ? (
                <Button
                  onClick={() => removeFromCart(product.id)}
                  className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <TrashIcon />
                  Remove from Cart
                </Button>
              ) : (
                <Button
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <ShoppingCart className="size-4" />
                  Add to Cart
                </Button>
              )}
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
