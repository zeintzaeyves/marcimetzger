export type ListingImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Every detail except the image is optional: a card only shows the fields that are filled in.
export type Listing = {
  id: string;
  image: ListingImage;
  address?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  price?: number; // whole dollars, e.g. 550000
};

/**
 * Where "Explore all listings" goes. Keep null until a real, verified listings page exists
 * (the project has none yet), so the UI never shows a dead link.
 */
export const allListingsHref: string | null = null;

/**
 * Photos are the project's own images (public/card 1-3.jpg). The text details are the sample
 * values from the Figma design (same for all three); replace them per listing with real data.
 */
export const featuredListings: Listing[] = [
  {
    id: "photo-1",
    image: {
      src: "/card 1.jpg",
      alt: "Single-story tan stucco home with a two-car garage and covered entry under a clear blue sky",
      width: 960,
      height: 640,
    },
    address: "240 E Hickory Street, Pahrump, NV 89048",
    beds: 4,
    baths: 3,
    sqft: 2775,
    price: 550000,
  },
  {
    id: "photo-2",
    image: {
      src: "/card 2.jpg",
      alt: "Modern single-story white home with a dark tile roof and two garage doors at dusk under a pink and blue sky",
      width: 1086,
      height: 724,
    },
    address: "240 E Hickory Street, Pahrump, NV 89048",
    beds: 4,
    baths: 3,
    sqft: 2775,
    price: 550000,
  },
  {
    id: "photo-3",
    image: {
      src: "/card 3.jpg",
      alt: "Single-story gray home with desert landscaping and a one-car garage under a blue sky",
      width: 640,
      height: 426,
    },
    address: "240 E Hickory Street, Pahrump, NV 89048",
    beds: 4,
    baths: 3,
    sqft: 2775,
    price: 550000,
  },
];
