import { Link } from "@tanstack/react-router";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { WHATSAPP_DISPLAY, generalInquiryUrl } from "@/lib/whatsapp";
import { categories } from "@/data/catalog";

export function Footer() {
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);
  const featured = categories.slice(0, 8);
  return (
    <footer className="mt-16 border-t border-border bg-muted/40">
      <div className="container mx-auto px-4 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 font-bold text-lg">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">M</span>
            Milabi <span className="text-primary">Global</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Curated baby gear, home essentials, beauty and lifestyle. Order easily on WhatsApp — no checkout, no fuss.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Shop</h4>
          <ul className="space-y-2 text-sm">
            {featured.map((c) => (
              <li key={c.slug}>
                <Link to="/categories/$slug" params={{ slug: c.slug }} className="text-muted-foreground hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-muted-foreground hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            <li><Link to="/categories" className="text-muted-foreground hover:text-primary">All Categories</Link></li>
            <li><Link to="/search" className="text-muted-foreground hover:text-primary">All Products</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">Order &amp; Support</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href={generalInquiryUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary">
                <MessageCircle className="h-4 w-4" /> {WHATSAPP_DISPLAY}
              </a>
            </li>
            <li className="inline-flex items-center gap-2 text-muted-foreground" suppressHydrationWarning><Mail className="h-4 w-4" /> <span suppressHydrationWarning>orders@milabiglobal.com</span></li>
            <li className="inline-flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" /> Nairobi, Kenya</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {year} Milabi Global. All rights reserved.
      </div>
    </footer>
  );
}