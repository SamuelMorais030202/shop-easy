import { ShoppingCart, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/cart-context";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { IProduct } from "@/hooks/useProducts";

interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, removeFromCart, isProductInCart } = useCartContext();

  return (
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
  );
}
