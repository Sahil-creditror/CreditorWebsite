"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import NavigationLink from "../../shared/navigation-link";
import { useEffect, useState } from "react";

interface ScoreData {
  number: number;
  numberValue?: string;
  scoreDescp: string;
}

interface StatsFactData {
  number: string;
  name: string;
  heading: string;
  description: string;
  scoreData: ScoreData[];
}

// Array of different hover colors for each stat card
const hoverColors = [
  "text-blue-500",  // Blue
  "text-emerald-500", // Green
  "text-purple-500",  // Purple
  "text-amber-500",   // Amber
];

// 🔹 helper function to format numbers as K, M, B
const formatNumber = (value: number): string => {
  if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1) + "B";
  if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
  if (value >= 1_000) return (value / 1_000).toFixed(1) + "K";
  return value.toString();
};

function StatsFacts() {
  const [statsFactData, setStatsFactData] = useState<StatsFactData | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/youtube-stats"); // 🔹 API route
        if (!res.ok) throw new Error("Failed to fetch stats");
        const yt = await res.json();

        const data: StatsFactData = {
          number: "01",
          name: "Stats & Facts",
          heading: "Trusted numbers from Creditor Academy",
          description:
            "We measure success through impact — every learner, every view, and every debt eliminated counts.",
          scoreData: [
            {
              number: yt.viewCount || 0,
              scoreDescp: "YouTube Views",
            },
            {
              number: 1673,
              scoreDescp: "Live Learners",
            },
            {
              number: 1275432,
              scoreDescp: "Total Debt Eliminated",
            },
            {
              number: yt.subscriberCount || 0,
              scoreDescp: "YouTube Subscribers",
            },
          ],
        };

        setStatsFactData(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!statsFactData) {
    return (
      <section className="py-20 md:py-40 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">Loading stats...</p>
      </section>
    );
  }

  return (
    <section className="relative bg-white dark:bg-secondary overflow-hidden">
      {/* Bubble Background Animations */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-100/30 dark:bg-blue-500/10"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>
      
      <div className="relative py-20 md:py-40 z-10">
        <div className="container">
          <div className="flex flex-col xl:flex-row items-start gap-8">
            {/* Left Badge */}
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              <span className="bg-primary py-1.5 px-2.5 text-base font-medium rounded-full dark:text-secondary">
                {statsFactData.number}
              </span>
              <div className="h-px w-16 bg-black/12 dark:bg-white/12" />
              <p className="section-bedge py-1.5 px-4 rounded-full">
                {statsFactData.name}
              </p>
            </div>

            {/* Heading + Stats */}
            <div className="flex flex-col gap-11">
              <div className="flex flex-col gap-5">
                <h2 className="max-w-3xl">{statsFactData.heading}</h2>
                <p className="max-w-xl text-secondary/70 dark:text-white/70">
                  {statsFactData.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {statsFactData.scoreData.map((value, index) => (
                  <div
                    ref={ref}
                    key={index}
                    className={`
                      group
                      flex flex-col items-start gap-4
                      p-6 rounded-2xl border border-secondary/12 dark:border-white/12 
                      bg-white/50 dark:bg-secondary/30
                      shadow-sm 
                      transition-all duration-300 ease-in-out
                      hover:shadow-xl hover:-translate-y-2 hover:border-current
                      relative overflow-hidden
                    `}
                  >
                    {/* Individual bubble for this card */}
                    <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-blue-100/30 dark:bg-blue-500/10 group-hover:opacity-50 transition-all duration-700 group-hover:scale-150"></div>
                    
                    <h3 className={`text-5xl md:text-6xl xl:text-7xl font-bold transition-colors duration-300 group-hover:${hoverColors[index % hoverColors.length]}`}>
                      {inView ? (
                        <CountUp
                          start={0}
                          end={value.number}
                          duration={3}
                          formattingFn={formatNumber} // 🔹 apply formatting
                        />
                      ) : (
                        "0"
                      )}
                      <span>+</span>
                    </h3>
                    <p className={`text-base text-secondary/70 dark:text-white/70 transition-colors duration-300 group-hover:${hoverColors[index % hoverColors.length]}`}>
                      {value.scoreDescp}
                    </p>
                  </div>
                ))}
              </div>

              <div>
                <NavigationLink
                  navigationTitle="Who we are"
                  navigationLink="/about"
                  transform={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background */}
      <div className="absolute -bottom-28 -left-20">
        <Image
          src={"/images/home/statsfact/sectionbg.png"}
          alt="background"
          height={590}
          width={590}
          className="dark:hidden"
        />
        <Image
          src={"/images/home/statsfact/sectionbgdark.png"}
          alt="background dark"
          height={590}
          width={590}
          className="hidden dark:block"
        />
      </div>

      {/* CSS for bubble animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-50px) translateX(20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) translateX(0) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}

export default StatsFacts;