import { Metadata } from "next";
import Aboutus from "./components/home/about-us";
import Contact from "./components/home/contact";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Catalog from "./components/home/catalogs";
import Pricing from "./components/home/pricing";
import Resources from "./components/home/resources";
import Services from "./components/home/services";
import StatsFacts from "./components/home/stats-facts";
import Team from "./components/home/team";
import Testimonial from "./components/home/testimonial";
import Masterclass from "./components/home/masterclass";
import MasterInfo from "./components/home/masterinfo";
import Game from "./components/home/Game";
import Demo from "./components/home/demo";

export const metadata: Metadata = {
    title: "Creditor Academy",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsFacts />
      <Aboutus />
      <Masterclass />
      <MasterInfo />
      <Catalog />
      <Services />
      <Testimonial />
      <Game />
      <Team teamdataNumber="06" />
      <Pricing />
      <Faq />
      <Demo />
      <Resources />
      <Contact contactdataNumber="10" />
    </>
  );
}
