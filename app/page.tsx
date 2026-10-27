import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeaturedListings } from "@/components/sections/FeaturedListings";
import { AboutMarci } from "@/components/sections/AboutMarci";
import { GetItSold } from "@/components/sections/GetItSold";
import { Testimonials } from "@/components/sections/Testimonials";
import { ValleyBanner } from "@/components/sections/ValleyBanner";
import { Services } from "@/components/sections/Services";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="relative flex-1">
        <Hero />
        <FeaturedListings />
        <AboutMarci />
        <GetItSold />
        <Testimonials />
        <ValleyBanner />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
