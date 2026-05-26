import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Milabi Global" },
      { name: "description", content: "Milabi Global curates baby gear, home essentials, and lifestyle products across Kenya." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">About Milabi Global</h1>
      <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
        <p>Milabi Global is a family-owned retailer based in Nairobi, curating quality baby gear, home essentials, beauty and lifestyle products for customers across Kenya.</p>
        <p>We believe shopping should be simple. That is why every order is placed directly on WhatsApp — no logins, no cart abandonment, no checkout friction.</p>
        <p>From car seats and strollers to chandeliers, perfumes and kitchenware — every item is hand-picked for quality and value.</p>
      </div>
    </div>
  );
}