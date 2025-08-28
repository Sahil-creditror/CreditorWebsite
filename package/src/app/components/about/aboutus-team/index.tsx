"use client";

import Image from "next/image";

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
      image: "/images/team/placeholder.webp",
      bio: "We’re expanding our leadership team. Stay tuned!",
    },
  ];

  return (
    <>
      <style>{`
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
          border-radius: 1rem;
          padding: 4px;
          background: linear-gradient(270deg, #1e0492ff, #22d3ee, #818cf8);
          background-size: 800% 800%;
          animation: gradientBorder 8s ease infinite;
        }
        .animated-border > .inner-card {
          background-color: #fff;
          border-radius: 0.75rem;
          height: 100%;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04);
          transition: background 0.3s, color 0.3s;
        }
        /* Dark Mode */
        .dark .animated-border > .inner-card {
          background-color: #161925;
          color: #f8fafc;
          box-shadow: 0 10px 15px -3px rgba(68,89,160,0.10), 0 4px 6px -2px rgba(50,50,110,0.08);
        }
        .dark .animated-border {
          background: linear-gradient(270deg, #312e81, #38bdf8, #818cf8);
        }
      `}</style>

      <div className="border-t-8 border-b-8 border-blue-900"> {/* Dark blue thick border top and bottom */}
        <section className="py-16 md:py-24 bg-gray-50 dark:bg-[#101322] transition-colors duration-300">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Meet Our <span className="text-primary">Founders</span>
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
                    <p className="text-primary font-medium dark:text-sky-400">{member.role}</p>
                    <p className="mt-3 text-secondary dark:text-zinc-200 text-sm">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AboutusTeam;
