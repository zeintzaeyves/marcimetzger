import { contactSection, directionsUrl, mapEmbedUrl, office } from "@/lib/contact";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ui/ContactForm";
import { Reveal } from "@/components/ui/Reveal";

const iconClasses = "mt-1 size-4 shrink-0 fill-current text-ink";

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={iconClasses}>
      <path d="M8 .5a5 5 0 0 0-5 5c0 3.6 4.1 9.2 4.6 9.8a.5.5 0 0 0 .8 0C8.9 14.700 13 9.100 13 5.500a5 5 0 0 0-5-5zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={iconClasses}>
      <path d="M3.6 1.5c.3-.3.8-.3 1.100 0l1.600 2.100c.2.300.2.700 0 1l-.9 1.100a8 8 0 0 0 3.800 3.800l1.100-.9c.3-.2.7-.2 1 0l2.100 1.600c.3.300.3.800 0 1.100l-1 1c-.7.700-1.800.900-2.700.500A13 13 0 0 1 2.100 5.200c-.4-.9-.2-2 .5-2.700z" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={iconClasses}>
      <path d="M8 .5a7.500 7.500 0 1 0 0 15 7.500 7.500 0 0 0 0-15zm.5 3.500v4l2.800 1.700-.6 1L7.500 8.700V4z" />
    </svg>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-blush py-16 lg:py-24">
      <Container size="wide">
        <Reveal>
        <header className="text-center">
          <h2 id="contact-title" className="font-display text-4xl text-ink sm:text-5xl">
            {contactSection.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-ink-soft sm:text-lg">{contactSection.description}</p>
        </header>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
          <Reveal>
          <div>
            <h3 className="font-display text-3xl text-ink">{contactSection.formTitle}</h3>
            <p className="mb-8 mt-3 max-w-md text-base text-ink-soft">{contactSection.formIntro}</p>
            <ContactForm />
          </div>
          </Reveal>

          <Reveal delay={120}>
          <div className="space-y-8">
            <div className="rounded-xl bg-cream p-6 sm:p-8">
              <p className="text-base text-ink-soft">{office.label}</p>
              <h3 className="mt-1 font-display text-2xl text-ink">{office.name}</h3>

              <ul className="mt-6 space-y-5">
                <li className="flex gap-3">
                  <PinIcon />
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get directions to ${office.addressLine1}, ${office.addressLine2} (opens Google Maps in a new tab)`}
                    className="text-ink hover:underline"
                  >
                    <span className="block text-lg">{office.addressLine1}</span>
                    <span className="block text-sm text-ink-soft">{office.addressLine2}</span>
                  </a>
                </li>
                <li className="flex gap-3">
                  <PhoneIcon />
                  <div>
                    <p className="text-lg text-ink">Direct Line</p>
                    <a href={office.phoneHref} className="text-sm text-ink-soft underline underline-offset-2 hover:text-ink">
                      {office.phoneDisplay}
                    </a>
                  </div>
                </li>
                <li className="flex gap-3">
                  <ClockIcon />
                  <div>
                    <p className="text-lg text-ink">Office Hours</p>
                    <p className="text-sm text-ink-soft">{office.hours}</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="relative h-72 overflow-hidden rounded-xl bg-cream-deep sm:h-80 lg:h-96">
              <iframe
                src={mapEmbedUrl}
                title={`Map showing ${office.name} at ${office.addressLine1}, ${office.addressLine2}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="size-full border-0"
              />
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 left-4 right-4 flex w-fit max-w-[calc(100%-2rem)] items-center gap-2 rounded-lg bg-paper px-4 py-2.5 text-sm font-medium text-ink shadow-md hover:underline"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4 shrink-0 fill-none stroke-current stroke-[1.4]">
                  <path d="M8 1.500 14.500 8 8 14.500 1.500 8zM5.500 8.500V7a1 1 0 0 1 1-1h3.500m0 0L8.700 4.700M10 6l-1.300 1.300" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="truncate">Get directions: {office.addressLine1}, Pahrump</span>
              </a>
            </div>
          </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
