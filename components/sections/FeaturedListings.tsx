import Link from "next/link";
import { allListingsHref, featuredListings } from "@/lib/listings";
import { Container } from "@/components/ui/Container";
import { ListingCard } from "@/components/ui/ListingCard";
import { Reveal } from "@/components/ui/Reveal";

const linkClasses = "inline-flex items-center gap-1.5 text-base";

export function FeaturedListings() {
  return (
    <section id="featured-listings" aria-labelledby="listings-title" className="scroll-mt-16 pb-20 lg:pb-28">
      <Container size="wide">
        <Reveal>
        <h2 id="listings-title" className="font-display text-4xl text-ink sm:text-5xl">
          Featured Listings
        </h2>

        {allListingsHref ? (
          <Link
            href={allListingsHref}
            className={`${linkClasses} mt-3 text-ink-soft underline underline-offset-4 hover:text-ink`}
          >
            Explore all listings
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-[1.5]">
              <path d="m7 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <p className={`${linkClasses} mt-3 text-ink-soft`}>Full listings page coming soon</p>
        )}
        </Reveal>

        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing, index) => (
            <li key={listing.id}>
              <Reveal delay={index * 100}>
                <ListingCard listing={listing} priority={index === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
