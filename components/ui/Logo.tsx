import Image from "next/image";
import Link from "next/link";
import { siteName } from "@/lib/site";

// public/logo.png is white-on-transparent (720x196), so only use it on dark backgrounds.
// width/height give Next the real aspect ratio; h-auto keeps it when the width class changes.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${siteName}, home`} className="inline-block focus-visible:outline-paper">
      <Image
        src="/logo.png"
        alt={siteName}
        width={720}
        height={196}
        preload
        sizes="(min-width: 1024px) 208px, 176px"
        className={`h-auto ${className}`}
      />
    </Link>
  );
}
