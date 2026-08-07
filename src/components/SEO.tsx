import { Helmet } from "react-helmet-async";
import { useSettings } from '../hooks/useSettings';

const siteUrl = (import.meta.env.VITE_SITE_URL || "https://cakesbyshiddat.com").replace(/\/$/, '');

type SEOProps = {
  title: string;
  description: string;
  path: string;
};

export const LocalBusinessSchema = () => {
  const { settings } = useSettings();
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": settings?.businessName || "Cakes By Shiddat",
    "description": settings?.description || "Luxury Cakes & Celebrations",
    "telephone": settings?.phone || "",
    "email": settings?.email || "",
    "address": settings?.address || "",
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
    </Helmet>
  );
};

const SEO = ({ title, description, path }: SEOProps) => {
  const { settings } = useSettings();
  const canonical = `${siteUrl}${path}`;
  const pageTitle = title || settings?.seoTitle || settings?.businessName || 'Cakes By Shiddat';
  const pageDescription = description || settings?.seoDescription || settings?.description || '';
  const brandName = settings?.businessName || '';

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#F5B7C5" />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={brandName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={settings?.logoUrl || `${siteUrl}/favicon.svg`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={settings?.logoUrl || `${siteUrl}/favicon.svg`} />
      {settings?.faviconUrl && <link rel="icon" href={settings.faviconUrl} />}
    </Helmet>
  );
};

export default SEO;
