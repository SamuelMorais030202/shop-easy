import { ModeToggle } from "./theme/model-toggle";
import { ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <h3>
          ShopEasy
        </h3>

        <div className="ml-auto flex items-center gap-3">
          <ModeToggle />
          <ShoppingCart />
        </div>
      </div>
    </header>
  )
}