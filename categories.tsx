import { createFileRoute, Link } from "@tanstack/react-router";
import { categories } from "@/data/catalog";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All Categories — Milabi Global" },
      { name: "description", content: "Browse all product categories at Milabi Global." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Shop by category</h1>
      <p className="text-muted-foreground mb-8">Find exactly what you're looking for.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((c) => (
          <Link
            key={c.slug}
            to="/categories/$slug"
            params={{ slug: c.slug }}
            className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <div className="p-3 text-center text-sm font-medium">{c.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}