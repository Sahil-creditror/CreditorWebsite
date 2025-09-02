"use client";

import React from "react";
import { HeroSectionOne } from "../components/WebsiteHero"; // Hero section
import { Carousel, Card } from "../components/apple"; // Carousel section
import Plan from "../components/pricingCard"
import Table from "../components/fetaure";

// ------------------------
// Dummy content for Carousel
// ------------------------
const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => (
        <div
          key={"dummy-content" + index}
          className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
        >
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
            <span className="font-bold text-neutral-700 dark:text-neutral-200">
              The first rule of Apple club is that you boast about Apple club.
            </span>{" "}
            Keep a journal, quickly jot down a grocery list, and take amazing
            class notes. Want to convert those notes to text? No problem.
            Langotiya jeetu ka mara hua yaar is ready to capture every
            thought.
          </p>
          <img
            src="https://assets.aceternity.com/macbook.png"
            alt="Macbook mockup from Aceternity UI"
            height="500"
            width="500"
            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
          />
        </div>
      ))}
    </>
  );
};

// ------------------------
// Carousel data
// ------------------------
const carouselData = [
  { category: "Artificial Intelligence", title: "You can do more with AI.", src: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=3556&auto=format&fit=crop&ixlib=rb-4.0.3", content: <DummyContent /> },
  { category: "Productivity", title: "Enhance your productivity.", src: "https://images.unsplash.com/photo-1531554694128-c4c6665f59c2?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3", content: <DummyContent /> },
  { category: "Product", title: "Launching the new Apple Vision Pro.", src: "https://images.unsplash.com/photo-1713869791518-a770879e60dc?q=80&w=2333&auto=format&fit=crop&ixlib=rb-4.0.3", content: <DummyContent /> },
  { category: "Product", title: "Maps for your iPhone 15 Pro Max.", src: "https://images.unsplash.com/photo-1599202860130-f600f4948364?q=80&w=2515&auto=format&fit=crop&ixlib=rb-4.0.3", content: <DummyContent /> },
  { category: "iOS", title: "Photography just got better.", src: "https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3", content: <DummyContent /> },
  { category: "Hiring", title: "Hiring for a Staff Software Engineer", src: "https://images.unsplash.com/photo-1511984804822-e16ba72f5848?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3", content: <DummyContent /> },
];

// ------------------------
// CardsCarousel component
// ------------------------
export function CardsCarouselSection() {
  const cards = carouselData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <section className="w-full py-24 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Explore Our Features
        </h2>
        <p className="mt-4 text-gray-600 dark:text-neutral-300 text-lg md:text-xl max-w-3xl">
          Discover how our tools and solutions can help you build, optimize, and grow your projects efficiently.
        </p>
      </div>

      <div className="mt-12">
        <Carousel items={cards} />
      </div>
    </section>
  );
}



export function Website() {
  return (
    <>
      <HeroSectionOne  />
      <CardsCarouselSection />
      <Plan />
      <Table />
    </>
  );
}
