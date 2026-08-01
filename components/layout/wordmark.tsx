import { cn } from "@/lib/utils";

/**
 * The mark is K2's summit pyramid reduced to two strokes: the silhouette and
 * the Abruzzi Spur running down its south-east face — the ridge every route
 * on the mountain is measured against. The snow cap is the one filled shape,
 * which is also the only place the mark ever goes solid.
 */
export function PeakMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 26"
      fill="none"
      aria-hidden="true"
      className={cn("size-6", className)}
    >
      <path
        d="M15 1.6 28.2 24.4H1.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M15 1.6 20.4 24.4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M15 1.6 18.9 8.4h-7.8Z" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PeakMark className="size-6 shrink-0 lg:size-7" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-[-0.03em] lg:text-[1.1875rem]">
          K2 Nomads
        </span>
        <span className="mt-1 font-mono text-[0.6875rem] uppercase tracking-[0.28em] opacity-65">
          Karakoram
        </span>
      </span>
    </span>
  );
}
