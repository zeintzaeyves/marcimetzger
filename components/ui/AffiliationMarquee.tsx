import Image from "next/image";
import { affiliations } from "@/lib/lets-move";

// Each half of the track must be wider than the screen, so the 4 logos are repeated 3 times per half.
const half = [...affiliations, ...affiliations, ...affiliations];

function Logo({ logo, blend = false }: { logo: (typeof affiliations)[number]; blend?: boolean }) {
  return (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      sizes="96px"
      loading="eager"
      className={`h-16 w-auto sm:h-20 ${blend ? "mix-blend-multiply" : ""}`}
    />
  );
}

// Continuously scrolling logo strip (CSS only). Pauses on hover.
// Screen readers get one plain list; the animated copy is hidden from them.
// With "reduce motion" on, the animation is replaced by the static, wrapping row.
export function AffiliationMarquee() {
  return (
    <div className="mt-14 lg:mt-20">
      <ul
        aria-label="Professional affiliations"
        className="sr-only motion-reduce:not-sr-only motion-reduce:flex motion-reduce:flex-wrap motion-reduce:items-center motion-reduce:justify-center motion-reduce:gap-x-10 motion-reduce:gap-y-8"
      >
        {affiliations.map((logo) => (
          <li key={logo.name}>
            <Logo logo={logo} blend />
          </li>
        ))}
      </ul>

      {/* No mask / isolation on this wrapper: that would stop multiply from blending the logos' white
          backgrounds into the page. The edge fade is done with overlays instead. */}
      <div aria-hidden="true" className="relative overflow-hidden motion-reduce:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream to-transparent sm:w-24" />
        <div className="flex w-max animate-marquee items-center mix-blend-multiply hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {half.map((logo, index) => (
                <div key={`${logo.name}-${index}`} className="mr-14 shrink-0 sm:mr-20 lg:mr-24">
                  <Logo logo={logo} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
