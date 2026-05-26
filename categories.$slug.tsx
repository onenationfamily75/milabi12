import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/categories/$slug")({
  loader: ({ params }) => {
    const cat = categories.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    const items = products.filter((p) => p.categories.includes(params.slug));
    return { cat, items };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} — Milabi Global` },
          { name: "description", content: `Shop ${loaderData.cat.name} at Milabi Global. Order on WhatsApp.` },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Category not found</h1>
      <Link to="/categories" className="text-primary hover:underline">← Back to categories</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat, items } = Route.useLoaderData();
  return (
    <div className="container mx-auto px-4 py-10">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        <Link to="/categories" className="hover:text-primary">Categories</Link> /{" "}
        <span className="text-foreground">{cat.name}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">{cat.name}</h1>
      <p className="text-muted-foreground mb-8">{items.length} product{items.length === 1 ? "" : "s"}</p>
      {items.length === 0 ? (
        <p className="text-muted-foreground">No products in this category yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {items.map((p: typeof products[number]) => <ProductCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}