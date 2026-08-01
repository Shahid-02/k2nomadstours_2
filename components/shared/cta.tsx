"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type ButtonProps = ComponentProps<typeof Button>;

/**
 * Primary call to action.
 *
 * Two things happen on hover: the whole control leans toward the cursor, and
 * the arrow exits stage right while a second arrow enters from the left. The
 * swap is short (300ms) and the label never moves, so the target stays where
 * the eye put it.
 */
export function Cta({
  href,
  children,
  external = false,
  variant = "default",
  size = "lg",
  magnetic = true,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  magnetic?: boolean;
} & Pick<ButtonProps, "variant" | "size" | "className">) {
  const anchor = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" />
  ) : (
    <Link href={href} />
  );

  const button = (
    <Button
      nativeButton={false}
      variant={variant}
      size={size}
      className={cn("group/cta", className)}
      render={anchor}
      {...rest}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="relative block size-4 overflow-hidden">
        <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-5">
          {external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
        </span>
        <span className="absolute inset-0 flex -translate-x-5 items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-0">
          {external ? <ArrowUpRight className="size-4" /> : <ArrowRight className="size-4" />}
        </span>
      </span>
    </Button>
  );

  return magnetic ? <Magnetic>{button}</Magnetic> : button;
}

/**
 * Tertiary action: a text link with a rule that wipes in from the origin.
 * Used where a filled button would compete with a nearby primary CTA.
 */
export function TextLink({
  href,
  children,
  external = false,
  className,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const content = (
    <>
      <span className="link-wipe">{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-x-1"
      />
    </>
  );

  const classes = cn(
    "group/link inline-flex items-center gap-2 font-mono text-label uppercase tracking-[0.18em]",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
