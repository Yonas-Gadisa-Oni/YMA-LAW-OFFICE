import { useEffect } from "react";

interface SEOMetadata {
  title: string;
  description: string;
  path: string;
}

const SITE_URL = "https://ymalegal.com";

const ROUTE_SEO: Record<string, SEOMetadata> = {
  home: {
    title: "YMA Law Office | Advocates & Legal Counsel in Addis Ababa, Ethiopia",
    description: "YMA Law Office (Yigermal Melkam & Advocates) provides full-service legal counsel in Addis Ababa, Ethiopia. Corporate law, litigation, tax, and sports arbitration.",
    path: "/",
  },
  about: {
    title: "About Us | YMA Law Office — Law Firm in Addis Ababa, Ethiopia",
    description: "Learn about YMA Law Office (Yigermal Melkam & Advocates) in Addis Ababa, Ethiopia. Discover our founding partner Lawyer Yigermal Melkam, legal ethos, and client advocacy track record.",
    path: "/about",
  },
  team: {
    title: "Our Legal Team & Advocates | YMA Law Office Ethiopia",
    description: "Meet the experienced advocates and legal counsel at YMA Law Office in Addis Ababa, Ethiopia. Practice areas include corporate litigation, commercial advisory, and CAS arbitration.",
    path: "/team",
  },
  "practice-areas": {
    title: "Practice Areas & Legal Services | YMA Law Office Ethiopia",
    description: "Explore legal services at YMA Law Office in Addis Ababa: Sports law (CAS & ETH-ADA), banking & insurance, foreign investment (FDI), employment law, contracts, and construction.",
    path: "/practice-areas",
  },
  engagements: {
    title: "Legal Engagement Models & Representation | YMA Law Office",
    description: "Discover how YMA Law Office works with domestic and international clients in Ethiopia: flexible advisory models, ongoing corporate retainer partnerships, and trial representation.",
    path: "/engagements",
  },
  "legal-updates": {
    title: "Legal Updates & Sports Law Insights | YMA Law Office Ethiopia",
    description: "Stay informed with legal updates, Court of Arbitration for Sport (CAS) insights, regulatory changes, and Ethiopian jurisprudence analyses from YMA Law Office.",
    path: "/legal-updates",
  },
  newsletter: {
    title: "Legal Updates & Sports Law Insights | YMA Law Office Ethiopia",
    description: "Stay informed with legal updates, Court of Arbitration for Sport (CAS) insights, regulatory changes, and Ethiopian jurisprudence analyses from YMA Law Office.",
    path: "/legal-updates",
  },
  blog: {
    title: "Legal Blog & Case Commentary | YMA Law Office Ethiopia",
    description: "Articles, legal analysis, and commentary on Ethiopian law, corporate governance, customs disputes, and international sports arbitration from YMA Law Office.",
    path: "/blog",
  },
  contact: {
    title: "Contact Us & Book a Consultation | YMA Law Office Addis Ababa",
    description: "Contact YMA Law Office in Bole, Addis Ababa (in front of Ramada Hotel). Book a legal consultation via telephone (+251945926477), WhatsApp, or our online form.",
    path: "/contact",
  },
  "fee-structure": {
    title: "Transparent Legal Fee Structure | YMA Law Office Ethiopia",
    description: "Transparent, value-driven legal pricing from YMA Law Office in Ethiopia: hourly advisory rates, fixed-fee document review, corporate retainers, and dispute representation.",
    path: "/fee-structure",
  },
};

function formatSlugTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function useSEO(activeRoute: string) {
  useEffect(() => {
    let metadata = ROUTE_SEO[activeRoute];

    if (!metadata) {
      if (activeRoute.startsWith("blog/")) {
        const slug = activeRoute.slice("blog/".length);
        const titleCandidate = formatSlugTitle(slug);
        metadata = {
          title: `${titleCandidate} | YMA Law Office Blog`,
          description: `Read "${titleCandidate}" by YMA Law Office — legal insights and commentary from Addis Ababa, Ethiopia.`,
          path: `/blog/${slug}`,
        };
      } else if (activeRoute.startsWith("blog-admin")) {
        metadata = {
          title: "Blog Administration | YMA Law Office",
          description: "Administrative portal for YMA Law Office blog management.",
          path: "/blog-admin",
        };
      } else {
        metadata = ROUTE_SEO.home;
      }
    }

    const canonicalUrl = `${SITE_URL}${metadata.path === "/" ? "/" : metadata.path}`;

    // 1. Title
    document.title = metadata.title;

    // 2. Helper to set or create meta tag
    const setMeta = (selector: string, attr: "name" | "property", value: string, content: string) => {
      let el = document.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // 3. Standard SEO tags
    setMeta('meta[name="description"]', "name", "description", metadata.description);

    // 4. Canonical link
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    // 5. OpenGraph tags
    setMeta('meta[property="og:title"]', "property", "og:title", metadata.title);
    setMeta('meta[property="og:description"]', "property", "og:description", metadata.description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);

    // 6. Twitter Card tags
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", metadata.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", metadata.description);
    setMeta('meta[name="twitter:url"]', "name", "twitter:url", canonicalUrl);
  }, [activeRoute]);
}

