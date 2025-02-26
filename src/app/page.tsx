"use client"

import { useState } from "react";

import { Header } from "@/components/header"
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Header />

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
    </div>
  );
}
