import { Helmet } from "react-helmet-async";
import type { RouteMeta } from "../seo";

const SEOHelmet = ({ meta }: { meta: RouteMeta }) => (
  <Helmet>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <link rel="canonical" href={meta.canonical} />
    <meta property="og:title" content={meta.title} />
    <meta property="og:description" content={meta.description} />
    <meta property="og:url" content={meta.canonical} />
    <meta property="og:type" content={meta.ogType ?? "website"} />
    {meta.ogImage ? <meta property="og:image" content={meta.ogImage} /> : null}
    {meta.robots ? <meta name="robots" content={meta.robots} /> : null}
    {meta.jsonLd ? (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: meta.jsonLd }} />
    ) : null}
  </Helmet>
);

export default SEOHelmet;
