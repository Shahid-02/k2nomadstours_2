/**
 * Route helpers.
 *
 * Tour routes are stored as the full there-and-back sequence, e.g.
 * `[Islamabad, Skardu, Askole, Baltoro Glacier, Concordia, K2 Base Camp,
 *   Askole, Skardu, Islamabad]`.
 *
 * Drawing all nine nodes reads as a stutter rather than a journey, so we fold
 * the mirrored tail back onto the outbound leg and label the shape instead.
 */
export interface OutboundRoute {
  /** The outbound leg, far point last. */
  nodes: string[];
  /** True when the itinerary finishes where it began. */
  returnsToStart: boolean;
  /** First waypoint — where a traveler actually meets the team. */
  start: string;
  /**
   * Last waypoint on the outbound leg.
   *
   * On an out-and-back this is genuinely the furthest point (K2 Base Camp on
   * the Baltoro route). On a traverse it is simply where the outbound leg ends
   * before the drive home. It is never described as a summit or a high point,
   * because for several routes it is neither.
   */
  farPoint: string;
}

export function getOutboundRoute(route: string[]): OutboundRoute {
  if (route.length === 0) {
    return { nodes: [], returnsToStart: false, start: "", farPoint: "" };
  }

  let i = 0;
  let j = route.length - 1;
  let mirrored = 0;
  while (i < j && route[i] === route[j]) {
    mirrored += 1;
    i += 1;
    j -= 1;
  }

  const nodes = mirrored > 0 ? route.slice(0, route.length - mirrored) : route;
  return {
    nodes,
    returnsToStart: mirrored > 0,
    start: nodes[0] ?? route[0],
    farPoint: nodes[nodes.length - 1] ?? route[route.length - 1],
  };
}

/**
 * Collapse a long leg to `limit` nodes by dropping from the middle — the head
 * (where you start) and the tail (where you end up) carry the meaning.
 */
export function condenseRoute(nodes: string[], limit: number): {
  head: string[];
  hidden: number;
  tail: string[];
} {
  if (nodes.length <= limit) return { head: nodes, hidden: 0, tail: [] };
  const headCount = Math.ceil(limit / 2);
  const tailCount = limit - headCount;
  return {
    head: nodes.slice(0, headCount),
    hidden: nodes.length - limit,
    tail: tailCount > 0 ? nodes.slice(nodes.length - tailCount) : [],
  };
}

const NUM = "([0-9][0-9,]{2,6})";

/**
 * Highest camp on any route we run is Gondogoro La at 5,940 m. Anything above
 * this in itinerary copy is a mountain being looked at, not a place being slept
 * at — "four 8,000m peaks appear together" is the line that made the earlier
 * version of this plot Concordia at 8,000 metres.
 */
const MAX_CAMP_METRES = 6200;

/**
 * Pull a stated altitude out of itinerary copy.
 *
 * Ordered by confidence: an explicit "Altitude: 4,700m" beats "at 5,150m",
 * which beats a bare figure. Day 11 of the K2 route contains both a peak height
 * and a camp height in the same sentence, so first-match-wins is not safe here.
 */
export function extractAltitude(text: string): number | null {
  const patterns = [
    new RegExp(`altitude:?\\s*${NUM}\\s?m\\b`, "i"),
    new RegExp(`\\bat\\s+${NUM}\\s?m\\b`, "i"),
    new RegExp(`${NUM}\\s?m\\b`),
  ];
  const describesAPeak = new RegExp(`${NUM}\\s?m\\s+(peak|mountain|giant)`, "i");

  for (let i = 0; i < patterns.length; i += 1) {
    if (i === 2 && describesAPeak.test(text)) continue;
    const match = text.match(patterns[i]);
    if (!match) continue;
    const value = Number(match[1].replace(/,/g, ""));
    if (Number.isFinite(value) && value >= 800 && value <= MAX_CAMP_METRES) {
      return value;
    }
  }
  return null;
}
