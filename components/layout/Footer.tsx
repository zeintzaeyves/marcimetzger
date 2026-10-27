import Image from "next/image";
import Link from "next/link";
import { footerContent } from "@/lib/footer";
import { siteName } from "@/lib/site";
import { Container } from "@/components/ui/Container";

const headingClasses = "font-display text-2xl text-ink";
const linkClasses = "text-ink underline-offset-4 transition-colors duration-300 hover:text-taupe-dark hover:underline";

export function Footer() {
  const { tagline, quickLinks, contact, copyright } = footerContent;

  return (
    <footer className="pt-16 lg:pt-20">
      <Container size="wide">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1.4fr] lg:grid-cols-[2.4fr_1fr_2fr] lg:gap-16">
          <div>
            <Link href="/" aria-label={`${siteName}, home`} className="inline-block">
              {/* Same file as the header logo (white on transparent); brightness-0 renders it black on cream */}
              <Image
                src="/logo.png"
                alt={siteName}
                width={720}
                height={196}
                sizes="(min-width: 1024px) 448px, 80vw"
                className="h-auto w-full max-w-sm brightness-0 lg:max-w-md"
              />
            </Link>
            <p className="mt-6 max-w-sm text-lg leading-snug text-ink">{tagline}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className={headingClasses}>Quick Links</h2>
            <ul className="mt-5 space-y-3.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClasses}>Get In Touch</h2>
            <ul className="mt-5 space-y-3.5 text-ink">
              <li>
                <a href={contact.phoneHref} className="underline underline-offset-4">
                  {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`} className="break-all underline underline-offset-4">
                  {contact.email}
                </a>
              </li>
              <li>{contact.location}</li>
              <li>
                {contact.hours}
                <span className="block text-ink-soft">{contact.hoursNote}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-brown/60 py-6 text-center text-sm text-ink-soft lg:mt-20">
          <p>{copyright}</p>
        </div>
      </Container>
    </footer>
  );
}
