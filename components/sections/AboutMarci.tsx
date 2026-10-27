import Image from "next/image";
import { about, socialLinks } from "@/lib/about";
import { phone } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/SocialIcon";

export function AboutMarci() {
  const socials = socialLinks.filter((link) => link.href);

  return (
    <section id="about" aria-labelledby="about-title" className="bg-parchment py-16 lg:py-24">
      <Container size="wide" className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-10 lg:gap-24">
        <div className="max-w-[34rem]">
          <h2 id="about-title" className="font-display text-4xl text-ink sm:text-5xl">
            {about.title}
          </h2>
          <p className="mt-3 text-lg text-ink-soft">{about.subtitle}</p>

          <div className="mt-6 space-y-6 text-base leading-relaxed text-ink lg:text-lg">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#contact" variant="dark">
              Get in touch with Marci Metzger
            </ButtonLink>
            <a href={phone.href} className={buttonClasses("outline")}>
              {phone.display}
            </a>
          </div>

          {socials.length > 0 && (
            <div className="mt-8">
              <p className="text-sm text-ink-soft">Let’s Connect</p>
              <ul className="mt-3 flex items-center gap-3">
                {socials.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href!}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Marci Metzger on ${link.label} (opens in a new tab)`}
                      className="block text-black transition-opacity hover:opacity-70"
                    >
                      <SocialIcon id={link.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-cream-deep md:max-w-none">
          <Image
            src={about.portrait.src}
            alt={about.portrait.alt}
            width={about.portrait.width}
            height={about.portrait.height}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="size-full object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
