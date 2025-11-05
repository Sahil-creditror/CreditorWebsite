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

    // Continuous ticker loop (circular)
    React.useEffect(() => {
        let raf = 0;
        let last = performance.now();
        const step = (now: number) => {
            const dt = (now - last) / 1000; // seconds
            last = now;
            const delta = -speedPxPerSec * dt; // move left
            setTranslate(prev => {
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
    }, [contentWidth, speedPxPerSec]);

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


