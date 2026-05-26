import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Product } from "@/data/catalog";
import { formatKES, productOrderUrl } from "@/lib/whatsapp";

export function ProductCard({ p }: { p: Product }) {
  const discount = p.compare && p.price ? Math.round(((p.compare - p.price) / p.compare) * 100) : 0;
  return (
    <div className="group rounded-xl border border-border bg-card overflow-hidden flex flex-col hover:shadow-lg transition-shadow">
      <Link to="/products/$slug" params={{ slug: p.slug }} className="relative block aspect-square overflow-hidden bg-muted">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-[oklch(0.6_0.22_25)] px-2 py-1 text-[10px] font-bold text-white">
            {discount}% OFF
          </span>
        )}
      </Link>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <Link
          to="/products/$slug"
          params={{ slug: p.slug }}
          className="text-sm font-medium line-clamp-2 hover:text-primary min-h-[2.5rem]"
        >
          {p.name}
        </Link>
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-primary">{formatKES(p.price)}</span>
          {p.compare && (
            <span className="text-xs text-muted-foreground line-through">{formatKES(p.compare)}</span>
          )}
        </div>
        <a
          href={productOrderUrl({ name: p.name, price: p.price, slug: p.slug })}
          target="_blank"
          rel="noreferrer"
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] px-3 py-2 text-xs font-semibold text-white hover:opacity-90"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Order on WhatsApp
        </a>
      </div>
    </div>
  );
}