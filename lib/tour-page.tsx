import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { TourCategory } from "@/types/tour";
import { getToursByCategory, getTourBySlug, getRelatedTours, tourHref } from "@/data/tours";
import { globalFaqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { TourHero } from "@/sections/tour-detail/tour-hero";

import { TourOverview } from "@/sections/tour-detail/overview";
import { ItineraryTimeline } from "@/sections/tour-detail/itinerary-timeline";
import { ExperienceDetails } from "@/sections/tour-detail/experience-details";
import { InclusionsExclusions } from "@/sections/tour-detail/inclusions-exclusions";
import { Gallery } from "@/sections/tour-detail/gallery";
import { Reserve } from "@/sections/tour-detail/reserve";
import { RelatedTours } from "@/sections/tour-detail/related-tours";
import { Testimonials } from "@/sections/shared/testimonials";
import { FaqAccordion } from "@/sections/shared/faq-accordion";
import { StickyBookBar } from "@/components/layout/sticky-book-bar";
import { JsonLd } from "@/components/shared/json-ld";
import { getOutboundRoute } from "@/lib/route";
import { getPublicVideos } from "@/lib/videos";
import { siteConfig } from "@/data/site";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/**
 * Tour pages alternate surface on every chapter — granite hero, snowfield
 * overview, muted itinerary, granite experience band, snowfield inclusions,
 * granite gallery, muted reserve — so a 21-day itinerary never reads as one
 * undifferentiated scroll.
 */
export function createTourRouteExports(category: TourCategory) {
  async function generateStaticParams() {
    return getToursByCategory(category).map((tour) => ({ slug: tour.slug }));
  }

  async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
    const { slug } = await params;
    const tour = getTourBySlug(category, slug);
    if (!tour) return {};

    return {
      title: tour.seo.title,
      description: tour.seo.description,
      alternates: { canonical: tour.seo.canonicalPath },
      openGraph: {
        type: "article",
        title: tour.seo.title,
        description: tour.seo.description,
        url: tour.seo.canonicalPath,
        images: [
          {
            url: tour.seo.ogImage,
            width: tour.heroImage.width,
            height: tour.heroImage.height,
            alt: tour.heroImage.alt,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: tour.seo.title,
        description: tour.seo.description,
        images: [tour.seo.ogImage],
      },
    };
  }

  async function Page({ params }: RouteParams) {
    const { slug } = await params;
    const tour = getTourBySlug(category, slug);
    if (!tour) notFound();

    const related = getRelatedTours(tour);
    const tourFaqs = globalFaqs.filter((f) => !f.tourSlug || f.tourSlug === tour.slug);
    const tourReviews = testimonials.filter((r) => r.tourSlug === tour.slug);
    const { start, farPoint } = getOutboundRoute(tour.route);

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.seo.description,
      image: `${siteConfig.url}${tour.heroImage.src}`,
      url: `${siteConfig.url}${tourHref(tour)}`,
      touristType: tour.idealFor,
      subjectOf: { "@type": "CreativeWork", about: tour.style },
      itinerary: {
        "@type": "ItemList",
        numberOfItems: tour.itinerary.length,
        itemListElement: tour.itinerary.map((day, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: day.title,
        })),
      },
      offers: tour.pricing.map((tier) => ({
        "@type": "Offer",
        name: tier.label,
        price: tier.pricePerPerson,
        priceCurrency: tier.currency,
        availability: "https://schema.org/InStock",
        url: `${siteConfig.url}${tourHref(tour)}#reserve`,
      })),
      provider: {
        "@type": "TravelAgency",
        name: siteConfig.name,
        url: siteConfig.url,
        email: siteConfig.email,
      },
    };

    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: category === "trek" ? "Treks" : category === "tour" ? "Tours" : "Cycling",
          item: `${siteConfig.url}/${category === "trek" ? "treks" : category === "tour" ? "tours" : "cycling"}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: tour.title,
          item: `${siteConfig.url}${tourHref(tour)}`,
        },
      ],
    };

    const publicVideos = getPublicVideos();
    const tourVideos = tour.videos && tour.videos.length > 0 ? tour.videos : publicVideos;

    return (
      <>
        <JsonLd data={jsonLd} />
        <JsonLd data={breadcrumbs} />

        <TourHero tour={tour} />

        <TourOverview tour={tour} />
        <ItineraryTimeline days={tour.itinerary} />
        <ExperienceDetails
          experiencesIncluded={tour.experiencesIncluded}
          idealFor={tour.idealFor}
        />
        <InclusionsExclusions tour={tour} />
        <Gallery images={tour.gallery} videos={tourVideos} />
        <Reserve tour={tour} />
        {tourReviews.length > 0 && (
          <Testimonials
            reviews={tourReviews}
            eyebrow={`${start} to ${farPoint}`}
            title="What travelers said afterwards"
          />
        )}
        <RelatedTours tours={related} />
        <FaqAccordion faqs={tourFaqs} />
        <StickyBookBar tour={tour} />
      </>
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
