import { ModeToggle } from "./theme/model-toggle";
import { ShoppingCart, Trash } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { IProduct } from "@/hooks/useProducts";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

interface IHeaderProps {
  cartItems: IProduct[];
  removeFromCart: (productId: string) => void;
}

export function Header({ cartItems, removeFromCart }: IHeaderProps) {

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <h3>
          ShopEasy
        </h3>

        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />

          <Dialog>
            <DialogTrigger asChild>
              <div className="relative cursor-pointer">
                <ShoppingCart />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center size-4 bg-primary text-white text-xs font-bold rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl w-full">
              <DialogTitle>Seu Carrinho</DialogTitle>
              <div className="mt-4 max-h-80 overflow-y-auto space-y-2 custom-scrollbar pr-3">
                {cartItems.length > 0 ? (
                  <div className="mt-4 space-y-2">
                    {cartItems.map((item) => (
                      <Card key={item.id} className="flex items-center gap-4 p-4 border rounded-lg shadow">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                          onError={(e) => (e.currentTarget.src = "/image-default.png")}
                        />

                        <div className="flex-1">
                          <h4 className="text-sm font-semibold">{item.name}</h4>
                          <p className="text-xs text-gray-500">{item.detail}</p>
                          <strong className="text-sm text-primary">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: "USD",
                            }).format(Number(item.price))}
                          </strong>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="size-4" />
                        </Button>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-4">Seu carrinho está vazio.</p>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}