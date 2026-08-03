/**
 * A structured-data block.
 *
 * `JSON.stringify` does not escape `<`, so a value containing `</script>`
 * would close this tag early and everything after it would be parsed as
 * markup. Escaping the angle bracket is the standard guard; `<` is
 * valid JSON and decodes back to `<`, so consumers see the original string
 * and the serialised output is unchanged for any value without a `<`.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
