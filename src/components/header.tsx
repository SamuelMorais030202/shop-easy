import { ModeToggle } from "./theme/model-toggle";
import { ShoppingCart } from "lucide-react";

interface IHeaderProps {
  cartLength: number;
}

export function Header({ cartLength }: IHeaderProps) {

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <h3>
          ShopEasy
        </h3>

        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />
          <div className="relative">
            <ShoppingCart />
            {cartLength> 0 && (
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center size-4 bg-primary text-white text-xs font-bold rounded-full">
                {cartLength}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}