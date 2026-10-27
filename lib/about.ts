export type SocialLink = {
  id: "instagram" | "facebook" | "linkedin" | "yelp";
  label: string;
  /** Leave null until the profile URL is verified: the icon is hidden while it is null. */
  href: string | null;
};

export const about = {
  title: "Meet Marci Metzger",
  subtitle: "Realtor for Nearly Three Decades",
  // Wording from the Figma design / client brief.
  paragraphs: [
    "Marci was a REALTOR, then licensed Broker, in Washington State. Now, she is enjoying the sunshine, and helping clients in Southern Nevada. Having helped buyers and sellers in many markets since 1995, she is a wealth of knowledge.",
    "In Her Words ‘I love that small-town feeling that our community offers. Spectacular golf courses, parks, pool, and easy access to Las Vegas make Pahrump a great place to call home. Working or retired, fast-paced or looking to relax... there's a place for you here! I enjoy living in the Mountain Falls community and will strive to find you a home that will suit you just as this community does me.’",
  ],
  portrait: {
    src: "/marci.jpeg",
    alt: "Marci Metzger smiling in a navy blue blazer against a gray studio backdrop",
    width: 730,
    height: 730,
  },
};

// Order matches the Figma design.
// Facebook: page title confirmed as "Marci Metzger - The Ridge Realty Group | Pahrump NV".
// Instagram / LinkedIn / Yelp: URLs come from a Marci Metzger page that could not be cross-checked
// (these sites block automated checks). Please confirm them with Marci before launch.
export const socialLinks: SocialLink[] = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/marciandlauren_nvrealtors/" },
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com/MarciHomes/" },
  { id: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/marci-metzger-30642496/" },
  { id: "yelp", label: "Yelp", href: "https://www.yelp.com/biz/marci-metzger-the-ridge-realty-pahrump" },
];
