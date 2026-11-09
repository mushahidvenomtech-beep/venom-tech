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
 * 14 unique service cards preserving exact extracted titles, descriptions, and routes.
 * Content and route inconsistencies are maintained as requested.
 */
export const SERVICES_DATA: Service[] = [
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "We create modern, responsive, and fast-loading websites tailored to your business needs.",
    route: "/ai-automation-agency",
    category: "web-development",
    icon: "cpu",
    backgroundImage: "/images/services/ai-automation.webp",
  },
  {
    id: "digital-marketing-agency",
    title: "Digital Marketing Agency",
    description: "Reliable and scalable cloud hosting solutions with maximum uptime.",
    route: "/screens/services/advertising-agency",
    category: "seo-services",
    icon: "megaphone",
    backgroundImage: "/images/services/digital-marketing.webp",
  },
  {
    id: "app-development",
    title: "App Development",
    description: "Cross-platform mobile apps for both iOS and Android.",
    route: "/screens/services/app-development",
    category: "mobile-developements",
    icon: "mobile",
    backgroundImage: "/images/services/app-development.webp",
  },
  {
    id: "e-commerce",
    title: "E-Commerce",
    description: "Build secure, scalable online stores with payment integration.",
    category: "e-commerce",
    icon: "cart",
    backgroundImage: "/images/services/e-commerce.webp",
  },
  {
    id: "ui-design",
    title: "UI Design",
    description: "Clean and user-friendly UI focused on usability and aesthetics.",
    route: "/screens/services/graphic-designing",
    category: "ui-ux-designer",
    icon: "palette",
    backgroundImage: "/images/services/ui-design.webp",
  },
  {
    id: "animation",
    title: "Animation",
    description: "Motion graphics that bring your ideas to life.",
    route: "/ai-automation-agency",
    category: "ui-ux-designer",
    icon: "film",
    backgroundImage: "/images/services/animation.webp",
  },
  {
    id: "ar-vr",
    title: "AR/VR",
    description: "Immersive AR/VR experiences for innovative digital interaction.",
    category: "mobile-developements",
    icon: "cube",
    backgroundImage: "/images/services/ar-vr.webp",
  },
  {
    id: "photography",
    title: "Photography",
    description: "Professional brand photography and editing.",
    category: "bpo-services",
    icon: "camera",
    backgroundImage: "/images/services/photography.webp",
  },
  {
    id: "ai-bots",
    title: "AI Bots",
    description: "AI bots that automate customer service and internal processes.",
    category: "api-development",
    icon: "bot",
    backgroundImage: "/images/services/ai-bots.webp",
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    description: "Use data to forecast and inform smarter decisions.",
    category: "seo-services",
    icon: "chart",
    backgroundImage: "/images/services/predictive-analytics.webp",
  },
  {
    id: "email-campaigns",
    title: "Email Campaigns",
    description: "Engage your customers through effective email marketing.",
    route: "/email-compaigns",
    category: "bpo-services",
    icon: "mail",
    backgroundImage: "/images/services/email-campaigns.webp",
  },
  {
    id: "lead-funnels",
    title: "Lead Funnels",
    description: "Optimized lead funnels for conversion and growth.",
    category: "seo-services",
    icon: "filter",
    backgroundImage: "/images/services/lead-funnels.webp",
  },
  {
    id: "software-development",
    title: "Software Development",
    description: "Custom enterprise-level software built for your workflows.",
    category: "web-development",
    icon: "code",
    backgroundImage: "/images/services/software-development.webp",
  },
  {
    id: "lead-funnels-2",
    title: "Lead Funnels 2",
    description: "Refined lead generation and nurturing solutions.",
    category: "bpo-services",
    icon: "trending",
    backgroundImage: "/images/services/lead-funnels-2.webp",
  },
];

