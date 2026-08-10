interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/** Renders JSON-LD structured data for search engines. */
export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
