"use client";

import { Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Reveal } from "@/components/shared/reveal";

export function InclusionsExclusions({
  inclusions,
  exclusions,
}: {
  inclusions: string[];
  exclusions: string[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Reveal>
        <h2 className="font-heading text-2xl font-semibold sm:text-3xl">What&apos;s Included</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-6">
        <Tabs defaultValue="included">
          <TabsList>
            <TabsTrigger value="included">Included</TabsTrigger>
            <TabsTrigger value="excluded">Not Included</TabsTrigger>
          </TabsList>
          <TabsContent value="included">
            <ul className="mt-4 space-y-3">
              {inclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="excluded">
            <ul className="mt-4 space-y-3">
              {exclusions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                  <X className="mt-0.5 size-4 shrink-0 text-destructive" />
                  {item}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </Reveal>
    </section>
  );
}
