import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  /** "wide" is used by the header and hero card to match the Figma margins. */
  size?: "default" | "wide";
};

const sizes = {
  default: "max-w-7xl",
  wide: "max-w-[96rem]",
};

// Shared page width + side padding so every section lines up.
export function Container({ size = "default", className = "", ...props }: ContainerProps) {
  return (
    <div className={`mx-auto w-full ${sizes[size]} px-5 sm:px-8 lg:px-12 ${className}`} {...props} />
  );
}
