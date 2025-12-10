"use client";

import React from "react";

type Props = {
    items: string[];
    className?: string;
    pillClassName?: string;
    speedPxPerSec?: number; // positive number; content scrolls left
};

export default function Marquee({ items, className = "", pillClassName = "", speedPxPerSec = 60 }: Props) {
    const trackRef = React.useRef<HTMLDivElement | null>(null);
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [contentWidth, setContentWidth] = React.useState(0);
    const [translate, setTranslate] = React.useState(0);
    const [inView, setInView] = React.useState(true);
    const [reduceMotion, setReduceMotion] = React.useState(false);

    // Respect prefers-reduced-motion
    React.useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) return;
        const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduceMotion(mql.matches);
        update();
        mql.addEventListener("change", update);
        return () => mql.removeEventListener("change", update);
    }, []);

    // Measure content width
    React.useEffect(() => {
        const measure = () => {
            if (!contentRef.current) return;
            setContentWidth(contentRef.current.getBoundingClientRect().width);
        };
        measure();
        const ro = new ResizeObserver(measure);
        if (trackRef.current) ro.observe(trackRef.current);
        if (contentRef.current) ro.observe(contentRef.current);
        const onResize = () => measure();
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("resize", onResize);
            ro.disconnect();
        };
    }, [items.join("|")]);

    // Track visibility for pause/resume
    React.useEffect(() => {
        const node = trackRef.current;
        if (!node) return;
        let lastIntersecting = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                lastIntersecting = entry.isIntersecting;
                setInView(entry.isIntersecting && !document.hidden);
            },
            { threshold: 0.1 }
        );
        observer.observe(node);
        const onVisibility = () => setInView(lastIntersecting && !document.hidden);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    // Continuous ticker loop (circular) — paused when off-screen or reduced motion
    React.useEffect(() => {
        if (reduceMotion || !inView) return;
        let raf = 0;
        let last = performance.now();
        const step = (now: number) => {
            const dt = (now - last) / 1000; // seconds
            last = now;
            const delta = -speedPxPerSec * dt; // move left
            setTranslate((prev) => {
                let next = prev + delta;
                // when first copy fully out of view, wrap by adding its width
                if (contentWidth > 0) {
                    while (next <= -contentWidth) next += contentWidth;
                }
                return next;
            });
            raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [contentWidth, speedPxPerSec, reduceMotion, inView]);

    return (
        <div ref={trackRef} className={`relative overflow-hidden ${className}`}>
            <div
                className="flex gap-3 whitespace-nowrap will-change-transform"
                style={{ transform: `translateX(${translate}px)` }}
            >
                <div ref={contentRef} className="flex gap-3">
                    {items.map((label) => (
                        <span key={label} className={pillClassName}>
                            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                            <span>{label}</span>
                        </span>
                    ))}
                </div>
                <div aria-hidden="true" className="flex gap-3">
                    {items.map((label, i) => (
                        <span key={`${label}-dup-${i}`} className={pillClassName}>
                            <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
                            <span>{label}</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}


