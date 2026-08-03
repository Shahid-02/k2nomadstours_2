import { NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingSchema } from "@/lib/validations/booking";
import { allTours, tourHref } from "@/data/tours";
import { siteConfig } from "@/data/site";
import { buildBookingNotificationEmail } from "@/lib/emails/booking-notification";

/** Sends mail on every accepted request, so it can never be prerendered. */
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  // `request.json()` rejects on any non-JSON body. Uncaught, that escaped the
  // handler and Next returned a 500 with a stack trace in the log — for input
  // this endpoint should simply refuse.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request body." }, { status: 400 });
  }

  // Honeypot. `company` is a hidden, unlabelled, tab-skipped field that no
  // human fills in. Bots that blindly complete every input do. It is checked
  // before validation and deliberately kept out of `bookingSchema`, which
  // strips unknown keys — so nothing downstream ever sees it.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as { company?: unknown }).company === "string" &&
    (body as { company: string }).company.trim() !== ""
  ) {
    // Logged rather than silently dropped, so a false positive is visible.
    console.warn("Booking rejected: honeypot field was filled.");
    return NextResponse.json({ ok: true });
  }

  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const booking = parsed.data;
  const tour = allTours.find((t) => t.slug === booking.tourSlug);
  // The contact page sends "general-enquiry" when a visitor hasn't picked a route yet.
  const tourTitle = tour?.title ?? (booking.tourSlug === "general-enquiry" ? "General enquiry" : booking.tourSlug);
  const tourUrl = tour ? `${siteConfig.url}${tourHref(tour)}` : siteConfig.url;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // This used to log the booking and return { ok: true }. The traveler was
    // told "Request received" while the enquiry went nowhere but stdout, so a
    // misconfigured deploy lost every booking with no outward signal. Failing
    // is the honest outcome: the forms already offer WhatsApp on error.
    console.error(
      "RESEND_API_KEY is not set — booking could NOT be delivered:",
      JSON.stringify({ tourSlug: booking.tourSlug, email: booking.email })
    );
    return NextResponse.json(
      {
        error:
          "We couldn't send that just now. Please message us on WhatsApp and we'll pick it up there.",
      },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const { html, text } = buildBookingNotificationEmail({ booking, tourTitle, tourUrl });

  const { error } = await resend.emails.send({
    from: `K2 Nomads Tours Website <${fromEmail}>`,
    to: siteConfig.email,
    replyTo: booking.email,
    subject: `New booking request: ${tourTitle}`,
    html,
    text,
  });

  if (error) {
    console.error("Failed to send booking email:", error);
    return NextResponse.json({ error: "Failed to send booking request. Please try WhatsApp or email instead." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
