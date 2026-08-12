// ============================================================
// Seo — shared, reusable per-page metadata component.
// Renders <title>, <meta>, <link rel="canonical">, and JSON-LD
// <script> tags. React 19 automatically hoists <title>/<meta>/
// <link> into <head> no matter where in the tree they render,
// so this can be dropped at the top of any page component.
// ============================================================

const SITE_NAME = "Mirketa";
const DEFAULT_OG_IMAGE = "https://www.mirketa.com/og-image.jpg";

export default function Seo({
  title,
  description,
  canonical,
  keywords = [],
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  twitterTitle,
  twitterDescription,
  twitterImage = DEFAULT_OG_IMAGE,
  schema,
}) {
  const resolvedOgTitle = ogTitle || title;
  const resolvedOgDescription = ogDescription || description;
  const resolvedTwitterTitle = twitterTitle || resolvedOgTitle;
  const resolvedTwitterDescription = twitterDescription || resolvedOgDescription;
  const schemaList = Array.isArray(schema) ? schema : schema ? [schema] : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTwitterTitle} />
      <meta name="twitter:description" content={resolvedTwitterDescription} />
      <meta name="twitter:image" content={twitterImage} />

      {schemaList.map((item, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </>
  );
}
