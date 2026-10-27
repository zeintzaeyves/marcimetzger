export const siteName = "Marci Metzger Homes";

export type NavLink = {
  label: string;
  href: string;
};

// "Home" goes to the top of the page; the others are anchors to sections built in later phases.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Listings", href: "#featured-listings" },
  { label: "Let’s Move", href: "#lets-move" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const headerCta: NavLink = { label: "Schedule Consultation", href: "#contact" };

// Shown in the About section (matches the Figma design; also listed on the public Marci Metzger pages).
export const phone = { display: "206-919-6886", href: "tel:+12069196886" };
