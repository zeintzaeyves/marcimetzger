import { phone } from "@/lib/site";

export const contactSection = {
  title: "Let's Plan Your Next Move",
  description:
    "Whether inquiring about a specific listing, requesting a market analysis, or seeking neighborhood orientation, Marci and the team respond promptly.",
  formTitle: "Send a Message",
  formIntro: "Please share your goals below. Every conversation is held in strict confidence with no obligation.",
};

export const inquiryTypes = [
  "Looking to Buy",
  "Planning to Sell",
  "Relocation to Pahrump",
  "General Market Concern",
] as const;
export type InquiryType = (typeof inquiryTypes)[number];

// Office details exactly as supplied in the brief.
export const office = {
  label: "Physical Office",
  name: "The Ridge Realty Group",
  addressLine1: "3190 HW-160, Suite F",
  addressLine2: "Pahrump, Nevada 89048, United States",
  phoneDisplay: "(206) 919-6886",
  phoneHref: phone.href,
  hours: "Open Daily: 8:00 AM – 7:00 PM",
};

// No API key needed: both URLs just search the address text, so Google resolves it itself.
// The exact pin depends on how Google geocodes "3190 HW-160" (not verified here).
const mapQuery = encodeURIComponent(`${office.addressLine1}, ${office.addressLine2}`);
export const mapEmbedUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

export type Inquiry = {
  inquiry: InquiryType;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type SubmitResult = { status: "sent" } | { status: "not-connected" };

/**
 * FRONTEND-ONLY DEMO. No email service or backend is configured in this project,
 * so nothing is delivered and this always reports "not-connected" (the UI says so plainly).
 *
 * To connect a real service, replace the body with a call to a server-side endpoint
 * (a Next.js Server Action or route handler that holds the API key in a server-only env var),
 * and return { status: "sent" } only when that service confirms delivery. Never put keys in client code.
 */
export async function submitInquiry(inquiry: Inquiry): Promise<SubmitResult> {
  void inquiry;
  await new Promise((resolve) => setTimeout(resolve, 700)); // lets the loading state show
  return { status: "not-connected" };
}
