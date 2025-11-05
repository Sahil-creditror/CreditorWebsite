"use client";

import React from "react";

export default function SqueezeEmbed() {
    const [isMounted, setIsMounted] = React.useState(false);
    const [loaded, setLoaded] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    // Load embed script once when mounted
    React.useEffect(() => {
        if (!isMounted) return;
        const existing = document.querySelector("script[data-we-embed='true']") as HTMLScriptElement | null;
        if (existing) return; // already present elsewhere
        const s = document.createElement("script");
        s.src = "https://api.wonderengine.ai/js/form_embed.js";
        s.async = true;
        s.setAttribute("data-we-embed", "true");
        document.body.appendChild(s);
        return () => {
            // keep script for subsequent navigations
        };
    }, [isMounted]);

    return (
        <div className="w-full" style={{ minHeight: 484 }}>
            {isMounted && (
                <iframe
                    src="https://api.wonderengine.ai/widget/form/Xc230hBV5AURVzetXQJX"
                    style={{ width: "100%", height: loaded ? 484 : 484, border: "none", borderRadius: 12 }}
                    id="inline-Xc230hBV5AURVzetXQJX"
                    data-layout="{'id':'INLINE'}"
                    data-trigger-type="alwaysShow"
                    data-trigger-value=""
                    data-activation-type="alwaysActivated"
                    data-activation-value=""
                    data-deactivation-type="neverDeactivate"
                    data-deactivation-value=""
                    data-form-name="Squeeze Form"
                    data-height="484"
                    data-layout-iframe-id="inline-Xc230hBV5AURVzetXQJX"
                    data-form-id="Xc230hBV5AURVzetXQJX"
                    title="Squeeze Form"
                    onLoad={() => setLoaded(true)}
                />
            )}
        </div>
    );
}


