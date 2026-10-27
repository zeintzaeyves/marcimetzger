export type Service = {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** CSS object-position for the 16:9 crop (keeps the subject in frame on tall photos). */
    position?: string;
  };
};

// Wording from the Figma design / client brief. Photos are the project's own images.
export const servicesSection = {
  title: "Our Services",
  description:
    "Every client engagement is built around rigorous due diligence, local utility mastery, and bespoke transactional security.",
};

export const services: Service[] = [
  {
    id: "real-estate-made-simple",
    title: "Real Estate, Made Simple",
    description:
      "Feeling unsure about your next property move? We're here to help. Whether you're planning to buy or sell a home, exploring investment opportunities, or simply keeping an eye on the market, we're committed to making your real estate journey smooth, informed, and rewarding.",
    image: {
      src: "/os 1.jpg",
      alt: "Two women talking in a bright office, one seated with a clipboard and the other facing her",
      width: 3840,
      height: 2160,
    },
  },
  {
    id: "residential-commercial",
    title: "Residential & Commercial Properties",
    description:
      "From cozy condos to spacious estates, we'll help you find the right property at the right price. Whether you're searching for a fixer-upper, a luxury home, or a promising investment, we're here to guide you through every option. As local real estate professionals, we know the community we call home and are ready to help you make confident, informed property decisions.",
    image: {
      src: "/os 2.jpg",
      alt: "Two-story blue-gray shingled house with white trim and large windows",
      width: 4000,
      height: 4958,
      position: "center 40%",
    },
  },
  {
    id: "guidance-you-can-trust",
    title: "Guidance You Can Trust",
    description:
      "Have questions about your budget, credit, or financing options? We'll help connect you with the right professionals to get the answers you need. From understanding your options to preparing for your next step, we're here to make the process easier to navigate so you can make informed decisions and move forward with confidence.",
    image: {
      src: "/os 3.jpg",
      alt: "Two people shaking hands over a desk while a third holds a document, with a laptop nearby",
      width: 6720,
      height: 4480,
    },
  },
];
