"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import CourseVideoPlayer from '@/app/components/shared/CourseVideoPlayer';
import {
    FaCheckCircle, FaArrowRight, FaClock, FaUsers,
    FaChartLine, FaShieldAlt, FaUserSecret, FaCrown,
    FaUserCheck, FaBrain, FaMoneyBillWave, FaLandmark
} from 'react-icons/fa';

interface WebinarBootcampProps {
    title: string;
    badgeText?: string;
    description: string;
    imageSrc?: string;
    youtubeVideoId?: string;
    driveVideoId?: string;
    driveViewUrl?: string;
    videoPosterSrc?: string;
    features: {
        title: string;
        description: string;
        iconName: string;
    }[];
}

const getIcon = (name: string) => {
    switch (name) {
        case 'tactical': return <FaUserSecret />;
        case 'shield': return <FaShieldAlt />;
        case 'banking': return <FaChartLine />;
        case 'status': return <FaUserCheck />;
        case 'crown': return <FaCrown />;
        case 'mindset': return <FaBrain />;
        case 'wealth': return <FaMoneyBillWave />;
        case 'investing': return <FaChartLine />;
        case 'legacy': return <FaLandmark />;
        default: return <FaCheckCircle />;
    }
};

const WebinarBootcamp: React.FC<WebinarBootcampProps> = ({
    title,
    badgeText = "Live Bootcamp",
    description,
    imageSrc,
    youtubeVideoId,
    driveVideoId,
    driveViewUrl,
    videoPosterSrc,
    features,
}) => {
    const hasVideo = Boolean(youtubeVideoId?.trim() || driveVideoId?.trim());
    return (
        <section className="relative w-full py-10 px-4 md:px-8 overflow-hidden font-sans bg-gradient-to-br from-blue-50/80 via-white to-indigo-50/50">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] -z-10 animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-100/30 rounded-full blur-[120px] -z-10 animate-pulse-slow delay-1000"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center">

                    {/* Content Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center order-2 lg:order-1"
                    >

                        {/* Interactive Badge */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-blue-200 text-blue-700 text-[10px] font-bold uppercase tracking-wider w-fit mb-4 shadow-sm cursor-default hover:shadow-md transition-shadow"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            {badgeText}
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                            Join the <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 animate-gradient-x">
                                {title} Bootcamp
                            </span>
                        </h2>

                        <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-6 font-medium max-w-lg">
                            {description}
                        </p>

                        {/* Interactive Features */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -2, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                                    className="flex gap-3 items-start group cursor-default p-2 rounded-xl transition-all"
                                >
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-blue-100 flex items-center justify-center text-blue-600 text-lg shadow-sm group-hover:shadow-md group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
                                        {getIcon(feature.iconName)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors leading-tight mb-1">{feature.title}</h4>
                                        <p className="text-xs text-slate-500 leading-normal">{feature.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA & Social Proof */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Link
                                href="/webinar"
                                className="relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <button className="relative w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold text-base shadow-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all overflow-hidden">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                                    Register Now
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </Link>

                            <div className="flex items-center gap-3">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-[2px] border-white bg-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                                            <FaUsers className="text-slate-400 text-[10px]" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-xs font-medium text-slate-500">
                                    <div className="text-slate-900 font-bold">100+</div>
                                    <div>Registered</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 relative"
                    >
                        {hasVideo ? (
                            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-[6px] border-white bg-white p-2">
                                <CourseVideoPlayer
                                    title={`${title} overview`}
                                    youtubeId={youtubeVideoId}
                                    driveFileId={driveVideoId}
                                    driveViewUrl={driveViewUrl}
                                    posterSrc={videoPosterSrc}
                                />
                            </div>
                        ) : imageSrc ? (
                            <div className="group relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/10 border-[6px] border-white transform transition-transform duration-500 hover:scale-[1.01]">
                                <Image
                                    src={imageSrc}
                                    alt={title}
                                    width={800}
                                    height={1000}
                                    className="object-cover w-full h-[500px] bg-slate-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    <div className="flex items-center gap-2 text-white font-bold">
                                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                        Registrations Open
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/5 border-[8px] border-white bg-gradient-to-br from-white to-blue-50 min-h-[500px] flex items-center justify-center p-12 text-center group hover:shadow-blue-900/15 transition-all duration-500">
                                {/* Animated Background Rings */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
                                    <div className="w-[600px] h-[600px] border border-blue-100 rounded-full absolute animate-[spin_20s_linear_infinite]"></div>
                                    <div className="w-[450px] h-[450px] border border-blue-200 rounded-full absolute animate-[spin_25s_linear_infinite_reverse]"></div>
                                </div>

                                <div className="relative z-10 max-w-sm">
                                    <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-blue-600 text-5xl mx-auto mb-8 shadow-2xl shadow-blue-100/50 transform group-hover:-translate-y-2 transition-transform duration-300">
                                        <FaClock />
                                    </div>
                                    <h3 className="text-3xl font-bold text-slate-900 mb-4 group-hover:text-blue-700 transition-colors">Session Starting Soon</h3>
                                    <p className="text-lg text-slate-500 mb-8">Secure your spot in the queue. Limited seats available for this exclusive session.</p>
                                    <div className="px-6 py-2 bg-blue-50 text-blue-700 font-bold rounded-full text-sm inline-block ring-1 ring-blue-100">
                                        High Demand
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WebinarBootcamp;
