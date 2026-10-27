import { testimonials, testimonialsArePlaceholders, testimonialsSection } from "@/lib/testimonials";
import { Container } from "@/components/ui/Container";
import { TestimonialCarousel } from "@/components/ui/TestimonialCarousel";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="scroll-mt-12 pb-16 pt-4 lg:pb-24">
      <Container size="wide">
        <Reveal>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <h2 id="testimonials-title" className="font-display text-3xl text-ink sm:text-4xl">
            {testimonialsSection.title}
          </h2>
          <div className="max-w-md text-base text-ink lg:pt-2">
            <p>{testimonialsSection.description}</p>
            {testimonialsArePlaceholders && (
              <p className="mt-3 text-xs uppercase tracking-[0.08em] text-taupe-dark">
                Mockup only: placeholder testimonials, not real client reviews
              </p>
            )}
          </div>
        </div>

        </Reveal>

        <div className="mt-10 lg:mt-12">
          <Reveal delay={100}>
            <TestimonialCarousel items={testimonials} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
