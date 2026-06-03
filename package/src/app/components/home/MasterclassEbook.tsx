"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const EBOOK_POSTER = "/images/event/Masterebook.webp";
const MEMBERSHIP_PATH = "/tncmasterclass";

/** Rolling 7-day offer window for countdown (client-only tick) */
const OFFER_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

const BENEFITS = [
  "Free eBook Included",
  "Exclusive Member-Only Content",
  "Expert Insights & Training",
  "Instant Access After Purchase",
] as const;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: number): TimeLeft {
  const diff = Math.max(0, target - Date.now());
  let s = Math.floor(diff / 1000);
  const days = Math.floor(s / 86400);
  s %= 86400;
  const hours = Math.floor(s / 3600);
  s %= 3600;
  const minutes = Math.floor(s / 60);
  const seconds = s % 60;
  return { days, hours, minutes, seconds };
}

const pad = (n: number) => ("0" + Math.max(0, Math.floor(n))).slice(-2);

export default function MasterclassEbook(): React.ReactElement {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [offerEnd] = useState(() => Date.now() + OFFER_DURATION_MS);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calcTimeLeft(offerEnd));
    const t = window.setInterval(() => setTimeLeft(calcTimeLeft(offerEnd)), 1000);
    return () => window.clearInterval(t);
  }, [offerEnd]);

  useEffect(() => {
    const reveals = cardRef.current?.querySelectorAll(".reveal");
    if (!reveals?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const el = en.target as HTMLElement;
            const delay = parseInt(el.dataset?.delay || "0", 10);
            setTimeout(() => el.classList.add("in-view"), delay);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="event-section" aria-label="Masterclass membership ebook promotion">
      <div className="event-card" ref={cardRef} role="region" aria-labelledby="masterclassEbookTitle">
        <svg className="neon-outline" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
          <rect x="6" y="6" width="1188" height="608" rx="20" ry="20" fill="none" strokeWidth="3" className="neon-path" />
        </svg>

        <div className="bg-layers" aria-hidden="true">
          <div className="gradient-blob g1" />
          <div className="gradient-blob g2" />
          <div className="scanline" />
        </div>

        <div className="event-content">
          <div className="eyebrow reveal" data-delay="80">
            CREDITOR ACADEMY
          </div>

          <h2 id="masterclassEbookTitle" className="hero reveal" data-delay="140">
            Masterclass Membership + <span className="highlight">Free eBook Access</span>
          </h2>

          <p className="sub reveal" data-delay="200">
            Join our Masterclass Membership today and receive a FREE &ldquo;I Want Remedy Now&rdquo; eBook
            instantly.
          </p>

          <p className="desc reveal" data-delay="260">
            Unlock exclusive training, powerful strategies, premium resources, and practical guidance
            designed to help you take action and achieve results faster.
          </p>

          <ul className="benefit-list reveal" data-delay="300" aria-label="Membership benefits">
            {BENEFITS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="desc reveal" data-delay="340">
            Start your journey today and claim your bonus now.
          </p>

          <div className="cta-row">
            <Link
              href={MEMBERSHIP_PATH}
              className="btn btn-primary reveal"
              data-delay="380"
              aria-label="Join Masterclass membership"
            >
              <span className="btn-content">Join Masterclass</span>
              <svg
                className="btn-arrow"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="countdown-wrap reveal" data-delay="420" aria-live="polite">
              <div className="countdown" role="status">
                <div className="cd-label">Offer ends in</div>
                {mounted ? (
                  <div className="time-grid">
                    <div className="time-part">
                      <div className="num">{timeLeft.days}</div>
                      <div className="label">Days</div>
                    </div>
                    <div className="sep">:</div>
                    <div className="time-part">
                      <div className="num">{pad(timeLeft.hours)}</div>
                      <div className="label">Hours</div>
                    </div>
                    <div className="sep">:</div>
                    <div className="time-part">
                      <div className="num">{pad(timeLeft.minutes)}</div>
                      <div className="label">Mins</div>
                    </div>
                    <div className="sep">:</div>
                    <div className="time-part">
                      <div className="num">{pad(timeLeft.seconds)}</div>
                      <div className="label">Secs</div>
                    </div>
                  </div>
                ) : (
                  <div className="time-grid" aria-hidden="true">
                    <div className="time-part">
                      <div className="num">—</div>
                      <div className="label">Days</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="info-row reveal" data-delay="460">
            <div>
              <div className="date">Masterclass Membership</div>
              <div className="time">Free &ldquo;I Want Remedy Now&rdquo; eBook included</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <a href="tel:+14254009246" className="phone-pill reveal" data-delay="500">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ marginRight: 8 }}>
                  <path
                    d="M22 16.92v2a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.1 5.18 2 2 0 0 1 5 3h2a2 2 0 0 1 2 1.72l.18 1.6a2 2 0 0 1-.57 1.68l-1.2 1.2a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 1.68-.57l1.6.18A2 2 0 0 1 22 16.92"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                425-400-9246
              </a>
            </div>
          </div>
        </div>

        <div className="speaker-wrap">
          <div className="speaker-card reveal" data-delay="160" tabIndex={0} aria-label="Masterclass ebook poster">
            <div className="stripe" aria-hidden="true" />
            <div className="speaker-photo-wrap">
              <img src={EBOOK_POSTER} alt="I Want Remedy Now ebook" className="speaker-photo" loading="lazy" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        :root{ --bg-start: #001428; --bg-mid: #002b5c; --bg-end: #0066cc; --accent: #66d0ff; --accent-2: #4fc3ff; --muted: rgba(200,210,220,0.88); }
        *{box-sizing:border-box}
        .event-section{font-family:Inter,Montserrat,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;line-height:1.25;margin:0;color:var(--muted);-webkit-font-smoothing:antialiased}
        .event-section{background:linear-gradient(180deg,var(--bg-start) 0%, var(--bg-mid) 50%, var(--bg-end) 100%); padding:24px 18px; overflow-x:hidden}
        .event-card{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,1fr);align-items:stretch;gap:28px;padding:22px;border-radius:20px;background:linear-gradient(180deg, rgba(0,20,40,0.85), rgba(0,30,60,0.9));backdrop-filter: blur(12px);box-shadow:0 18px 50px rgba(4,8,22,0.6);overflow:hidden;min-width:0;max-width:1200px;margin-inline:auto}
        .event-content, .speaker-wrap, .speaker-card { min-width: 0 }
        .event-content{align-self:start}
        .neon-outline{position:absolute;left:6px;right:6px;top:6px;bottom:6px;width:auto;height:auto;pointer-events:none;border-radius:20px;z-index:0}
        .neon-path{stroke:#66baff44;stroke-linejoin:round;filter:drop-shadow(0 8px 28px rgba(102,186,255,0.08));stroke-opacity:0.95;stroke-dasharray: 1600;stroke-dashoffset:0; }
        .bg-layers{position:absolute;inset:0;pointer-events:none;border-radius:20px;overflow:hidden;z-index:0}
        .gradient-blob{position:absolute;filter:blur(64px);opacity:0.9;mix-blend-mode:screen}
        .g1{width:560px;height:560px;left:-8vw;top:-10vw;background:radial-gradient(circle at 30% 30%, rgba(4,80,160,0.36), rgba(4,80,160,0.02));}
        .g2{width:420px;height:420px;right:-8vw;bottom:-6vw;background:radial-gradient(circle at 70% 30%, rgba(0,150,255,0.22), rgba(0,150,255,0.01));}
        .scanline{position:absolute;inset:0;background-image:repeating-linear-gradient(180deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.00) 2px);opacity:0.04;mix-blend-mode:overlay;}
        .event-content{position:relative;z-index:4;display:flex;flex-direction:column;gap:12px;padding-right:6px;min-width:0}
        .eyebrow{display:inline-block;width:fit-content;background:linear-gradient(90deg,#9dd4f5,#c5e9ff);color:#0a2540;padding:5px 10px;border-radius:999px;font-weight:700;font-size:10px;letter-spacing:0.35px;line-height:1.2;box-shadow:0 2px 8px rgba(75,170,255,0.08)}
        .hero{font-size:clamp(20px, 3.2vw, 32px);line-height:1.08;margin:4px 0 0;font-weight:800;color:rgba(255,255,255,0.98);letter-spacing:-0.4px;position:relative}
        .highlight{background:#ffd119;-webkit-background-clip:text;background-clip:text;color:transparent}
        .sub{font-weight:700;color:rgba(235,245,255,0.95);margin-top:4px;font-size:15px;line-height:1.45}
        .desc{color:var(--muted);font-size:15px;margin-top:4px;max-width:640px;line-height:1.5}
        .benefit-list{list-style:none;padding:0;margin:6px 0 0;display:flex;flex-direction:column;gap:6px;max-width:640px}
        .benefit-list li{font-size:14px;font-weight:600;color:rgba(255,255,255,0.92);padding-left:14px;position:relative;line-height:1.4}
        .benefit-list li::before{content:"•";position:absolute;left:0;color:#66d0ff;font-weight:700}
        .cta-row { display: flex; gap: 12px; align-items: center; margin-top: 14px; flex-wrap:wrap }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 14px 28px; border-radius: 999px; border: 0; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; cursor: pointer; outline-offset: 3px; position: relative; min-width: 180px; text-decoration: none; }
        .btn-primary { background: #026fe2; color: #fff; border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 4px 14px rgba(2, 111, 226, 0.22); transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease; }
        .btn-primary:hover { background: #1a7ee8; color: #fff; transform: translateY(-1px); box-shadow: 0 6px 18px rgba(2, 111, 226, 0.28); }
        .btn-primary:active { transform: translateY(0); background: #0259bd; box-shadow: 0 2px 10px rgba(2, 111, 226, 0.2); }
        .btn-primary:focus-visible { outline: 2px solid #66d0ff; outline-offset: 3px; }
        .btn-arrow { flex-shrink: 0; opacity: 0.95; transition: transform 0.2s ease; }
        .btn-primary:hover .btn-arrow { transform: translateX(3px); }
        .countdown-wrap{display:flex;align-items:center}
        .countdown{display:flex;flex-direction:column;gap:6px;padding:10px 14px;border-radius:12px;background:linear-gradient(180deg, rgba(0,20,40,0.65), rgba(0,30,60,0.7));backdrop-filter: blur(8px);border:1px solid rgba(255,255,255,0.12);min-width:240px;text-align:center}
        .cd-label{font-size:12px;color:rgba(255,255,255,0.82);font-weight:700}
        .time-grid{display:flex;align-items:center;gap:8px;justify-content:center}
        .time-part{display:flex;flex-direction:column;align-items:center;min-width:56px}
        .time-part .num{font-weight:900;font-size:20px;color:rgba(255,255,255,0.98);letter-spacing:0.6px}
        .time-part .label{font-size:11px;color:rgba(255,255,255,0.74);font-weight:700;margin-top:4px}
        .sep{font-weight:900;color:rgba(255,255,255,0.9);font-size:18px}
        .info-row{display:flex;gap:18px;align-items:center;margin-top:14px;color:rgba(255,255,255,0.92);flex-wrap:wrap}
        .date{font-weight:900;color:#59b6ff;font-size:16px}
        .time{color:rgba(255,255,255,0.92);font-weight:700;font-size:14px}
        .phone-pill{display:inline-flex;align-items:center;gap:8px;white-space:nowrap;color:#59b6ff;font-weight:700;text-decoration:none;font-size:14px}
        .phone-pill:hover{color:#7ec8ff}
        .speaker-wrap{position:relative;z-index:5;display:flex;align-items:stretch;justify-content:center;height:100%;min-height:100%}
        .speaker-card{width:100%;max-width:none;height:100%;min-height:480px;display:flex;flex-direction:column;border-radius:20px;background:linear-gradient(180deg, rgba(0,20,40,0.75), rgba(0,30,60,0.8));padding:14px;border:1px solid rgba(255,255,255,0.1);box-shadow:0 20px 50px rgba(0,12,30,0.6);position:relative;overflow:visible}
        .speaker-photo-wrap{flex:1;width:100%;min-height:0;border-radius:14px;padding:8px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));display:flex;align-items:center;justify-content:center}
        .speaker-photo{display:block;width:100%;height:100%;min-height:440px;max-height:min(72vh,640px);object-fit:contain;object-position:center;border-radius:10px}
        .stripe{position:absolute;height:120%;width:22px;right:-6px;top:-10%;background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02));transform:skewY(-18deg);border-radius:999px}
        .reveal{opacity:0;transform:translateY(18px) translateZ(0);transition:all 700ms cubic-bezier(.2,.9,.26,1)}
        .reveal.in-view{opacity:1;transform:translateY(0)}
        @media (max-width:980px){
          .event-card{grid-template-columns:1fr;gap:18px;padding:16px}
          .speaker-wrap{order:1;display:flex;justify-content:center;height:auto;min-height:0}
          .speaker-card{min-height:0;max-width:480px;margin-inline:auto}
          .speaker-photo{min-height:320px;max-height:480px;height:auto;width:100%}
          .hero{font-size:clamp(18px, 5vw, 26px)}
          .cta-row{flex-direction:column;align-items:stretch}
          .cta-row .btn{width:100%}
          .countdown{min-width:unset;width:100%}
          .info-row{flex-direction:column;align-items:flex-start;gap:8px}
          .phone-pill{margin-left:0}
        }
        @media (max-width:640px){
          .event-section{padding:14px 12px}
          .event-card{padding:12px;gap:12px}
          .speaker-photo{min-height:280px;max-height:400px}
        }
        @media (prefers-reduced-motion:reduce){ .reveal{transition:none} }
      `}</style>
    </section>
  );
}
