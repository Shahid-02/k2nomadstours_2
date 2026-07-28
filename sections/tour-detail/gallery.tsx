"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import type { TourImage } from "@/types/tour";

export function Gallery({ images }: { images: TourImage[] }) {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  function show(delta: number) {
    setIndex((current) => {
      if (current === null) return current;
      return (current + delta + images.length) % images.length;
    });
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">Gallery</h2>
      </Reveal>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image, i) => (
          <motion.button
            key={image.src + i}
            type="button"
            onClick={() => setIndex(i)}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.2 }}
            className="relative aspect-square overflow-hidden rounded-xl"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover"
            />
          </motion.button>
        ))}
      </div>

      <Dialog open={index !== null} onOpenChange={(open) => !open && setIndex(null)}>
        <DialogContent className="max-w-3xl bg-transparent p-0 ring-0 sm:max-w-3xl">
          <DialogTitle className="sr-only">{index !== null ? images[index].alt : "Gallery image"}</DialogTitle>
          {index !== null && (
            <div className="relative overflow-hidden rounded-xl bg-black">
              <div className="relative aspect-[4/3] w-full">
                <Image src={images[index].src} alt={images[index].alt} fill className="object-contain" />
              </div>
              <p className="bg-black/70 px-4 py-2 text-sm text-white">{images[index].alt}</p>
              {images.length > 1 && (
                <>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={() => show(-1)}
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => show(1)}
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
