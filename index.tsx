import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, ArrowRight, Truck, ShieldCheck, Headphones } from "lucide-react";
import { categories, products } from "@/data/catalog";
import { ProductCard } from "@/components/ProductCard";
import { generalInquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const featured = products.slice(0, 10);
  const perfumes = products.filter((p) => p.categories.includes("perfume")).slice(0, 8);
  const lights = products.filter((p) => p.categories.includes("lights")).slice(0, 8);
  const kitchen = products.filter((p) => p.categories.includes("kitchenware")).slice(0, 8);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/20">
        <div className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Order on WhatsApp · Delivery Kenya-wide
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Everyday gear for <span className="text-primary">growing families</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              From car seats and strollers to home essentials, beauty and lifestyle picks — curated by Milabi Global. Browse, then order in one tap on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Shop categories <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={generalInquiryUrl()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={products[0]?.image}
              alt="Featured product"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-border bg-muted/40">
        <div className="container mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <Perk icon={<Truck className="h-5 w-5" />} title="Nationwide delivery" desc="Fast dispatch across Kenya" />
          <Perk icon={<ShieldCheck className="h-5 w-5" />} title="Genuine products" desc="Quality you can trust" />
          <Perk icon={<Headphones className="h-5 w-5" />} title="WhatsApp support" desc="Real humans, fast replies" />
        </div>
      </section>

      {/* Categories */}
      <Section title="Shop popular categories" link="/categories" linkLabel="View all">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((c) => (
            <Link
              key={c.slug}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
              </div>
              <div className="p-2 text-center text-xs font-medium line-clamp-1">{c.name}</div>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Featured picks" link="/search" linkLabel="Shop all">
        <ProductGrid items={featured} />
      </Section>

      {perfumes.length > 0 && (
        <Section title="Perfumes" link="/categories/perfume" linkLabel="View all">
          <ProductGrid items={perfumes} />
        </Section>
      )}

      {lights.length > 0 && (
        <Section title="Chandeliers & lights" link="/categories/lights" linkLabel="View all">
          <ProductGrid items={lights} />
        </Section>
      )}

      {kitchen.length > 0 && (
        <Section title="Kitchenware" link="/categories/kitchenware" linkLabel="View all">
          <ProductGrid items={kitchen} />
        </Section>
      )}

      {/* CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to order?</h2>
          <p className="opacity-90 max-w-xl mx-auto mb-6">
            Skip the checkout. Send us a message on WhatsApp and we'll confirm your order, total, and delivery in minutes.
          </p>
          <a
            href={generalInquiryUrl()}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] px-7 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

function Section({ title, link, linkLabel, children }: { title: string; link: string; linkLabel: string; children: React.ReactNode }) {
  return (
    <section className="container mx-auto px-4 py-10 md:py-14">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
        <Link to={link} className="text-sm font-medium text-primary hover:underline">{linkLabel} →</Link>
      </div>
      {children}
    </section>
  );
}

function ProductGrid({ items }: { items: typeof products }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {items.map((p) => <ProductCard key={p.slug} p={p} />)}
    </div>
  );
}

function Perk({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</span>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-muted-foreground text-xs">{desc}</div>
      </div>
    </div>
  );
}
