import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SearchPanel } from "@/components/ui/SearchPanel";

// Centered hero copy over the photo, with the search card overlapping the bottom edge.
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative pb-16 lg:pb-24">
      <div className="relative isolate flex min-h-[40rem] items-center justify-center overflow-hidden bg-night pb-44 pt-32 lg:min-h-[43rem] lg:pt-36">
        <Image
          src="/hero-image.jpg"
          alt="Homes in front of a mountain at golden hour"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover object-[center_40%]"
        />
        {/* Muted dark overlay, a bit darker at the top where the header sits */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-night/65 via-night/50 to-night/60" />

        <Container className="text-center">
          <p className="font-serif text-base uppercase tracking-[0.04em] text-paper/70 sm:text-lg lg:text-xl">
            Marci Metzger&nbsp;&nbsp;—&nbsp;&nbsp;Your Trusted Real Estate Partner
          </p>
          <h1
            id="hero-title"
            className="mx-auto mt-4 max-w-3xl font-sans text-4xl font-light text-paper sm:text-5xl lg:text-6xl"
          >
            Where Your Next Move Feels Like Home.
          </h1>
          <p className="mt-6 text-sm text-paper/75 sm:text-base">
            Personalized real estate guidance in Pahrump, Nevada.
          </p>
          <div className="mt-6">
            <ButtonLink href="#featured-listings">Explore Properties</ButtonLink>
          </div>
        </Container>
      </div>

      {/* Negative margin pulls the card up over the hero's bottom edge */}
      <Container size="wide" className="relative z-10 -mt-28">
        <SearchPanel />
      </Container>
    </section>
  );
}
