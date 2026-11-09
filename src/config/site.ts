/**
 * Centralized Site & Marketplace Configuration
 * 
 * CHANGE THE MARKETPLACE NAME HERE:
 * Changing `siteConfig.name` or other brand parameters will instantly reflect across the entire app
 * (Header, Footer, Metadata, Storefronts, Seller Dashboard, Onboarding, and Auth Modals).
 */

export const siteConfig = {
  // Brand Name (Change here to rebrand entire application)
  name: "Softilo",
  shortName: "Softilo",
  legalName: "Softilo Marketplace Ltd.",
  
  // Tagline & Slogans
  tagline: "বাংলাদেশের বিশ্বস্ত ও দ্রুততম ই-কমার্স মার্কেটপ্লেস",
  subTagline: "জিরো সাবস্ক্রিপশন ফি • ১-ক্লিক ক্যাশ অন ডেলিভারি • ১০০% ভেরিফাইড শপ",
  description: "বাংলাদেশের যেকোনো স্থান থেকে সরাসরি ভেরিফাইড সেলারদের পণ্য কিনুন ক্যাশ অন ডেলিভারিতে মাত্র ৩০ সেকেন্ডে।",
  
  // Localization & Currency
  currency: "৳",
  currencyCode: "BDT",
  country: "Bangladesh",
  countryCode: "+880",
  locale: "bn-BD",
  
  // Domain & API URLs
  domain: "softilo.com",
  commissionRate: 5,
  helpline: "01800000000",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://softilo.com",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  subdomainBase: "softilo.com",
  sellerSubdomainPrefix: "seller",
  
  // Support & Contact
  support: {
    phone: "01800000000",
    email: "support@softilo.com",
    hotline: "16789",
    hours: "সকাল ৯টা - রাত ১০টা (প্রতিদিন)",
  },
  
  // Default E-commerce Configuration
  defaults: {
    deliveryInsideDhaka: 60,
    deliveryOutsideDhaka: 120,
    defaultCommissionRate: 5.0, // 5% platform commission
    escrowHoldDays: 3,
  },
  
  // Trust Badges Text
  trust: {
    verifiedSellerBadge: "১০০% ভেরিফায়েড শপ",
    codBadge: "ক্যাশ অন ডেলিভারি সুবিধা",
    returnBadge: "৭ দিনের সহজ রিটার্ন পলিসি",
    escrowBadge: "১০০% সুরক্ষিত ডেলিভারি গ্যারান্টি",
    fastDeliveryBadge: "দ্রুততম হোম ডেলিভারি",
  },
  
  // Navigation Links
  links: {
    marketplaceHome: "/",
    sellerPortal: "/seller/dashboard",
    sellerOnboard: "/onboard",
    sellerLogin: "/seller/login",
    trackOrder: "/track-order",
    explore: "/explore",
    terms: "/terms",
    privacy: "/privacy",
  },
};

export type SiteConfig = typeof siteConfig;

