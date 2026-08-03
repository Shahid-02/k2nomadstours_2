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
    console.warn("RESEND_API_KEY is not set — booking request logged instead of emailed:", booking);
    return NextResponse.json({ ok: true });
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
