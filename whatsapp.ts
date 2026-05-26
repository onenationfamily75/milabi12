export const WHATSAPP_NUMBER = "254100067153";
export const WHATSAPP_DISPLAY = "+254 100 067153";

export function formatKES(amount: number | null | undefined): string {
  if (amount == null) return "Contact for price";
  return `KES ${amount.toLocaleString("en-KE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function productOrderUrl(opts: {
  name: string;
  price: number | null;
  slug: string;
  quantity?: number;
  origin?: string;
}): string {
  const qty = opts.quantity ?? 1;
  const origin = opts.origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  const link = `${origin}/products/${opts.slug}`;
  const msg = [
    "Hello, I want to order:",
    `Product: ${opts.name}`,
    `Quantity: ${qty}`,
    `Price: ${formatKES(opts.price)}`,
    `Link: ${link}`,
  ].join("\n");
  return buildWhatsAppUrl(msg);
}

export function generalInquiryUrl(message = "Hello Milabi Global, I'd like to make an inquiry."): string {
  return buildWhatsAppUrl(message);
}