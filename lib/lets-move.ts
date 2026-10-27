// Content for the "Get It Done. Get It Sold." section (wording from the Figma design / client brief).
// The 2021 sales figures are self-reported on public Marci Metzger pages; confirm them before launch.

export const letsMove = {
  title: "Get It Done. Get It Sold.",
  subtitle: "Your Home Deserves More Than Just a Listing.",
  feature: {
    title: "Top Residential Sales Last 5 Years",
    paragraphs: [
      "Selling a home is a big move. With local market knowledge, thoughtful marketing, and personalized guidance, we'll help you navigate every step with confidence.",
      "We helped nearly 90 clients in 2021, and closed 28.5 million in sales! Our team works hard everyday to grow and learn, so that we may continue to excel in our market. Our clients deserve our best, & we want to make sure our best is better every year.",
    ],
    image: {
      src: "/service 1.jpeg",
      alt: "Bright open-plan kitchen with a marble island, pendant lights and a stone fireplace in the living area",
      width: 1200,
      height: 600,
    },
  },
  messages: [
    {
      title: "Your Home Deserves More Than Just a Listing.",
      body: "Get it SOLD! We exhaust every avenue to ensure our listings are at the fingertips of every possible buyer, getting you top dollar for your home. Through strategic marketing, professional photography, and targeted online exposure, we showcase your property's best features to attract serious buyers and help you achieve the best possible outcome.",
    },
    {
      title: "More Than a Home Search. Your Partner in Every Step.",
      body: "Guidance You Can Count On. Navigate the Pahrump real estate market with confidence. From local market insights and property evaluations to upgrade recommendations and trusted contractor connections, we provide personalized guidance and practical resources to help you find the right home and make informed decisions every step of the way.",
    },
  ],
};

export type Affiliation = {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Logo files are the project's own images. Order matches the Figma design.
export const affiliations: Affiliation[] = [
  { name: "REALTOR®", src: "/realtor.jpeg", alt: "REALTOR® logo", width: 223, height: 200 },
  {
    name: "Pahrump Valley Chamber of Commerce",
    src: "/pharump.jpeg",
    alt: "Pahrump Valley Chamber of Commerce logo",
    width: 200,
    height: 200,
  },
  { name: "The Ridge Realty Group", src: "/ridge.jpeg", alt: "The Ridge Realty Group logo", width: 200, height: 200 },
  { name: "Equal Housing Opportunity", src: "/equals.jpeg", alt: "Equal Housing Opportunity logo", width: 199, height: 200 },
];
