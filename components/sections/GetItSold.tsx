import Image from "next/image";
import { letsMove } from "@/lib/lets-move";
import { AffiliationMarquee } from "@/components/ui/AffiliationMarquee";
import { Container } from "@/components/ui/Container";

// Anchor target for the "Let's Move" nav link.
export function GetItSold() {
  const { title, subtitle, feature, messages } = letsMove;

  return (
    <section id="lets-move" aria-labelledby="lets-move-title" className="py-16 lg:py-24">
      <Container size="wide">
        <header className="text-center">
          <h2 id="lets-move-title" className="font-display text-4xl text-ink sm:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-sm text-ink-soft sm:text-base">{subtitle}</p>
        </header>

        <div className="mt-12 grid items-center gap-10 md:grid-cols-2 md:gap-10 lg:mt-16 lg:gap-16">
          <div>
            <h3 className="font-display text-2xl text-ink sm:text-3xl">{feature.title}</h3>
            <div className="mt-6 max-w-xl space-y-5 text-base leading-relaxed text-ink-soft">
              {feature.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          {/* Natural 2:1 image, shown at its own aspect ratio (no cropping) */}
          <Image
            src={feature.image.src}
            alt={feature.image.alt}
            width={feature.image.width}
            height={feature.image.height}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="h-auto w-full"
          />
        </div>

        <hr className="my-12 border-ink-soft/40 lg:my-16" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          {messages.map((message) => (
            <div key={message.title} className="text-center">
              <h3 className="mx-auto max-w-md font-display text-2xl text-ink sm:text-3xl">{message.title}</h3>
              <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">{message.body}</p>
            </div>
          ))}
        </div>

        <AffiliationMarquee />
      </Container>
    </section>
  );
}
