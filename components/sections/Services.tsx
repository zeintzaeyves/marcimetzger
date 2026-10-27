import Image from "next/image";
import { services, servicesSection } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-16 lg:py-24">
      <Container size="wide">
        <Reveal>
        <header className="text-center">
          <h2 id="services-title" className="font-display text-4xl text-ink sm:text-5xl">
            {servicesSection.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-ink-soft sm:text-lg">
            {servicesSection.description}
          </p>
        </header>
        </Reveal>

        <ul className="mt-12 grid gap-x-8 gap-y-12 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {services.map((service, index) => (
            <li key={service.id}>
              <Reveal delay={index * 100}>
              <article>
                <div className="relative aspect-video overflow-hidden rounded-lg bg-cream-deep">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    style={{ objectPosition: service.image.position }}
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 font-display text-2xl text-ink">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{service.description}</p>
              </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
