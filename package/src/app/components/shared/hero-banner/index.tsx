"use client";
import Image from "next/image";

const Herobanner = ({
  bannerimage,
  heading,
  desc,
  headingClass = "large-heading",
}: {
  bannerimage: string;
  heading: string;
  desc: string;
  headingClass?: string;
}) => {
  const splitDesc = desc.split(/<\/?span>/);

  return (
    <section className="relative flex items-end text-white bg-black h-[80vh] sm:h-screen max-h-[650px]">
      {/* Background image */}
      <Image
        className="absolute inset-0 w-full h-full object-cover"
        alt="Hero background"
        src={bannerimage}
        height={694}
        width={1800}
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col gap-4 sm:gap-6 pb-10 sm:pb-16 xl:pb-20">
          {/* Description */}
          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-6">
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex-shrink-0">
              <Image
                src={"/images/Icon/primary-leaf.svg"}
                alt="icon"
                width={44}
                height={44}
                className="animate-spin"
              />
            </div>
            <p className="text-white/80 max-w-md text-sm sm:text-base md:text-lg leading-relaxed">
              {splitDesc[0]}
              <span className="text-primary">{splitDesc[1]}</span>
              {splitDesc[2]}
            </p>
          </div>

          {/* Heading + Button */}
          <div className="flex flex-col sm:flex-row sm:items-end lg:items-baseline gap-4">
            <h1
              className={`${headingClass ? headingClass : "large-heading"} text-2xl sm:text-4xl md:text-5xl font-bold`}
            >
              {heading}
            </h1>
            <div className="self-start sm:self-auto bg-primary rounded-full pl-6 sm:pl-8 p-1 sm:p-1.5">
              <div className="bg-white p-2 sm:p-3 md:p-5 rounded-full">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5"
                >
                  <path
                    d="M1.33337 1.33331H14.6667M14.6667 1.33331V14.6666M14.6667 1.33331L1.33337 14.6666"
                    stroke="#1F2A2E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herobanner;
