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
    <section className="relative flex items-end text-white bg-black h-[100vh] bg-fixed sm:h-screen max-h-[650px]">
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

          {/* Heading only */}
            <h1
            className={`${headingClass ? headingClass : "medium-heading"} text-base sm:text-2xl md:text-3xl font-semibold`}
            >
            {heading}
            </h1>

        </div>
      </div>
    </section>
  );
};

export default Herobanner;
