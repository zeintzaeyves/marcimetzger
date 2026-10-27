import Image from "next/image";
import type { Listing } from "@/lib/listings";

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? "" : "s"}`;

function getDetails({ beds, baths, sqft }: Listing) {
  const parts = [
    beds !== undefined && plural(beds, "bed"),
    baths !== undefined && plural(baths, "bath"),
    sqft !== undefined && `${sqft.toLocaleString("en-US")} sq ft`,
  ].filter(Boolean);
  return parts.length ? parts.join(" · ") : null;
}

// Presentation only: all text comes from the Listing object; missing fields are simply left out.
// Not a link: there are no listing-detail pages yet.
export function ListingCard({ listing, priority = false }: { listing: Listing; priority?: boolean }) {
  const { image, address, price } = listing;
  const details = getDetails(listing);

  return (
    <article className="group">
      <div className="relative aspect-[7/5] overflow-hidden rounded-2xl bg-cream-deep shadow-none shadow-ink/15 transition-shadow duration-300 ease-out group-hover:shadow-lg">
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw"
          loading={priority ? "eager" : "lazy"}
          className="size-full object-cover"
        />
      </div>
      {address && <h3 className="mt-5 font-sans text-lg font-normal text-ink">{address}</h3>}
      {details && <p className="mt-1.5 text-sm text-ink-soft">{details}</p>}
      {price !== undefined && (
        <p className="mt-3 font-serif text-2xl text-ink">${price.toLocaleString("en-US")}</p>
      )}
    </article>
  );
}
