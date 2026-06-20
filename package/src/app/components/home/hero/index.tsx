"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import HeroContactOverlay from "./ContactOverlay";

const HeroSection = () => {

  const [showContactForm,setShowContactForm] = useState<boolean>(false);


  const heroContent = {
    title:"Become a Member",
    description:"Protect What You Build. Pass On What Matters.",
    bgImage:"/images/hero/Bannerhero.webp",
  };


  return (

<div className="relative min-h-screen w-full flex items-center overflow-hidden bg-[#071B52] text-white">


{/* BACKGROUND */}

<div className="absolute inset-0">

<Image
src={heroContent.bgImage}
alt="Hero background"
fill
priority
quality={90}
sizes="100vw"
className="object-cover object-center"
/>


<div className="absolute inset-0 bg-gradient-to-r from-[#060a1c]  to-[#123A9E]/30" />
<div className="absolute inset-0 bg-gradient-to-t from-[#060a1c]/80 via-transparent to-transparent"/>


</div>





{/* Glow */}

<div className="absolute left-0 top-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-400/20 blur-[160px] rounded-full"/>





{/* CONTACT BUTTON */}
{/* 
<div className="absolute top-24 right-6 z-20 sm:right-10">


<button

onClick={()=>setShowContactForm(true)}

className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-xl rounded-full px-4 py-1 transition"

>


<span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">


<svg
width="14"
height="14"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2.5"
strokeLinecap="round"
strokeLinejoin="round"
>

<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>

</svg>


</span>


<span className="text-xs font-bold uppercase tracking-widest">

Get In Touch

</span>


</button>


</div> */}






{/* CONTENT */}


<div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-20 pt-24">


<motion.div

initial={{opacity:0,y:40}}

animate={{opacity:1,y:0}}

transition={{duration:.7}}

className="max-w-2xl"

>



{/* Badge */}


<div className="inline-flex items-center gap-2 mb-8 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-4 py-2">


<span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>


<span className="text-xs font-bold uppercase tracking-widest text-white/80">

Membership Open

</span>


</div>





<div className="w-12 h-1 bg-cyan-300 rounded-full mb-8"/>





{/* Heading */}


<h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">


Become a{" "}


<span className="bg-gradient-to-r from-cyan-300 to-white bg-clip-text text-transparent">

Member

</span>


</h1>





<p className="mt-6 max-w-lg text-base sm:text-lg text-white/70 leading-relaxed">


{heroContent.description}


</p>







{/* Buttons */}


<div className="mt-10 flex flex-wrap items-center gap-4">



<Link

href="/masterclass-membership"

className="group inline-flex items-center gap-3 bg-white text-[#123A9E] font-extrabold text-sm uppercase tracking-wider rounded-full pl-7 pr-2 py-2 shadow-xl hover:-translate-y-1 transition"

>


Start Now


<span className="w-10 h-10 rounded-full bg-[#123A9E] text-white flex items-center justify-center transition-transform group-hover:rotate-45">


<svg
width="15"
height="15"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2.5"
strokeLinecap="round"
strokeLinejoin="round"
>

<line x1="7" y1="17" x2="17" y2="7"/>

<polyline points="7 7 17 7 17 17"/>

</svg>


</span>


</Link>





<Link

href="/about-us"

className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition"

>


Learn More


<svg
width="15"
height="15"
viewBox="0 0 24 24"
fill="none"
stroke="currentColor"
strokeWidth="2"
strokeLinecap="round"
strokeLinejoin="round"
>

<line x1="5" y1="12" x2="19" y2="12"/>

<polyline points="12 5 19 12 12 19"/>

</svg>


</Link>



</div>





{/* TRUST */}

<div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">


<div className="flex items-center gap-2">

<span className="w-2 h-2 rounded-full bg-green-400"/>

Private Education

</div>



<div className="flex items-center gap-2">

<span className="w-2 h-2 rounded-full bg-cyan-300"/>

Exclusive Access

</div>


</div>



</motion.div>



</div>







{/* MODAL */}


<AnimatePresence>

{showContactForm && (

<HeroContactOverlay

onClose={()=>setShowContactForm(false)}

/>

)}


</AnimatePresence>



</div>

  );
};


export default HeroSection;