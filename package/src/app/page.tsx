import { Metadata } from "next";
import Aboutus from "./components/home/about-us";
import Contact from "./components/home/contact";
import Faq from "./components/home/faq";
import HeroSection from "./components/home/hero";
import Courses from "./components/home/courses";
import Pricing from "./components/home/pricing";
import Resources from "./components/home/resources";
import Roadmap from "./components/home/services";
import StatsFacts from "./components/home/stats-facts";
import Team from "./components/home/team";
import Testimonial from "./components/home/testimonial";
import Masterclass from "./components/home/masterclass";
import MasterInfo from "./components/home/masterinfo";
import Game from "./components/home/Game";
import Commitment from "./components/home/Commitment";
import Offer from "./components/home/Offer";
// import { AnimatedTestimonialsDemo } from "./components/home/testimonial/AnimatedDemo";
import Event from "./components/Event";
import About from "./components/home/about";

export const metadata: Metadata = {
    title: "Creditor Academy",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      {/* <StatsFacts /> */}
      {/* <Masterclass /> */}
      {/* <Aboutus /> */}
      <About />
      {/* <MasterInfo /> */}
      <Courses />
      <Contact contactdataNumber="3" />
      <Offer />
      <Event />
      {/* <Roadmap /> */}
      {/* <Testimonial /> */}
      {/* <AnimatedTestimonialsDemo /> */}
      {/* <Game /> */}
      {/* <Team teamdataNumber="06" /> */}
      {/* <Commitment /> */}
      {/* <Pricing /> */}
      {/* <Faq /> */}
      {/* <Resources /> */}
      
    </>
  );
}
