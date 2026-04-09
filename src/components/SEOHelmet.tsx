import { Helmet } from "react-helmet-async";
import type { RouteMeta } from "../seo";

const SEOHelmet = ({ meta }: { meta: RouteMeta }) => (
  <Helmet>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <link rel="canonical" href={meta.canonical} />
    <meta property="og:site_name" content="Studio.K 韓味研究所" />
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:title" content={meta.ogTitle ?? meta.title} />
    <meta property="og:description" content={meta.ogDescription ?? meta.description} />
    <meta property="og:url" content={meta.canonical} />
    <meta property="og:type" content={meta.ogType ?? "website"} />
    {meta.ogImage ? <meta property="og:image" content={meta.ogImage} /> : null}
    {meta.ogImageAlt ? <meta property="og:image:alt" content={meta.ogImageAlt} /> : null}
    <meta name="twitter:card" content={meta.ogImage ? "summary_large_image" : "summary"} />
    <meta name="twitter:title" content={meta.ogTitle ?? meta.title} />
    <meta name="twitter:description" content={meta.ogDescription ?? meta.description} />
    {meta.ogImage ? <meta name="twitter:image" content={meta.ogImage} /> : null}
    {meta.ogImageAlt ? <meta name="twitter:image:alt" content={meta.ogImageAlt} /> : null}
    {meta.robots ? <meta name="robots" content={meta.robots} /> : null}
    {meta.jsonLd ? (
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: meta.jsonLd }} />
    ) : null}
  </Helmet>
);

export default SEOHelmet;
