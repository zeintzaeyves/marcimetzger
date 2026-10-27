import Link from "next/link";
import { headerCta, navLinks } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { MobileNav } from "./MobileNav";

// Sits on top of the hero image (absolute), so text is light.
// Desktop: logo left, nav centered, CTA right. Mobile: logo left, menu button right.
export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <Container size="wide" className="flex h-24 items-center justify-between lg:grid lg:h-36 lg:grid-cols-[1fr_auto_1fr]">
        <Logo className="w-44 lg:w-52" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-12">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-base text-paper/90 transition-colors duration-300 hover:text-paper focus-visible:outline-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden justify-self-end lg:block">
          <ButtonLink href={headerCta.href}>{headerCta.label}</ButtonLink>
        </div>

        <MobileNav links={navLinks} cta={headerCta} />
      </Container>
    </header>
  );
}
