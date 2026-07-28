import type { BookingFormValues } from "@/lib/validations/booking";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "long", day: "numeric" });
}

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:14px 20px;border-bottom:1px solid #ece3d6;font:600 13px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#8a7458;white-space:nowrap;vertical-align:top;width:150px;">
      ${label}
    </td>
    <td style="padding:14px 20px;border-bottom:1px solid #ece3d6;font:400 15px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#2b2117;">
      ${value}
    </td>
  </tr>`;

export function buildBookingNotificationEmail({
  booking,
  tourTitle,
  tourUrl,
}: {
  booking: BookingFormValues;
  tourTitle: string;
  tourUrl: string;
}) {
  const dateRange = booking.preferredDateEnd
    ? `${formatDate(booking.preferredDateStart)} &ndash; ${formatDate(booking.preferredDateEnd)}`
    : formatDate(booking.preferredDateStart);

  const rows = [
    row("Traveler", escapeHtml(booking.fullName)),
    row("Email", `<a href="mailto:${escapeHtml(booking.email)}" style="color:#c2622d;text-decoration:none;">${escapeHtml(booking.email)}</a>`),
    row("Phone", `<a href="tel:${escapeHtml(booking.phone)}" style="color:#c2622d;text-decoration:none;">${escapeHtml(booking.phone)}</a>`),
    row("Preferred dates", dateRange),
    row("Group size", `${booking.groupSize} traveler${booking.groupSize === 1 ? "" : "s"}`),
  ];
  if (booking.message) {
    rows.push(row("Message", escapeHtml(booking.message).replace(/\n/g, "<br/>")));
  }

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:32px 16px;background-color:#f4ede1;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #ece3d6;">
      <tr>
        <td style="background-color:#c2622d;padding:28px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font:700 18px/1.2 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#ffffff;">
                K2 Nomads Tours
              </td>
            </tr>
            <tr>
              <td style="padding-top:4px;font:400 13px/1.4 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#fbe2d0;">
                New booking request from the website
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:28px 32px 8px;">
          <p style="margin:0;font:700 21px/1.3 Georgia,'Times New Roman',serif;color:#2b2117;">
            ${escapeHtml(tourTitle)}
          </p>
          <p style="margin:6px 0 0;font:400 14px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#8a7458;">
            Reply directly to this email to respond to ${escapeHtml(booking.fullName.split(" ")[0] || "the traveler")}.
          </p>
        </td>
      </tr>

      <tr>
        <td style="padding:12px 12px 8px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
            ${rows.join("")}
          </table>
        </td>
      </tr>

      <tr>
        <td style="padding:20px 32px 28px;">
          <a href="${escapeHtml(tourUrl)}" style="display:inline-block;background-color:#c2622d;color:#ffffff;text-decoration:none;font:600 14px/1 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;padding:12px 20px;border-radius:8px;">
            View tour page
          </a>
        </td>
      </tr>

      <tr>
        <td style="padding:16px 32px;background-color:#f4ede1;font:400 12px/1.5 -apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#a89579;">
          Sent automatically from the booking form at k2nomadstours.com.
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `New booking request: ${tourTitle}`,
    "",
    `Traveler: ${booking.fullName}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Preferred dates: ${booking.preferredDateStart}${booking.preferredDateEnd ? ` to ${booking.preferredDateEnd}` : ""}`,
    `Group size: ${booking.groupSize}`,
    booking.message ? `Message: ${booking.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return { html, text };
}
