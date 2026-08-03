/**
 * Spam trap for the booking endpoint.
 *
 * A field no human ever sees or reaches: `display:none`, out of the
 * accessibility tree, skipped by the tab order, and with autofill switched
 * off so a password manager cannot trip it. Bots that complete every input
 * in the DOM fill it, and the route rejects those.
 *
 * It is deliberately outside react-hook-form: `bookingSchema` strips unknown
 * keys, so a registered field would never survive to the request body. Read
 * it with `readHoneypot(event)` in the submit handler instead.
 */
export const HONEYPOT_FIELD = "company";

export function Honeypot() {
  return (
    <div aria-hidden="true" className="hidden">
      <label htmlFor={HONEYPOT_FIELD}>Company</label>
      <input
        id={HONEYPOT_FIELD}
        name={HONEYPOT_FIELD}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        defaultValue=""
      />
    </div>
  );
}

/** Pulls the trap's value off the form that was actually submitted. */
export function readHoneypot(event?: { target?: unknown }): string {
  const form = event?.target;
  if (!(form instanceof HTMLFormElement)) return "";
  const field = form.elements.namedItem(HONEYPOT_FIELD);
  return field instanceof HTMLInputElement ? field.value : "";
}
