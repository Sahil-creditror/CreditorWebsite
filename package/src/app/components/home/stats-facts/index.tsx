"use client";
import Image from "next/image";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import NavigationLink from "../../shared/navigation-link";
import { useEffect, useState } from "react";
import { FaYoutube, FaUsers, FaDollarSign, FaUserAlt } from "react-icons/fa";

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

// Array of different colors for each stat card
const statConfig = [
  {
    color: "text-red-500",  // YouTube Red
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    icon: <FaYoutube className="w-6 h-6" />,
    bubbleColor: "bg-red-500/10",
    delay: 0.1
  },
  {
    color: "text-emerald-500", // Green
    bgColor: "bg-emerald-500/10",
    borderColor: "border-emerald-500/30",
    icon: <FaUsers className="w-6 h-6" />,
    bubbleColor: "bg-emerald-500/10",
    delay: 0.2
  },
  {
    color: "text-blue-500",  // Blue
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    icon: <FaDollarSign className="w-6 h-6" />,
    bubbleColor: "bg-blue-500/10",
    delay: 0.3
  },
  {
    color: "text-amber-500",   // Amber
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    icon: <FaUserAlt className="w-6 h-6" />,
    bubbleColor: "bg-amber-500/10",
    delay: 0.4
  },
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
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

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [inView, hasAnimated]);

  if (!statsFactData) {
    return (
      <section className="relative bg-white dark:bg-secondary overflow-hidden py-20 md:py-40">
        <div className="container">
          <div className="flex flex-col xl:flex-row items-start gap-8">
            {/* Skeleton loading state */}
            <div className="flex items-center py-3 gap-4 md:gap-8 w-full max-w-xl">
              <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
              <div className="h-px w-16 bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex flex-col gap-11 w-full">
              <div className="flex flex-col gap-5">
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex flex-col items-start gap-4 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-100/50 dark:bg-gray-800/50">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                    <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                ))}
              </div>
              
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-40"></div>
            </div>
          </div>
        </div>
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
            className="absolute rounded-full bg-blue-300/40 dark:bg-blue-500/40"
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
      
      {/* Gradient fade at bottom for seamless transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent dark:from-secondary z-20 pointer-events-none"></div>
      
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
                      p-6 rounded-2xl border ${statConfig[index].borderColor}
                      ${statConfig[index].bgColor}
                      shadow-sm 
                      transition-all duration-500 ease-out
                      hover:shadow-xl hover:-translate-y-2 hover:border-current
                      relative overflow-hidden
                      ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                    `}
                    style={{
                      transitionDelay: `${statConfig[index].delay}s`
                    }}
                  >
                    {/* Icon */}
                    <div className={`p-3 rounded-full ${statConfig[index].bgColor} ${statConfig[index].color} transition-all duration-500 group-hover:scale-110`}>
                      {statConfig[index].icon}
                    </div>
                    
                    {/* Individual bubble for this card */}
                    <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full ${statConfig[index].bubbleColor} group-hover:opacity-50 transition-all duration-700 group-hover:scale-150`}></div>
                    
                    <h3 className={`text-4xl md:text-5xl xl:text-6xl font-bold ${statConfig[index].color}`}>
                      {inView ? (
                        <CountUp
                          start={0}
                          end={value.number}
                          duration={3}
                          formattingFn={formatNumber}
                          onEnd={() => {
                            // Add a subtle pulse effect when counting completes
                            const element = document.getElementById(`stat-${index}`);
                            if (element) {
                              element.classList.add('animate-pulse');
                              setTimeout(() => {
                                element.classList.remove('animate-pulse');
                              }, 1000);
                            }
                          }}
                        />
                      ) : (
                        "0"
                      )}
                      <span className="ml-1">+</span>
                    </h3>
                    <p className={`text-base text-secondary/70 dark:text-white/70 group-hover:${statConfig[index].color.replace('text-', 'text-')} transition-colors duration-300`}>
                      {value.scoreDescp}
                    </p>
                  </div>
                ))}
              </div>

              <div className={`transition-opacity duration-700 delay-700 ${hasAnimated ? 'opacity-100' : 'opacity-0'}`}>
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
      <div className="absolute -bottom-20 -left-60 animate-spin-slow opacity-50">
        <Image
          src={"/images/home/statsfact/sectionbg.png"}
          alt="background"
          height={800}
          width={800}
          className="dark:hidden"
        />
        <Image
          src={"/images/home/statsfact/sectionbg.png"}  //darktheme
          alt="background dark"
          height={800}
          width={800}
          className="hidden dark:block"
        />
      </div>

      {/* CSS for bubble animation */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translate(-50%, -50%) translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-40px) translateX(20px) rotate(180deg);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0) translateX(0) rotate(360deg);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default StatsFacts;