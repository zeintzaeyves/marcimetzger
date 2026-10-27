import Image from "next/image";
import { valleyBanner } from "@/lib/valley";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export function ValleyBanner() {
  const { eyebrow, titleLines, body, primary, secondary, image } = valleyBanner;

  return (
    <section
      id="valley"
      aria-labelledby="valley-title"
      className="relative isolate flex min-h-[36.875rem] items-center overflow-hidden bg-night py-20"
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      {/* Warm dark overlay, heavier on the left where the text sits */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-night/80 via-night/60 to-night/45"
      />

      <Container size="wide">
        <p className="text-base text-paper/75 sm:text-lg">{eyebrow}</p>
        <h2
          id="valley-title"
          className="mt-3 max-w-4xl font-display text-4xl leading-[1.1] text-paper sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {titleLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/90 sm:text-lg">{body}</p>
        <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
          <ButtonLink href={primary.href}>{primary.label}</ButtonLink>
          <ButtonLink href={secondary.href} variant="ghost-light">
            {secondary.label}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
