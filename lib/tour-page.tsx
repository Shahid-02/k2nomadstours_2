import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { TourCategory } from "@/types/tour";
import { getToursByCategory, getTourBySlug, getRelatedTours } from "@/data/tours";
import { globalFaqs } from "@/data/faqs";
import { testimonials } from "@/data/testimonials";
import { TourHero } from "@/sections/tour-detail/tour-hero";
import { TourHighlights } from "@/sections/tour-detail/tour-highlights";
import { ItineraryTimeline } from "@/sections/tour-detail/itinerary-timeline";
import { ExperienceDetails } from "@/sections/tour-detail/experience-details";
import { InclusionsExclusions } from "@/sections/tour-detail/inclusions-exclusions";
import { Gallery } from "@/sections/tour-detail/gallery";
import { PricingCard } from "@/sections/tour-detail/pricing-card";
import { BookingForm } from "@/sections/tour-detail/booking-form";
import { RelatedTours } from "@/sections/tour-detail/related-tours";
import { Testimonials } from "@/sections/shared/testimonials";
import { FaqAccordion } from "@/sections/shared/faq-accordion";
import { siteConfig } from "@/data/site";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

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
        title: tour.seo.title,
        description: tour.seo.description,
        url: tour.seo.canonicalPath,
        images: [{ url: tour.seo.ogImage }],
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

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: tour.title,
      description: tour.seo.description,
      touristType: tour.idealFor,
      itinerary: {
        "@type": "ItemList",
        itemListElement: tour.itinerary.map((day) => ({
          "@type": "ListItem",
          position: day.day,
          name: day.title,
        })),
      },
      offers: tour.pricing.map((tier) => ({
        "@type": "Offer",
        name: tier.label,
        price: tier.pricePerPerson,
        priceCurrency: tier.currency,
      })),
      provider: {
        "@type": "TravelAgency",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    };

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <TourHero tour={tour} />
        <TourHighlights highlights={tour.highlights} summary={tour.summary} />
        <div id="itinerary">
          <ItineraryTimeline days={tour.itinerary} />
        </div>
        <ExperienceDetails experiencesIncluded={tour.experiencesIncluded} idealFor={tour.idealFor} />
        <InclusionsExclusions inclusions={tour.inclusions} exclusions={tour.exclusions} />
        <Gallery images={tour.gallery} />
        <PricingCard pricing={tour.pricing} />
        {tourReviews.length > 0 && <Testimonials reviews={tourReviews} title={`Traveler Stories: ${tour.title}`} />}
        <BookingForm tourSlug={tour.slug} tourTitle={tour.title} />
        <RelatedTours tours={related} />
        <FaqAccordion faqs={tourFaqs} />
      </>
    );
  }

  return { generateStaticParams, generateMetadata, Page };
}
