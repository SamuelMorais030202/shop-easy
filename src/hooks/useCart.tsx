import { useState, useEffect } from "react";
import { IProduct } from "./useProducts";
import { toast } from "react-toastify";

export const useCart = () => {
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

    toast.success(`${product.name} foi adicionado ao carrinho!`, {
      autoClose: 3000, // O toast ficará visível por 3 segundos
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
  };

  return {
    cart,
    addToCart,
    removeFromCart,
  };
};
