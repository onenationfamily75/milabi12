import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/search")({
  validateSearch: z.object({
    q: z.string().optional().default(""),
    cat: z.string().optional().default(""),
  }),
  head: () => ({
    meta: [
      { title: "Shop all products — Milabi Global" },
      { name: "description", content: "Search and browse the full Milabi Global catalog." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q: initialQ, cat: initialCat } = Route.useSearch();
  const [q, setQ] = useState(initialQ);
  const [cat, setCat] = useState(initialCat);

  const filtered = products.filter((p) => {
    if (cat && !p.categories.includes(cat)) return false;
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Shop</h1>
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by product name…"
          className="flex-1 h-11 rounded-full border border-input bg-background px-5 text-sm outline-none focus:border-primary"
        />
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="h-11 rounded-full border border-input bg-background px-5 text-sm outline-none focus:border-primary"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{filtered.length} product{filtered.length === 1 ? "" : "s"}</p>
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground mb-4">No products match your filters.</p>
          <Link to="/categories" className="text-primary hover:underline">Browse categories instead</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((p) => <ProductCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}