import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Mail, MapPin, Clock } from "lucide-react";
import { WHATSAPP_DISPLAY, generalInquiryUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Milabi Global" },
      { name: "description", content: "Reach Milabi Global on WhatsApp for orders, questions, and delivery info." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">Get in touch</h1>
      <p className="text-lg text-muted-foreground mb-10">We answer fastest on WhatsApp. Tap below and tell us what you are after.</p>
      <a href={generalInquiryUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-[oklch(0.65_0.18_150)] px-7 py-4 text-base font-semibold text-white hover:opacity-90 shadow-md mb-12">
        <MessageCircle className="h-5 w-5" /> Message us on WhatsApp
      </a>
      <div className="grid sm:grid-cols-2 gap-6">
        <Card icon={<MessageCircle />} title="WhatsApp" lines={[WHATSAPP_DISPLAY, "Orders & inquiries"]} />
        <Card icon={<Mail />} title="Email" lines={["orders@milabiglobal.com"]} />
        <Card icon={<MapPin />} title="Location" lines={["Nairobi, Kenya", "Nationwide delivery"]} />
        <Card icon={<Clock />} title="Hours" lines={["Mon – Sat: 8am – 8pm", "Sun: 10am – 6pm"]} />
      </div>
    </div>
  );
}

function Card({ icon, title, lines }: { icon: React.ReactNode; title: string; lines: string[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">{icon}</div>
      <div className="font-semibold mb-1">{title}</div>
      {lines.map((l, i) => <div key={i} className="text-sm text-muted-foreground">{l}</div>)}
    </div>
  );
}