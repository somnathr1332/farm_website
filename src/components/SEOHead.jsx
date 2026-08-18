import { useEffect } from "react";
import { seoConfig } from "../config/seokeywords";

/**
 * SEOHead — Dynamically sets the document title and meta tags per page.
 * 
 * @param {string} title — The page title (will appear in browser tab & search results)
 * @param {string} description — The page meta description (for search engine snippets)
 * @param {string} [canonicalPath] — Optional path suffix for canonical URL (e.g. "/plants")
 */
export default function SEOHead({ title, description, canonicalPath = "" }) {
  useEffect(() => {
    const baseUrl = seoConfig.siteUrl;

    // Set document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", `${baseUrl}${canonicalPath}`);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", `${baseUrl}${canonicalPath}`);

    // Update Twitter Card tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", title);

    const twDescription = document.querySelector('meta[name="twitter:description"]');
    if (twDescription) twDescription.setAttribute("content", description);

    // Update Google Search Console verification tag
    if (seoConfig.googleVerificationId) {
      let googleVerification = document.querySelector('meta[name="google-site-verification"]');
      if (googleVerification) {
        googleVerification.setAttribute("content", seoConfig.googleVerificationId);
      }
    }

  }, [title, description, canonicalPath]);

  return null; // This component renders nothing — it only manages <head>
}
