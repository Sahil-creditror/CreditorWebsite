"use client";

import React from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

export default function MasterclassBenefits() {

  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
  });


  type BgCard = {
    type: "bg";
    title: string;
    description: string;
    bg: string;
  };

  type BlockCard = {
    type: "block";
    title: string;
    description: string;
    img: string;
    color: string;
  };


  const benefits: Array<BgCard | BlockCard> = [
    {
      type: "bg",
      title: "Become a Member",
      description:
        "Join Creditor Academy and unlock private education, exclusive resources, and a structured path toward financial freedom.",
      bg: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883732/creditor-website-assets/images/offers/enrollnew.png",
    },
    {
      type: "block",
      title: "Charge Your Card",
      description:
        "Activate your Creditor Card and enter a private economy built around access, opportunity, and member advantages.",
      img: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883727/creditor-website-assets/images/offers/card.webp",
      color: "from-slate-100 via-white to-slate-200",
    },
    {
      type: "block",
      title: "Unlock Courses & Connect",
      description:
        "Access premium courses, live masterclasses, and a private network designed for growth and collaboration.",
      img: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883729/creditor-website-assets/images/offers/courses.webp",
      color: "from-blue-50 via-white to-indigo-100",
    },
    {
      type: "bg",
      title: "Become Private",
      description:
        "Apply what you learn to operate privately, protect your assets, and build wealth on your own terms.",
      bg: "https://res.cloudinary.com/dlndnmuq1/image/upload/v1768883751/creditor-website-assets/images/offers/sovnew.png",
    },
  ];


  return (

<section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">


<div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-500/10 blur-[150px] rounded-full"/>



<div className="max-w-6xl mx-auto px-6 relative z-10">


<div className="text-center max-w-3xl mx-auto mb-20">

<span className="inline-flex px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest">
Strategic Growth Path
</span>


<h2 className="mt-6 text-4xl md:text-6xl font-black tracking-tight">

The{" "}

<span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
Freedom
</span>{" "}

Formula

</h2>


<p className="mt-5 text-slate-500 leading-relaxed">
A step-by-step framework designed to help you access knowledge, resources, and opportunities inside Creditor Academy.
</p>


</div>





<div ref={ref} className="relative space-y-16 md:space-y-24 before:absolute before:left-5 md:before:left-1/2 before:top-0 before:bottom-0 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-blue-200 before:to-transparent">


{benefits.map((item,index)=>{

const even=index%2===0;


return (

<motion.div
key={index}
initial={{opacity:0,y:40}}
animate={inView ? {opacity:1,y:0} : {}}
transition={{duration:.6,delay:index*.15}}
className={`relative flex flex-col md:flex-row gap-8 md:gap-14 ${even ? "md:flex-row" : "md:flex-row-reverse"}`}
>



<div className="absolute left-5 md:left-1/2 -top-1 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-[3px] border-blue-600 shadow-lg z-20"/>



<div className="w-full md:w-1/2 pl-12 md:pl-0 flex items-center">

<div className="max-w-md">


<p className="text-xs font-black uppercase tracking-widest text-blue-600 mb-3">
Stage 0{index+1}
</p>


<h3 className="text-2xl font-black text-slate-900">
{item.title}
</h3>


<p className="mt-4 text-sm leading-relaxed text-slate-500">
{item.description}
</p>


<div className="mt-5 flex items-center gap-2 text-sm font-bold text-slate-700">

<Check size={16} className="text-blue-600"/>

Premium Member Access

</div>


</div>

</div>





<div className="w-full md:w-1/2 pl-12 md:pl-0">

<div className="relative h-[240px] md:h-[300px] rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl group">


{item.type==="bg" && (

<Image
src={item.bg}
alt={item.title}
fill
className="object-cover group-hover:scale-105 transition duration-700"
/>

)}



{item.type==="block" && (

<>

<div className={`absolute inset-0 bg-gradient-to-br ${item.color}`}/>


<Image
src={item.img}
alt={item.title}
width={400}
height={300}
className="relative z-10 w-full h-full object-contain p-8 group-hover:scale-105 transition duration-500"
/>

</>

)}



<div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>



<div className="absolute top-5 right-5 bg-white/90 rounded-full w-10 h-10 flex items-center justify-center font-bold text-slate-700 shadow">

0{index+1}

</div>


</div>

</div>




</motion.div>

)

})}


</div>





<div className="mt-24 flex justify-center">

<a
href="/masterclass-membership"
className="group inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold shadow-xl hover:-translate-y-1 transition"
>

Initialize Membership


<span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-45 transition">

<ArrowUpRight size={18}/>

</span>


</a>


</div>


</div>


</section>

  );
}