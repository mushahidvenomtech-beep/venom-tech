export interface Service {
  id: string;
  title: string;
  description: string;
  route?: string;
  category?: string;
  icon?: string;
  backgroundImage?: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
}

/**
 * Seven service categories in the exact order and spelling requested
 */
export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "web-development", title: "Web Development" },
  { id: "mobile-developements", title: "Mobile Developements" },
  { id: "ui-ux-designer", title: "UI UX Designer" },
  { id: "e-commerce", title: "E-commerce" },
  { id: "seo-services", title: "SEO Services" },
  { id: "api-development", title: "API Development" },
  { id: "bpo-services", title: "BPO Services" },
];

/**
 * 13 service cards matching the requested services, descriptions, and linked pages.
 */
export const SERVICES_DATA: Service[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Automate repetitive tasks, customer replies and reporting with custom AI workflows and chatbots.",
    route: "/screens/services/ai-automation",
    category: "web-development",
    icon: "cpu",
    backgroundImage: "/images/services/ai-automation.webp",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    description: "Data-driven campaigns across Google, Meta and TikTok that turn clicks into customers.",
    route: "/screens/services/advertising-agency",
    category: "seo-services",
    icon: "megaphone",
    backgroundImage: "/images/services/digital-marketing.webp",
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Fast, secure iOS, Android and cross-platform apps built around your users.",
    route: "/screens/services/app-development",
    category: "mobile-developements",
    icon: "mobile",
    backgroundImage: "/images/services/app-development.webp",
  },
  {
    id: "e-commerce-development",
    title: "E-Commerce Development",
    description: "Online stores on Shopify, WooCommerce or custom stacks, built to sell.",
    route: "/screens/services",
    category: "e-commerce",
    icon: "cart",
    backgroundImage: "/images/services/e-commerce.webp",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Clean, user-friendly interfaces that keep visitors engaged and lift conversions.",
    route: "/screens/services/graphic-designing",
    category: "ui-ux-designer",
    icon: "palette",
    backgroundImage: "/images/services/ui-design.webp",
  },
  {
    id: "animation-motion-graphics",
    title: "Animation & Motion Graphics",
    description: "Explainer videos, reels and motion ads that make your brand stand out.",
    route: "/screens/services/graphic-designing",
    category: "ui-ux-designer",
    icon: "film",
    backgroundImage: "/images/services/animation.webp",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Logos, brand identities, social media and print design.",
    route: "/screens/services/graphic-designing",
    category: "ui-ux-designer",
    icon: "palette",
    backgroundImage: "/images/services/ui-design.webp",
  },
  {
    id: "advertising-agency",
    title: "Advertising Agency",
    description: "Media buying, creative and PPC management with clear ROAS tracking.",
    route: "/screens/services/advertising-agency",
    category: "seo-services",
    icon: "trending",
    backgroundImage: "/images/services/digital-marketing.webp",
  },
  {
    id: "bpo-services",
    title: "BPO Services",
    description: "Call center, customer support, lead generation and back-office teams.",
    route: "/screens/services/bpo-services",
    category: "bpo-services",
    icon: "bot",
    backgroundImage: "/images/services/photography.webp",
  },
  {
    id: "web-development",
    title: "Web Development",
    description: "Responsive, SEO-ready websites on Next.js and WordPress.",
    route: "/screens/services",
    category: "web-development",
    icon: "code",
    backgroundImage: "/images/services/software-development.webp",
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description: "Content calendars, posting and community management.",
    route: "/screens/services/advertising-agency",
    category: "seo-services",
    icon: "mail",
    backgroundImage: "/images/services/email-campaigns.webp",
  },
  {
    id: "api-development-integration",
    title: "API Development & Integration",
    description: "Connect your CRM, payment gateways and tools.",
    route: "/screens/services",
    category: "api-development",
    icon: "code",
    backgroundImage: "/images/services/ai-bots.webp",
  },
  {
    id: "content-writing",
    title: "Content Writing",
    description: "SEO blogs, website copy and ad copy that ranks and sells.",
    route: "/screens/services/seo",
    category: "seo-services",
    icon: "chart",
    backgroundImage: "/images/services/predictive-analytics.webp",
  },
];

