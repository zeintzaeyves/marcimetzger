import Image from "next/image";

type AvatarProps = {
  name: string;
  photo?: { src: string; alt: string };
};

// Circular headshot with a subtle border. Falls back to initials when there is no photo yet.
export function Avatar({ name, photo }: AvatarProps) {
  const base = "size-12 shrink-0 rounded-full border border-line";

  if (photo) {
    return (
      <Image
        src={photo.src}
        alt={photo.alt}
        width={96}
        height={96}
        sizes="48px"
        className={`${base} object-cover object-top`}
      />
    );
  }

  const initials = name
    .replace(/[^A-Za-z ]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("");

  return (
    <span
      aria-hidden="true"
      className={`${base} flex items-center justify-center bg-cream-deep font-serif text-lg text-taupe-dark`}
    >
      {initials}
    </span>
  );
}
