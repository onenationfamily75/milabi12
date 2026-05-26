import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, Search, X, MessageCircle } from "lucide-react";
import { WHATSAPP_DISPLAY, generalInquiryUrl } from "@/lib/whatsapp";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/categories", label: "Categories" },
  { to: "/search", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="hidden md:flex items-center justify-center gap-6 bg-primary px-4 py-2 text-xs text-primary-foreground">
        <a href={generalInquiryUrl()} className="inline-flex items-center gap-1.5 hover:underline">
          <MessageCircle className="h-3.5 w-3.5" /> {WHATSAPP_DISPLAY}
        </a>
        <span className="opacity-70">·</span>
        <span>Order any product directly on WhatsApp</span>
      </div>
      <div className="container mx-auto flex items-center gap-3 px-4 py-3 md:py-4">
        <button
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-muted"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">M</span>
          <span className="hidden sm:inline">Milabi <span className="text-primary">Global</span></span>
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = `/search?q=${encodeURIComponent(q)}`;
          }}
          className="hidden md:flex flex-1 max-w-xl mx-auto relative"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full h-11 rounded-full border border-input bg-background pl-5 pr-12 text-sm outline-none focus:border-primary"
          />
          <button className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center">
            <Search className="h-4 w-4" />
          </button>
        </form>
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <a
          href={generalInquiryUrl()}
          target="_blank"
          rel="noreferrer"
          className="ml-auto md:ml-0 inline-flex items-center gap-2 rounded-full bg-[oklch(0.65_0.18_150)] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `/search?q=${encodeURIComponent(q)}`;
              }}
              className="relative"
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="w-full h-11 rounded-full border border-input bg-background pl-5 pr-12 text-sm outline-none focus:border-primary"
              />
              <button className="absolute right-1 top-1 h-9 w-9 rounded-full bg-primary text-primary-foreground inline-flex items-center justify-center">
                <Search className="h-4 w-4" />
              </button>
            </form>
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}