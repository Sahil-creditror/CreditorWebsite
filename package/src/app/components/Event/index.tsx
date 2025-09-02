// declare module '*.png' {
//   const value: string;
//   export default value;
// }

"use client";

import React, { useEffect, useRef, useState } from "react";

interface TimeLeft {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function EventPromoSectionEnhanced(): React.ReactElement {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const speakerCardRef = useRef<HTMLDivElement | null>(null);
  const primaryCtaRef = useRef<HTMLButtonElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const stateRef = useRef<{ tx: number; ty: number; x: number; y: number }>({ tx: 0, ty: 0, x: 0, y: 0 });

  // Widget URL
  const WIDGET_URL = 'https://api.wonderengine.ai/widget/form/o69tKOXv3NV8GnS4aGls';

  // Countdown target: 11:15 AM Pacific Standard Time (PST, fixed UTC-8) on Sep 6, 2025
  // Using a fixed -08:00 offset so the timestamp always represents "PST" rather than DST-aware zones.
  const TARGET_TS = new Date('2025-09-06T11:15:00-08:00').getTime();

  const calcTimeLeft = (target: number): TimeLeft => {
    const diff = target - Date.now();
    if (diff <= 0) return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
    let s = Math.floor(diff / 1000);
    const days = Math.floor(s / 86400);
    s %= 86400;
    const hours = Math.floor(s / 3600);
    s %= 3600;
    const minutes = Math.floor(s / 60);
    const seconds = s % 60;
    return { expired: false, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calcTimeLeft(TARGET_TS));

  useEffect(() => {
    const t = window.setInterval(() => setTimeLeft(calcTimeLeft(TARGET_TS)), 1000);
    return () => window.clearInterval(t);
  }, []);

  // Entrance reveal (IntersectionObserver)
  useEffect(() => {
    const reveals = cardRef.current?.querySelectorAll('.reveal');
    if (!reveals || reveals.length === 0) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const el = en.target as HTMLElement;
          const delay = parseInt(el.dataset?.delay || '0', 10);
          setTimeout(() => el.classList.add('in-view'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(r => io.observe(r));
    return () => io.disconnect();
  }, []);

  // Mouse-driven parallax (translation-only) — tilt removed
  useEffect(() => {
    const card = cardRef.current;
    const speaker = speakerCardRef.current;
    if (!card || !speaker) return;

    let active = false;

    const onPointerEnter = () => { active = true; };
    const onPointerMove = (e: PointerEvent) => {
      if (!active) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / rect.width;
      const py = (e.clientY - cy) / rect.height;
      stateRef.current.tx = px;
      stateRef.current.ty = py;
      card.style.setProperty('--mx', (px * 36).toFixed(2) + 'px');
      card.style.setProperty('--my', (py * 36).toFixed(2) + 'px');
    };
    const onPointerLeave = () => {
      active = false;
      stateRef.current.tx = 0;
      stateRef.current.ty = 0;
      card.style.setProperty('--mx', '0px');
      card.style.setProperty('--my', '0px');
      speaker.style.transform = 'translate3d(0px, 0px, 0)';
      stateRef.current.x = 0;
      stateRef.current.y = 0;
    };

    const loop = () => {
      const s = stateRef.current;
      s.x += (s.tx - s.x) * 0.22;
      s.y += (s.ty - s.y) * 0.22;

      const translateX = (s.x * 8).toFixed(2);
      const translateY = (s.y * 5).toFixed(2);

      speaker.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

      rafRef.current = requestAnimationFrame(loop);
    };

    card.addEventListener('pointerenter', onPointerEnter);
    window.addEventListener('pointermove', onPointerMove as EventListener);
    card.addEventListener('pointerleave', onPointerLeave);

    loop();

    return () => {
      card.removeEventListener('pointerenter', onPointerEnter);
      window.removeEventListener('pointermove', onPointerMove as EventListener);
      card.removeEventListener('pointerleave', onPointerLeave);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // CTA ripple (mouse + keyboard)
  useEffect(() => {
    const btn = primaryCtaRef.current;
    if (!btn) return;

    const makeRipple = (clientX: number, clientY: number) => {
      const rect = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'cta-ripple';
      const size = Math.max(rect.width, rect.height) * 2.2;
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (clientX - rect.left) + 'px';
      ripple.style.top = (clientY - rect.top) + 'px';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 850);
    };

    const handleClick = (e: MouseEvent) => {
      if (timeLeft.expired) return;
      makeRipple(e.clientX, e.clientY);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (timeLeft.expired) return;
      if (e.key === 'Enter' || e.key === ' ') {
        const rect = btn.getBoundingClientRect();
        makeRipple(rect.left + rect.width / 2, rect.top + rect.height / 2);
      }
    };

    btn.addEventListener('click', handleClick as EventListener);
    btn.addEventListener('keydown', handleKey as EventListener);

    return () => {
      btn.removeEventListener('click', handleClick as EventListener);
      btn.removeEventListener('keydown', handleKey as EventListener);
    };
  }, [timeLeft.expired]);

  // Floating particle layer (creates decorative orbs)
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const layer = document.createElement('div');
    layer.className = 'particle-layer';
    card.appendChild(layer);

    const particles: HTMLElement[] = [];
    const count = 12;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const s = (Math.random() * 10 + 6).toFixed(2);
      p.style.width = p.style.height = `${s}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.opacity = `${0.06 + Math.random() * 0.18}`;
      layer.appendChild(p);
      particles.push(p);
    }

    return () => {
      layer.remove();
    };
  }, []);

  const [widgetOpen, setWidgetOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const pad = (n: number) => String(n).padStart(2, '0');

  const handleWidgetOpen = () => {
    if (timeLeft.expired) return;
    setIframeLoaded(false);
    setIframeError(false);
    setWidgetOpen(true);
  };

  const handleWidgetClose = () => {
    setWidgetOpen(false);
    if (iframeRef.current) {
      try {
        iframeRef.current.src = 'about:blank';
        setTimeout(() => {
          if (iframeRef.current) iframeRef.current.src = WIDGET_URL;
        }, 200);
      } catch (e) { }
    }
  };

  useEffect(() => {
    if (!widgetOpen) return;
    const onKey = (e: KeyboardEvent) => { if ((e as KeyboardEvent).key === 'Escape') handleWidgetClose(); };
    document.addEventListener('keydown', onKey as EventListener);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setTimeout(() => modalCloseRef.current?.focus(), 120);
    return () => {
      document.removeEventListener('keydown', onKey as EventListener);
      document.body.style.overflow = prev;
    };
  }, [widgetOpen]);

  const handleIframeError = () => setIframeError(true);
  const handleIframeLoad = () => { setIframeLoaded(true); setIframeError(false); };
  const openWidgetInNewTab = () => window.open(WIDGET_URL, '_blank', 'noopener,noreferrer');

  return (
    <section className="event-section" aria-label="Event promotion">
      <div className="event-card" ref={cardRef} role="region" aria-labelledby="eventTitle">

        <svg className="neon-outline" viewBox="0 0 1200 620" preserveAspectRatio="none" aria-hidden="true">
          <rect x="6" y="6" width="1188" height="608" rx="20" ry="20" fill="none" strokeWidth="3" className="neon-path" />
        </svg>

        <div className="bg-layers" aria-hidden="true">
          <div className="gradient-blob g1"></div>
          <div className="gradient-blob g2"></div>
          <div className="scanline" />
        </div>

        <div className="event-content">
          <div className="eyebrow reveal" data-delay="80">CREDITOR ACADEMY</div>

          <h1 id="eventTitle" className="hero reveal" data-delay="140">
            Exciting <span className="highlight">Giveaway</span> Opportunity <span className="highlight">Alert!</span>
            <span className="title-sheen" aria-hidden="true" />
          </h1>

          <div className="sub reveal" data-delay="220">Are You Ready To Become Private? <div className="winners-pill" aria-hidden="true"><span className="winners-number">$1000</span><span className="winners-text">Giveaway</span></div></div>

          <p className="desc reveal" data-delay="300">Join Creditor Academy for your chance to win $1000 and unlock exclusive insights into becoming private.</p>

          <div className="cta-row">
            <button
              ref={primaryCtaRef}
              id="primaryCta"
              className={`btn btn-primary reveal ${timeLeft.expired ? 'is-closed' : ''}`}
              data-delay="380"
              aria-label={timeLeft.expired ? 'Entry closed' : 'Enter to win a free consultation — opens form'}
              disabled={timeLeft.expired}
              onClick={() => { if (!timeLeft.expired) handleWidgetOpen(); }}
            >
              <span className="btn-content">{timeLeft.expired ? 'Entry Closed' : 'Enter to Win'}</span>
            </button>

            <div className="countdown-wrap reveal" data-delay="420" aria-live="polite">
              {!timeLeft.expired ? (
                <div className="countdown" role="status">
                  <div className="cd-label">Entry closed in</div>
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
                </div>
              ) : (
                <div className="closed-pill" role="status">Entry Closed for this event</div>
              )}
            </div>
          </div>

          <div className="info-row reveal" data-delay="480">
            <div>
              <div className="date">6 SEPTEMBER 2025</div>
              <div className="time">11:15 AM Pacific Time (PST)</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <div className="phone-pill reveal" data-delay="540">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ marginRight: 8 }}><path d="M21 16.5v3a2.25 2.25 0 0 1-2.25 2.25 19.5 19.5 0 0 1-8.475-2.475A19.5 19.5 0 0 1 3.225 6.225 19.5 19.5 0 0 1 5.7 2.25 2.25 2.25 0 0 1 7.95 0h3a2.25 2.25 0 0 1 2.25 1.912l.45 3.6a2.25 2.25 0 0 1-.675 2.05l-1.05.9a13.5 13.5 0 0 0 5.4 5.4l.9-1.05a2.25 2.25 0 0 1 2.05-.675l3.6.45A2.25 2.25 0 0 1 24 16.5z" fill="white"></path></svg>
                425-400-9246
              </div>
            </div>
          </div>
        </div>

        <div className="speaker-wrap">
          <div className="speaker-card reveal" data-delay="160" id="speakerCard" ref={speakerCardRef} tabIndex={0} aria-label="Speaker Paul Michael Rowland">
            <div className="stripe" aria-hidden="true"></div>

            <div className="speaker-photo-wrap">
              <img src='/images/event/event.png' alt="Paul Michael Rowland" className="speaker-photo" />
            </div>

            <div className="speaker-overlay" aria-hidden="true">
              <div className="overlay-text">Founder — Credit &amp; Finance</div>
            </div>
          </div>
        </div>

      </div>

      {widgetOpen && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Enter to win form"
          onClick={(e) => { if (e.target === e.currentTarget) handleWidgetClose(); }}
        >
          <div className="modal" role="document">
            <button
              className="modal-close"
              aria-label="Close form"
              onClick={handleWidgetClose}
              ref={modalCloseRef}
            >
              ×
            </button>

            <div className="iframe-wrapper" aria-live="polite">
              {!iframeLoaded && !iframeError && (
                <div className="iframe-spinner" aria-hidden="true">
                  <svg width="36" height="36" viewBox="0 0 50 50" aria-hidden="true"><circle cx="25" cy="25" r="20" strokeWidth="4" stroke="currentColor" fill="none" strokeLinecap="round" /></svg>
                  <div className="spinner-text">Loading form...</div>
                </div>
              )}

              {iframeError ? (
                <div className="iframe-error">
                  <p>Unable to embed the form here. You can open it in a new tab.</p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button className="btn btn-primary" onClick={openWidgetInNewTab}>Open in new tab</button>
                    <button className="btn btn-ghost" onClick={handleWidgetClose}>Close</button>
                  </div>
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  title="WonderEngine Enter Form"
                  src={WIDGET_URL}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                  aria-label="Enter to win form widget"
                />
              )}
              {!iframeError && (
                <div className="modal-footer">
                  <button className="btn btn-ghost" onClick={openWidgetInNewTab}>Open in new tab</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root{ --bg-start: #001428; --bg-mid: #002b5c; --bg-end: #0066cc; --accent: #66d0ff; --accent-2: #4fc3ff; --muted: rgba(200,210,220,0.88); }
        *{box-sizing:border-box}
        .event-section{font-family:Inter,Montserrat,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;line-height:1.25;margin:0;color:var(--muted);-webkit-font-smoothing:antialiased}
        .event-section{background:linear-gradient(180deg,var(--bg-start) 0%, var(--bg-mid) 50%, var(--bg-end) 100%);padding:24px 18px; overflow-x:hidden}

        /* Layout: desktop -> two columns (content + visual). Use minmax so the right column can shrink. */
        .event-card{position:relative;display:grid;grid-template-columns:1fr minmax(240px, 440px);gap:26px;padding:20px;border-radius:20px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02));backdrop-filter: blur(8px);box-shadow:0 18px 50px rgba(4,8,22,0.6);overflow:hidden;min-width:0;max-width:1200px;margin-inline:auto}

        /* prevent grid children from overflowing (important for responsive shrink) */
        .event-content, .speaker-wrap, .speaker-card { min-width: 0 }

        .neon-outline{position:absolute;left:6px;right:6px;top:6px;bottom:6px;width:auto;height:auto;pointer-events:none;border-radius:20px;z-index:0}
        .neon-path{stroke:#66baff44;stroke-linejoin:round;filter:drop-shadow(0 8px 28px rgba(102,186,255,0.08));stroke-opacity:0.95;stroke-dasharray: 1600;stroke-dashoffset:1600;animation: dash 6s linear infinite}
        @keyframes dash{0%{stroke-dashoffset:1600}50%{stroke-dashoffset:0}100%{stroke-dashoffset:-1600}}

        .bg-layers{position:absolute;inset:0;pointer-events:none;border-radius:20px;overflow:hidden;z-index:0}
        .gradient-blob{position:absolute;filter:blur(64px);opacity:0.9;mix-blend-mode:screen}
        .g1{width:560px;height:560px;left:-8vw;top:-10vw;background:radial-gradient(circle at 30% 30%, rgba(4,80,160,0.36), rgba(4,80,160,0.02));animation: blob 14s infinite linear}
        .g2{width:420px;height:420px;right:-8vw;bottom:-6vw;background:radial-gradient(circle at 70% 30%, rgba(0,150,255,0.22), rgba(0,150,255,0.01));animation: blob 18s infinite linear reverse}
        @keyframes blob{0%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(8px) rotate(28deg)}100%{transform:translateY(0) rotate(0deg)}}
        .scanline{position:absolute;inset:0;background-image:repeating-linear-gradient(180deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.00) 2px);opacity:0.04;mix-blend-mode:overlay;animation: scan 8s linear infinite}
        @keyframes scan{0%{transform:translateY(-4%)}100%{transform:translateY(4%)}}

        .event-content{position:relative;z-index:4;display:flex;flex-direction:column;gap:12px;padding-right:6px;min-width:0}
        .eyebrow{display:inline-block;background:linear-gradient(90deg,var(--accent),var(--accent-2));color:#00121a;padding:8px 14px;border-radius:999px;font-weight:700;font-size:12px;letter-spacing:0.6px;box-shadow:0 8px 22px rgba(75,170,255,0.06)}

        /* use clamp so the hero scales across device sizes */
        .hero{font-size:clamp(22px, 4.4vw, 40px);line-height:1.02;margin:4px 0 0;font-weight:800;color:rgba(255,255,255,0.98);letter-spacing:-0.4px;position:relative}
        .highlight{background:#ffd119;-webkit-background-clip:text;background-clip:text;color:transparent}
        .title-sheen{position:absolute;right:0;top:-6px;width:160px;height:28px;transform:skewX(-18deg);background:linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.18));mix-blend-mode:overlay;border-radius:6px;opacity:0.0;animation: sheent 3.6s infinite}
        @keyframes sheent{0%{opacity:0;transform:translateX(-40px) skewX(-18deg)}50%{opacity:0.9;transform:translateX(120px) skewX(-18deg)}100%{opacity:0;transform:translateX(300px) skewX(-18deg)}}
        .sub{font-weight:700;color:rgba(235,245,255,0.95);margin-top:6px}
        .desc{color:var(--muted);font-size:15px;margin-top:10px;max-width:640px}

        .winners-pill{display:inline-flex;align-items:center;gap:10px;margin-top:10px;margin-left:20px;padding:10px 12px;border-radius:100px;background:linear-gradient(90deg,#f8584aff,#fc4929ff);color:#fff;font-weight:700;box-shadow:0 8px 30px rgba(255,200,60,0.25);transform:translateZ(0);animation: pulse 3.2s ease-in-out infinite}
        @keyframes pulse{0%{box-shadow:0 8px 22px rgba(255,60,60,0.12)}50%{box-shadow:0 18px 60px rgba(255,60,60,0.3)}100%{box-shadow:0 8px 22px rgba(255,109,60,0.12)}}

        .cta-row { display: flex; gap: 12px; align-items: center; margin-top: 18px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 22px; border-radius: 999px; border: 0; font-weight: 800; font-size: 15px; cursor: pointer; outline-offset: 4px; position: relative; overflow: hidden; min-width: 170px; perspective: 1000px; }
        .btn-primary { background: linear-gradient(135deg, #00eaff, #0080ff, #7a00ff, #ff00c8, #ff6a00, #00eaff); background-size: 400% 400%; animation: gradientShift 10s ease infinite; color: #fff; text-shadow: 0 2px 6px rgba(0,0,0,0.35); box-shadow: 0 12px 30px rgba(0, 200, 255, 0.25); transform: translateZ(0); transition: transform 300ms ease, box-shadow 300ms ease; }
        @keyframes gradientShift { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        .btn-primary:hover { transform: translateY(-6px) scale(1.08) rotateX(6deg) rotateY(-6deg); box-shadow: 0 32px 80px rgba(0, 200, 255, 0.45), 0 0 40px rgba(255, 0, 200, 0.65); }
        .btn-primary::after { content: ""; position: absolute; left: -40%; top: -20%; width: 120%; height: 120%; transform: skewX(-20deg); background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.6), rgba(255,255,255,0.05)); opacity: 0; transition: all 600ms ease; }
        .btn-primary:hover::after { opacity: 1; left: 40%; }
        .btn-primary::before { content: ""; position: absolute; inset: -3px; border-radius: inherit; padding: 2px; background: linear-gradient(135deg, #00eaff, #0080ff, #7a00ff, #ff00c8, #ff6a00, #00eaff); background-size: 500% 500%; animation: borderShift 8s linear infinite; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.4s ease; }
        .btn-primary:hover::before { opacity: 1; }
        @keyframes borderShift { 0% { background-position: 0% 0% } 50% { background-position: 100% 100% } 100% { background-position: 0% 0% } }
        .cta-ripple { position: absolute; border-radius: 999px; transform: translate(-50%, -50%) scale(0); background: radial-gradient(circle at center, rgba(255,255,255,0.95), rgba(0, 200, 255,0.2)); pointer-events: none; animation: ripple-anim 700ms ease-out forwards; }
        @keyframes ripple-anim { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0.9 } 100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0 } }

        .countdown-wrap{display:flex;align-items:center}
        .countdown{display:flex;flex-direction:column;gap:6px;padding:10px 14px;border-radius:12px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));backdrop-filter: blur(6px);border:1px solid rgba(255,255,255,0.04);min-width:240px;text-align:center}
        .cd-label{font-size:12px;color:rgba(255,255,255,0.82);font-weight:700}
        .time-grid{display:flex;align-items:center;gap:8px;justify-content:center}
        .time-part{display:flex;flex-direction:column;align-items:center;min-width:56px}
        .time-part .num{font-weight:900;font-size:20px;color:rgba(255,255,255,0.98);letter-spacing:0.6px}
        .time-part .label{font-size:11px;color:rgba(255,255,255,0.74);font-weight:700;margin-top:4px}
        .sep{font-weight:900;color:rgba(255,255,255,0.9);font-size:18px}
        .closed-pill{padding:10px 14px;border-radius:999px;background:linear-gradient(90deg,#ff6677,#ff416c);color:white;font-weight:800;box-shadow:0 12px 34px rgba(255,65,90,0.18)}

        .info-row{display:flex;gap:18px;align-items:center;margin-top:18px;color:rgba(255,255,255,0.92)}
        .date{font-weight:900;color:#59b6ff;font-size:18px}
        .time{color:rgba(255,255,255,0.92);font-weight:700}

        .speaker-wrap{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:center}
        .speaker-card{width:100%;max-width:440px;border-radius:20px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02));padding:12px;border:1px solid rgba(255,255,255,0.03);box-shadow:0 20px 50px rgba(0,12,30,0.6);position:relative;overflow:visible;transform-origin:center center;transition:transform 360ms cubic-bezier(.2,.9,.26,1)}
        .speaker-card:focus{outline:2px solid rgba(102,186,255,0.12);outline-offset:6px}
        .speaker-photo-wrap{width:100%;border-radius:14px;padding:6px;background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));display:block}
        .speaker-photo{display:block;max-width:100%;height:auto;max-height:520px;object-fit:contain;border-radius:10px}
        .speaker-badge{position:absolute;left:14px;bottom:14px;background:linear-gradient(90deg,#66d0ff,#4fc3ff);color:#00121a;padding:8px 12px;border-radius:999px;font-weight:800;box-shadow:0 8px 22px rgba(0,0,0,0.28)}
        .stripe{position:absolute;height:120%;width:22px;right:-6px;top:-10%;background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02));transform:skewY(-18deg);border-radius:999px}
        .speaker-overlay{position:absolute;inset:0;border-radius:14px;display:flex;align-items:flex-end;justify-content:center;padding:16px;background:linear-gradient(180deg,transparent,rgba(0,0,0,0.32));opacity:0;transition:opacity 360ms}
        .speaker-card:hover .speaker-overlay,.speaker-card:focus .speaker-overlay{opacity:1}
        .overlay-text{color:white;font-weight:700;background:linear-gradient(90deg,rgba(0,0,0,0.35),rgba(0,0,0,0.55));padding:8px 12px;border-radius:8px}

        .particle-layer{position:absolute;inset:0;pointer-events:none;border-radius:20px;overflow:hidden;z-index:1}
        .particle{position:absolute;border-radius:50%;background:linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02));animation: floaty 8s infinite ease-in-out}
        @keyframes floaty{0%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.06)}100%{transform:translateY(0) scale(1)}}

        .reveal{opacity:0;transform:translateY(18px) translateZ(0);transition:all 700ms cubic-bezier(.2,.9,.26,1)}
        .reveal.in-view{opacity:1;transform:translateY(0)}

        /* Modal */
        .modal-overlay{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg, rgba(0,0,0,0.56), rgba(0,0,0,0.72)); z-index:9999; padding:24px; }
        .modal{ width:100%; max-width:980px; border-radius:12px; background:linear-gradient(180deg, rgba(10,18,28,0.96), rgba(6,14,22,0.96)); box-shadow:0 30px 80px rgba(0,0,0,0.6); position:relative; padding:18px; outline:none; }
        .modal-close{ position:absolute; right:12px; top:10px; background:red; color:var(--muted); border:0; font-size:28px; line-height:1; padding:6px 10px; border-radius:8px; cursor:pointer; }
        .modal-close:focus{outline:2px solid rgba(255, 0, 0, 0.12)}
        .iframe-wrapper{ min-height:320px; display:flex; flex-direction:column; gap:12px; }
        .iframe-wrapper iframe{ width:100%; height:min(62vh, 620px); border:0; border-radius:8px; background:white; }
        .iframe-spinner{ display:flex; align-items:center; gap:12px; color:var(--muted); }
        .iframe-spinner svg{animation: spin 1s linear infinite; color:var(--muted)}
        @keyframes spin{to{transform:rotate(360deg)}}
        .iframe-error{padding:18px; color:var(--muted)}
        .modal-footer{display:flex;justify-content:flex-end;gap:10px;margin-top:8px}

        /* Responsive tweaks */
        @media (max-width:980px){
          .event-card{grid-template-columns:1fr;gap:18px;padding:16px}
          .event-content{order:0}
          .speaker-wrap{order:1;display:flex;justify-content:center;align-items:center}
          .speaker-card{padding:10px}
          .speaker-photo{max-height:420px}
          .hero{font-size:clamp(20px, 6.4vw, 28px)}
          .desc{font-size:14px}
          .cta-row{flex-direction:column;align-items:stretch}
          .cta-row .btn{width:100%}
          .countdown{min-width:unset;width:100%}
          .info-row{flex-direction:column;align-items:flex-start;gap:8px}
          .phone-pill{margin-left:0}
          .event-card{max-width:calc(100% - 24px);}
        }
        @media (max-width:640px){
          .event-section{padding:14px 12px}
          .event-card{padding:12px;gap:12px}
          .hero{font-size:20px}
          .speaker-photo{max-height:360px}
          .winners-pill{margin-left:0}
          .cta-row .btn{padding:12px 16px;font-size:15px}
          .iframe-wrapper iframe{height:480px}
        }
        @media (max-width:420px){
          .hero{font-size:18px}
          .desc{font-size:13px}
          .speaker-photo{max-height:300px}
          .cta-row .btn{padding:10px 14px}
        }
        @media (prefers-reduced-motion:reduce){ .gradient-blob,.scanline,.cta-ripple,.particle{animation:none} .reveal{transition:none} }
      `}</style>
    </section>
  );
}
