"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronLeft, ChevronRight, Expand, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/shared/section-heading";
import { cn } from "@/lib/utils";
import type { TourImage, TourVideo } from "@/types/tour";

export type GalleryItem =
  | ({ type: "video" } & TourVideo)
  | ({ type: "image" } & TourImage);

const INITIAL_IMAGE_COUNT = 4;

/**
 * GALLERY.
 *
 * Unified single gallery section. Displays video items first, followed by
 * up to 4 images initially. Includes a "Show More Photos" button to expand
 * and show the remaining images. Lightbox provides full navigation across all items.
 */
export function Gallery({
  images,
  videos,
}: {
  images: TourImage[];
  videos?: TourVideo[];
}) {
  const [index, setIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Default video if none provided
  const activeVideos =
    videos && videos.length > 0
      ? videos
      : [{ src: "/video/hunza.mp4", title: "Hunza Expedition Footage" }];

  // Combine videos first, followed by all images for full Lightbox catalog
  const allItems: GalleryItem[] = [
    ...activeVideos.map((v) => ({ type: "video" as const, ...v })),
    ...images.map((img) => ({ type: "image" as const, ...img })),
  ];

  // Limit images displayed initially to first 4 unless showAll is true
  const visibleImages = showAll ? images : images.slice(0, INITIAL_IMAGE_COUNT);

  const visibleItems: GalleryItem[] = [
    ...activeVideos.map((v) => ({ type: "video" as const, ...v })),
    ...visibleImages.map((img) => ({ type: "image" as const, ...img })),
  ];

  if (allItems.length === 0) return null;

  const [lead, ...rest] = visibleItems;

  return (
    <section id="gallery" className="dark scroll-mt-32 bg-granite-950 py-section text-snow-50">
      <div className="shell">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <Eyebrow className="text-snow-50/55">From the route</Eyebrow>
            <p className="font-mono text-micro uppercase tracking-[0.18em] text-snow-50/60">
              {String(allItems.length).padStart(2, "0")} frames
            </p>
          </div>
        </Reveal>

        <div className="mt-9 grid gap-4">
          <Reveal duration={0.9}>
            <GalleryFrame
              item={lead}
              onOpen={() => setIndex(0)}
              className="aspect-[16/9] lg:aspect-[21/9]"
              sizes="(min-width: 1024px) 84vw, 100vw"
            />
          </Reveal>

          {rest.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {rest.map((item, i) => {
                const globalIndex = allItems.indexOf(item);
                return (
                  <Reveal key={(item.src) + i} delay={0.06 * i} duration={0.8}>
                    <GalleryFrame
                      item={item}
                      onOpen={() => setIndex(globalIndex !== -1 ? globalIndex : i + 1)}
                      className={cn("aspect-[4/3]", i % 2 === 1 && "sm:mt-10")}
                      sizes="(min-width: 640px) 42vw, 100vw"
                    />
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>

        {/* Show More Photos Button */}
        {images.length > INITIAL_IMAGE_COUNT && !showAll && (
          <Reveal duration={0.6}>
            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="group relative inline-flex items-center gap-3 rounded-full border border-white/20 bg-granite-900 px-8 py-3.5 font-mono text-micro uppercase tracking-[0.18em] text-snow-50 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-alpenglow-bright hover:bg-granite-800 hover:text-alpenglow-bright hover:shadow-alpenglow-bright/10"
              >
                <span>Show More Photos</span>
                <span className="flex size-6 items-center justify-center rounded-full bg-white/10 text-snow-50 transition-transform duration-300 group-hover:translate-y-0.5 group-hover:bg-alpenglow-bright group-hover:text-granite-950">
                  <ChevronDown className="size-3.5" />
                </span>
              </button>
            </div>
          </Reveal>
        )}
      </div>

      <Lightbox items={allItems} index={index} setIndex={setIndex} />
    </section>
  );
}

function GalleryFrame({
  item,
  onOpen,
  className,
  sizes,
}: {
  item: GalleryItem;
  onOpen: () => void;
  className?: string;
  sizes: string;
}) {
  const isVideo = item.type === "video";
  const titleText = isVideo ? item.title || "Expedition Video" : item.alt;

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={cn("plate group relative w-full overflow-hidden bg-granite-900", className)}
    >
      <motion.span
        className="absolute inset-0 block"
        variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {isVideo ? (
          <video
            key={item.src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={item.poster}
            className="h-full w-full object-cover pointer-events-none"
          >
            <source
              src={item.src}
              type={
                item.src.toLowerCase().endsWith(".mov")
                  ? "video/quicktime"
                  : "video/mp4"
              }
            />
            <source src={item.src} />
          </video>
        ) : (
          <Image src={item.src} alt={item.alt} fill sizes={sizes} className="object-cover" />
        )}
      </motion.span>

      {/* Video Badge indicator */}
      {isVideo && (
        <span className="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-nano uppercase tracking-[0.18em] text-snow-50 backdrop-blur-md">
          <Play className="size-2.5 fill-current text-alpenglow-bright" />
          <span>Video</span>
        </span>
      )}

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-granite-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <span className="pointer-events-none absolute bottom-4 left-4 right-14 text-left font-mono text-micro uppercase tracking-[0.16em] text-snow-50/0 transition-colors duration-500 group-hover:text-snow-50/80">
        <span className="line-clamp-1">{titleText}</span>
      </span>

      <span className="pointer-events-none absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full border border-white/25 bg-black/25 text-snow-50 opacity-0 backdrop-blur-sm transition-opacity duration-500 group-hover:opacity-100">
        {isVideo ? <Play className="size-3.5 fill-current ml-0.5" /> : <Expand className="size-3.5" />}
      </span>
      <span className="sr-only">Open “{titleText}” full size</span>
    </motion.button>
  );
}

function Lightbox({
  items,
  index,
  setIndex,
}: {
  items: GalleryItem[];
  index: number | null;
  setIndex: (value: number | null) => void;
}) {
  const step = useCallback(
    (delta: number) => {
      if (index === null) return;
      setIndex((index + delta + items.length) % items.length);
    },
    [index, items.length, setIndex]
  );

  useEffect(() => {
    if (index === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  const currentItem = index !== null ? items[index] : null;

  return (
    <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
      <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none sm:max-w-5xl">
        <DialogTitle className="sr-only">
          {currentItem
            ? currentItem.type === "video"
              ? currentItem.title || "Gallery video"
              : currentItem.alt
            : "Gallery media"}
        </DialogTitle>
        {currentItem && (
          <figure className="plate relative overflow-hidden bg-granite-950">
            {currentItem.type === "video" ? (
              <div className="relative aspect-[16/9] w-full bg-black">
                <video
                  key={currentItem.src}
                  controls
                  autoPlay
                  playsInline
                  preload="auto"
                  className="h-full w-full object-contain"
                >
                  <source
                    src={currentItem.src}
                    type={
                      currentItem.src.toLowerCase().endsWith(".mov")
                        ? "video/quicktime"
                        : "video/mp4"
                    }
                  />
                  <source src={currentItem.src} />
                </video>
              </div>
            ) : (
              <div className="relative aspect-[3/2] w-full">
                <Image
                  src={currentItem.src}
                  alt={currentItem.alt}
                  fill
                  sizes="(min-width: 1024px) 64rem, 100vw"
                  className="object-contain"
                />
              </div>
            )}
            <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-5 py-3.5 text-body-sm text-snow-50/75">
              <span className="min-w-0 flex-1 truncate">
                {currentItem.type === "video"
                  ? currentItem.title || "Expedition Video"
                  : currentItem.alt}
              </span>
              <span className="shrink-0 font-mono text-micro uppercase tracking-[0.18em] text-snow-50/60">
                {String(index! + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </figcaption>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous frame"
                  className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-snow-50 backdrop-blur-sm transition-colors hover:border-alpenglow-bright hover:text-alpenglow-bright"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next frame"
                  className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/40 text-snow-50 backdrop-blur-sm transition-colors hover:border-alpenglow-bright hover:text-alpenglow-bright"
                >
                  <ChevronRight className="size-4" />
                </button>
              </>
            )}
          </figure>
        )}
      </DialogContent>
    </Dialog>
  );
}
