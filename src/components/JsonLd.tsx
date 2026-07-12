// Renders a JSON-LD structured-data script tag. No 'use client' directive on
// purpose: server layouts render it server-side, and when a client page
// imports it the markup is still emitted into the prerendered HTML.
// The replace() escapes "<" so record content can never close the script tag.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
