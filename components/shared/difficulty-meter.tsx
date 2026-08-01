import { cn } from "@/lib/utils";
import { difficultyRank } from "@/lib/format";
import type { Difficulty } from "@/types/tour";

/**
 * Difficulty as five ticks rather than a word.
 *
 * "Challenging" and "Strenuous" read as synonyms in a list; five marks with
 * four filled does not. The word stays alongside — the meter is a second
 * channel, never the only one, so it works without colour vision too.
 */
export function DifficultyMeter({
  difficulty,
  showLabel = true,
  className,
}: {
  difficulty: Difficulty;
  showLabel?: boolean;
  className?: string;
}) {
  const rank = difficultyRank[difficulty] ?? 3;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-hidden="true"
        className="inline-flex items-end gap-[3px]"
        style={{ height: 12 }}
      >
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={cn(
              "w-[3px] rounded-[1px] transition-colors",
              step <= rank ? "bg-alpenglow" : "bg-current opacity-25"
            )}
            style={{ height: 4 + step * 1.6 }}
          />
        ))}
      </span>
      {showLabel && (
        <span className="font-mono text-micro uppercase tracking-[0.14em]">
          {difficulty}
        </span>
      )}
      <span className="sr-only">
        Difficulty {rank} of 5: {difficulty}
      </span>
    </span>
  );
}
