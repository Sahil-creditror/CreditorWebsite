"use client";

import Image from "next/image";
import { useEffect } from "react";

// Rest of your component code...

const AboutusTeam = () => {
  const team = [
    {
      name: "Paul Michale",
      role: "Founder & CEO",
      image: "/images/team/Paul.webp",
      bio: "Paul founded Creditor Academy with the mission to make financial literacy accessible and transformative.",
    },
    {
      name: "Team Member",
      role: "Coming Soon",
      image: "/images/team/placeholder.webp", // 👈 placeholder image
      bio: "We’re expanding our leadership team. Stay tuned!",
    },
  ];

  // Optional: Ensure dark mode correct colors - you may customize colors as needed

  return (
    <>
      <style>{`
        /* Animated gradient border */
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animated-border {
          position: relative;
          border-radius: 1rem; /* match rounded-2xl */
          padding: 4px; /* border thickness */
          background: linear-gradient(270deg, #1e0492ff, #22d3ee, #818cf8);
          background-size: 800% 800%;
          animation: gradientBorder 8s ease infinite;
        }
        .animated-border > .inner-card {
          background-color: white;
          border-radius: 0.75rem; /* slightly less than outer */
          height: 100%;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
        }
        /* Dark mode overrides */
        @media (prefers-color-scheme: dark) {
          .animated-border > .inner-card {
            background-color: #ffffffff; /* dark:bg-secondary replacement */
            color: white;
          }
        }
      `}</style>

      <section className="py-16 md:py-24 bg-gray-50 dark:bg-background">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Meet Our{" "}
            <span className="text-primary">Founders</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <div key={index} className="animated-border">
                <div className="inner-card">
                  <div className="w-40 h-40 relative mb-6">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="mt-3 text-secondary dark:text-white text-sm">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutusTeam;
