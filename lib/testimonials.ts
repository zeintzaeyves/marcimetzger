export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string; // e.g. "Home Seller · Pahrump, NV"
  /** Optional portrait (public/ path). Without it the card shows a matching initials avatar. */
  photo?: { src: string; alt: string };
};

export const testimonialsSection = {
  title: "Why Clients Trust Marci Metzger Homes",
  description:
    "Hear from buyers and sellers who trusted Marci Metzger to guide them through one of life's biggest decisions.",
};

/**
 * MOCKUP ONLY: these three reviews are fictional placeholders written for the design.
 * Set to false (and replace the entries below with real, permitted client reviews) before launch;
 * the "placeholder" notice in the section disappears with it.
 */
export const testimonialsArePlaceholders = true;

export const testimonials: Testimonial[] = [
  {
    id: "jennifer-m",
    quote:
      "We listed our house in the spring and I was nervous about all of it, from pricing to showings. Marci walked us through each step, answered my texts quickly, and was honest when I needed to adjust my expectations. The sale closed without any last-minute drama, which is more than I had hoped for.",
    name: "Jennifer M.",
    role: "Home Seller · Pahrump, NV",
  },
  {
    id: "david-r",
    quote:
      "I had been looking on my own for months before I called Marci. She narrowed the search to homes that actually fit my budget and pointed out things I would have missed at showings, like the age of the roof. I never felt rushed, and she was easy to reach whenever a question came up.",
    name: "David R.",
    role: "Home Buyer · Pahrump, NV",
  },
  {
    id: "amanda-l",
    quote:
      "We were buying from out of town, so I relied on Marci to be our eyes on the ground. She sent detailed notes after every visit and was upfront about what each house would need. When our first offer fell through, she kept us calm and we found the right place a few weeks later.",
    name: "Amanda L.",
    role: "Home Buyer · Nye County, NV",
  },
];
