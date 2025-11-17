"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const AboutusTeam = () => {
  const member = {
    name: "PaulMichael Rowland",
    role: "Founder & CEO",
    image: "/images/team/Paul.webp",
    bio: "Paul founded Creditor Academy with the mission to make financial literacy accessible and transformative.",
  };

  return (
    <section className="py-16 md:py-24 bg-lightgray dark:bg-darkblack">
      <style>{`
        @keyframes gradientPan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-card-border {
          padding: 6px;
          border-radius: 1.5rem;
          background: linear-gradient(270deg, #026fe2, #38bdf8, #06b6d4);
          background-size: 200% 200%;
          animation: gradientPan 8s ease infinite;
        }
        .card-inner {
          border-radius: 1.25rem;
          background: #ffffff;
          box-shadow: 0 10px 25px rgba(2, 111, 226, 0.12);
        }
        .dark .card-inner {
          background: #181f22;
          box-shadow: 0 10px 25px rgba(6, 182, 212, 0.12);
        }
      `}</style>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <h2>Meet Our Founder</h2>
            <div className="mt-4">
              <h3>{member.name}</h3>
              <p className="text-primary font-medium dark:text-blue-300">{member.role}</p>
            </div>
            <p className="mt-6 text-secondary/70 dark:text-white/70">{member.bio}</p>
          </div>
          <motion.div
            className="relative w-full flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
          >
            <div className="animated-card-border w-full max-w-sm">
              <div className="card-inner relative overflow-hidden">
                <div className="relative w-full h-72">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutusTeam;
