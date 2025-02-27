"use client";

import { IProduct } from "@/hooks/useProducts";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface CartContextType {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (productId: string) => void;
  isProductInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<IProduct[]>([]);
  
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }, []);
  
    useEffect(() => {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }, [cart]);
  
    const addToCart = (product: IProduct) => {
      const newCart = [...cart, product];
      setCart(newCart);
  
      localStorage.setItem("cart", JSON.stringify(newCart));
  
      toast.success(`${product.name} has been added to cart!`, {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };
  
    const removeFromCart = (productId: string) => {
      const newCart = cart.filter((product) => product.id !== productId);
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
  
      toast.error('Product removed from cart', {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    };

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isProductInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCartContext must be used within a CartProvider");
  return context;
}
