"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

const Herobanner = ({
  bannerimage,
  heading,
  desc,
  headingClass,
}: {
  bannerimage: string;
  heading: string;
  desc: string;
  headingClass?: string;
}) => {
  const pathname = usePathname();
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
        quality={85}
        sizes="100vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="flex flex-col gap-4 sm:gap-6 pb-10 sm:pb-16 xl:pb-20">
          {/* Logo (replaces previous description area) */}
          <div className="flex items-start">
            {pathname !== "/" ? (
              <Link href="/" className="hover:opacity-80 transition-opacity">
                <Image
                  src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png"
                  alt="Creditor Logo"
                  width={280}
                  height={72}
                  priority
                  className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto object-contain"
                />
              </Link>
            ) : (
              <Image
                src="https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883691/creditor-website-assets/images/logo/creditorlogo.png"
                alt="Creditor Logo"
                width={280}
                height={72}
                priority
                className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto object-contain"
              />
            )}
          </div>

          {/* Heading + Button */}
          <div className="flex items-baseline gap-4 flex-wrap">
            <h1
              className={`${headingClass ? headingClass : "medium-heading"
                } text-base sm:text-2xl md:text-3xl font-semibold`}
            >
              {heading}
            </h1>
            <button className="group flex items-center gap-2 px-5 py-2 rounded-2xl bg-primary text-white font-medium text-sm sm:text-base transition-all duration-300 shadow-md hover:bg-primary/90 hover:scale-105">
              Enroll Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herobanner;
