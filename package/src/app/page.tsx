import { Metadata } from "next";
import Aboutus from "./components/home/about-us";
import Contact from "./components/home/contact";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Portfolio from "./components/home/portfolio";
import Pricing from "./components/home/pricing";
import Resources from "./components/home/resources";
import Services from "./components/home/services";
import StatsFacts from "./components/home/stats-facts";
import Team from "./components/home/team";
import Testimonial from "./components/home/testimonial";
import Masterclass from "./components/home/masterclass";
import MasterInfo from "./components/home/masterinfo";

export const metadata: Metadata = {
    title: "Studiova",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsFacts/>
      <Aboutus/>
      <Masterclass />
      <MasterInfo />
      <Portfolio/>
      <Services/>
      <Testimonial/>
      <Team teamdataNumber="06"/>
      <Pricing/>
      <Faq/>
      <Resources/>
      <Contact contactdataNumber="10"/>
    </>
  );
}
