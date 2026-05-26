import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { formatKES, productOrderUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    const related = products
      .filter((p) => p.slug !== product.slug && p.categories.some((c) => product.categories.includes(c)))
      .slice(0, 5);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Milabi Global` },
          { name: "description", content: `Order ${loaderData.product.name} on WhatsApp at Milabi Global.` },
          { property: "og:title", content: loaderData.product.name },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl font-bold mb-2">Product not found</h1>
      <Link to="/search" className="text-primary hover:underline">Browse all products</Link>
    </div>
  ),
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const discount = product.compare && product.price ? Math.round(((product.compare - product.price) / product.compare) * 100) : 0;
  const primaryCat = product.categories[0] ? categories.find((c) => c.slug === product.categories[0]) : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <nav className="text-xs text-muted-foreground mb-4">
        <Link to="/" className="hover:text-primary">Home</Link> /{" "}
        {primaryCat && (
          <>
            <Link to="/categories/$slug" params={{ slug: primaryCat.slug }} className="hover:text-primary">{primaryCat.name}</Link> /{" "}
          </>
        )}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {discount > 0 && (
            <span className="absolute top-4 left-4 rounded-full bg-[oklch(0.6_0.22_25)] px-3 py-1 text-xs font-bold text-white">
              {discount}% OFF
            </span>
          )}
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-primary">{formatKES(product.price)}</span>
            {product.compare && (
              <span className="text-lg text-muted-foreground line-through">{formatKES(product.compare)}</span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">
            Available at Milabi Global. Tap below to order via WhatsApp — we will confirm availability, total, and delivery to your area.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Quantity</span>
            <div className="inline-flex items-center rounded-full border border-input">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 inline-flex items-center justify-center hover:bg-muted rounded-l-full">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 inline-flex items-center justify-center hover:bg-muted rounded-r-full">
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <a
            href={productOrderUrl({ name: product.name, price: product.price, slug: product.slug, quantity: qty })}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] px-8 py-4 text-base font-semibold text-white hover:opacity-90 shadow-md"
          >
            <MessageCircle className="h-5 w-5" /> Order on WhatsApp
          </a>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="h-5 w-5 text-primary" />
              <span>Nationwide delivery across Kenya</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <span>Quality guaranteed — pay on delivery available</span>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {related.map((p: typeof products[number]) => <ProductCard key={p.slug} p={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}