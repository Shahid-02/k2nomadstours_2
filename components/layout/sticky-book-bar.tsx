"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function StickyBookBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  const isTourPage = /^\/(tours|treks|cycling)\/[^/]+$/.test(pathname ?? "");

  useEffect(() => {
    if (!isTourPage) return;
    function onScroll() {
      setVisible(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isTourPage]);

  if (!isTourPage || !visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border bg-background/95 px-4 py-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-md lg:hidden">
      <a
        href={siteConfig.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </a>
      <Button size="sm" className="flex-1" nativeButton={false} render={<Link href="#booking" />}>
        Book This Tour
      </Button>
    </div>
  );
}
