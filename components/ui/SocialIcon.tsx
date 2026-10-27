import type { SocialLink } from "@/lib/about";

// Simple filled-square icons drawn inline (no icon library is installed).
// currentColor = the square, the glyph is cut out in the page background colour.
const glyphs: Record<SocialLink["id"], React.ReactNode> = {
  instagram: (
    <g className="fill-none stroke-parchment stroke-[1.7]">
      <rect x="6" y="6" width="12" height="12" rx="3.5" />
      <circle cx="12" cy="12" r="2.9" />
      <circle cx="15.6" cy="8.4" r="0.6" className="fill-parchment" />
    </g>
  ),
  facebook: (
    <path
      className="fill-parchment"
      d="M13.2 21v-7.3h2.4l.4-2.8h-2.8V9.2c0-.8.3-1.4 1.4-1.4H16V5.3c-.3 0-1.1-.1-2-.1-2.1 0-3.5 1.3-3.5 3.6v2.1H8.2v2.8h2.3V21h2.7z"
    />
  ),
  linkedin: (
    <g className="fill-parchment">
      <rect x="5.8" y="9.6" width="2.6" height="8.4" />
      <circle cx="7.1" cy="6.9" r="1.5" />
      <path d="M10.6 9.6h2.5v1.2c.5-.9 1.4-1.4 2.6-1.4 2.2 0 2.9 1.4 2.9 3.5V18h-2.6v-4.4c0-1-.3-1.7-1.3-1.7-1 0-1.5.7-1.5 1.8V18h-2.6z" />
    </g>
  ),
  // Simplified burst mark (five petals); swap in the official Yelp SVG if exact branding is needed.
  yelp: (
    <g className="fill-parchment">
      {[-10, 62, 134, 206, 278].map((angle) => (
        <ellipse key={angle} cx="12" cy="7.6" rx="1.7" ry="3.6" transform={`rotate(${angle} 12 12)`} />
      ))}
    </g>
  ),
};

export function SocialIcon({ id }: { id: SocialLink["id"] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-8">
      <rect x="1" y="1" width="22" height="22" rx="5" fill="currentColor" />
      {glyphs[id]}
    </svg>
  );
}
