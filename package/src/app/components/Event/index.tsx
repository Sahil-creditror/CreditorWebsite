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

  // Robust Pacific Time (America/Los_Angeles) helpers with DST handling
  const getLAOffsetMinutes = (dateUTC: Date) => {
    const LA_TZ = 'America/Los_Angeles';
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: LA_TZ, timeZoneName: 'shortOffset' });
    const text = fmt.format(dateUTC); // e.g., "... GMT-7"
    const match = text.match(/GMT([+-]?\d{1,2})(?::?(\d{2}))?/);
    if (!match) return 0;
    const sign = match[1].startsWith('-') ? -1 : 1;
    const hours = Math.abs(parseInt(match[1], 10));
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    // Return NEGATED offset minutes so: UTC = local + offsetMinutes
    return -(sign * (hours * 60 + minutes));
  };

  const getLAParts = (date: Date) => {
    const LA_TZ = 'America/Los_Angeles';
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: LA_TZ,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      weekday: 'short',
      hour12: false,
    });
    const parts = formatter.formatToParts(date);
    const lookup = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
    const weekdayText = parts.find((p) => p.type === 'weekday')?.value ?? 'Sun';
    const weekdayIndexMap: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return {
      year: Number(lookup('year')),
      month: Number(lookup('month')),
      day: Number(lookup('day')),
      hour: Number(lookup('hour')),
      minute: Number(lookup('minute')),
      second: Number(lookup('second')),
      weekdayIndex: weekdayIndexMap[weekdayText] ?? 0,
    };
  };

  // Get next Saturday 11:15 AM America/Los_Angeles in UTC millis (handles DST correctly)
  const getNextSaturdayEvent = (): number => {
    const now = new Date();
    const laNow = getLAParts(now);
    const targetHourLA = 11;
    const targetMinuteLA = 15;

    const addDaysCalendar = (year: number, month: number, day: number, daysToAdd: number) => {
      const ms = Date.UTC(year, month - 1, day) + daysToAdd * 24 * 60 * 60 * 1000;
      const d = new Date(ms);
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() };
    };

    // Days to add from LA perspective to reach Saturday (6)
    let daysToAdd = (6 - laNow.weekdayIndex + 7) % 7; // 0..6
    // If today is Saturday and time has passed 11:15, move to next Saturday
    if (daysToAdd === 0 && (laNow.hour > targetHourLA || (laNow.hour === targetHourLA && laNow.minute >= targetMinuteLA))) {
      daysToAdd = 7;
    }

    const laTarget = addDaysCalendar(laNow.year, laNow.month, laNow.day, daysToAdd);

    // Determine correct UTC offset for that calendar date using noon to avoid DST edge hour
    const offsetMinutes = getLAOffsetMinutes(new Date(Date.UTC(laTarget.year, laTarget.month - 1, laTarget.day, 12, 0, 0)));

    // Build UTC milliseconds for 11:15 LA time: UTC = local + offset
    const utcMillis =
      Date.UTC(laTarget.year, laTarget.month - 1, laTarget.day, targetHourLA, targetMinuteLA, 0) +
      offsetMinutes * 60 * 1000;

    return utcMillis;
  };

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

  // Initialize with stable values to avoid SSR/CSR hydration mismatches
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ expired: false, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentEventDate, setCurrentEventDate] = useState<number>(0);

  useEffect(() => {
    const nextEvent = getNextSaturdayEvent();
    setCurrentEventDate(nextEvent);
    // Prime immediately on mount, then tick every second
    setTimeLeft(calcTimeLeft(nextEvent));
    
    const t = window.setInterval(() => {
      setTimeLeft(prevTimeLeft => {
        const currentEvent = getNextSaturdayEvent();
        const timeLeftResult = calcTimeLeft(currentEvent);
        
        // If event has expired, get the next Saturday event and restart countdown
        if (timeLeftResult.expired) {
          const newEventDate = getNextSaturdayEvent();
          setCurrentEventDate(newEventDate);
          return calcTimeLeft(newEventDate);
        }
        
        return timeLeftResult;
      });
    }, 1000);
    
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

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (prefersReduced?.matches) return;

    let active = false;
    const stopLoop = () => {
      if (rafRef.current != null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const onPointerEnter = () => {
      active = true;
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
    };
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
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(loop);
    };

    const loop = () => {
      const s = stateRef.current;
      s.x += (s.tx - s.x) * 0.22;
      s.y += (s.ty - s.y) * 0.22;

      const translateX = (s.x * 8).toFixed(2);
      const translateY = (s.y * 5).toFixed(2);

      speaker.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;

      const nearlyIdle = !active && Math.abs(s.tx - s.x) < 0.001 && Math.abs(s.ty - s.y) < 0.001;
      if (nearlyIdle) {
        stopLoop();
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    card.addEventListener('pointerenter', onPointerEnter);
    window.addEventListener('pointermove', onPointerMove as EventListener);
    card.addEventListener('pointerleave', onPointerLeave);

    const onVisibility = () => {
      if (!document.hidden) return;
      active = false;
      stateRef.current.tx = 0;
      stateRef.current.ty = 0;
      speaker.style.transform = 'translate3d(0px, 0px, 0)';
      stopLoop();
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      card.removeEventListener('pointerenter', onPointerEnter);
      window.removeEventListener('pointermove', onPointerMove as EventListener);
      card.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      stopLoop();
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

  // Modal state
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const modalCloseRef = useRef<HTMLButtonElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const pad = (n: number) => {
    const value = Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
    return ('0' + value).slice(-2);
  };

  // Format the event date in America/Los_Angeles
  const formatEventDate = (timestamp: number): string => {
    const LA_TZ = 'America/Los_Angeles';
    const date = new Date(timestamp);
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: LA_TZ,
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).formatToParts(date);
    const lookup = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
    const day = lookup('day');
    const month = (lookup('month') || '').toUpperCase();
    const year = lookup('year');
    return `${day} ${month} ${year}`;
  };

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
            Exciting Opportunity
            {/* <span className="highlight">Giveaway</span>  */} 
            <span className="highlight"> Alert! </span>
            <span className="title-emoji">🎄</span>
            <span className="title-sheen" aria-hidden="true" />
          </h1>

          <div className="sub reveal" data-delay="220" style={{ marginTop: '2rem' }}>Curious what it's like to be part of Creditor Academy? 
            {/* <div className="winners-pill" aria-hidden="true">
              <span className="winners-number">
                $1000
              </span>
              <span className="winners-text">
                Giveaway
              </span>
            </div> */}
          </div>

          <p className="desc reveal" data-delay="300">Join our Free Non-Member Orientation held every Saturday and discover everything we offer — from private education and trust setup to credit mastery and financial freedom. See why thousands are choosing to live, build, and thrive in the private.</p>

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
              <span className="btn-content">{timeLeft.expired ? 'Entry Closed' : 'Join Now'}</span>
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
              <div className="date">{currentEventDate ? formatEventDate(currentEventDate) : 'Loading...'}</div>
              <div className="time">11:15 AM Pacific Time (PST)</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <div className="phone-pill reveal" data-delay="540">
                <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" style={{ marginRight: 8 }}>
                  <path d="M22 16.92v2a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3.1 5.18 2 2 0 0 1 5 3h2a2 2 0 0 1 2 1.72l.18 1.6a2 2 0 0 1-.57 1.68l-1.2 1.2a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 1.68-.57l1.6.18A2 2 0 0 1 22 16.92" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                425-400-9246
              </div>
            </div>
          </div>
        </div>

        <div className="speaker-wrap">
          <div className="speaker-card reveal" data-delay="160" id="speakerCard" ref={speakerCardRef} tabIndex={0} aria-label="Speaker Paul Michael Rowland">
            <div className="stripe" aria-hidden="true"></div>

            <div className="speaker-photo-wrap">
              <img src='/public/images/event/event27.webp' alt="Paul Michael Rowland" className="speaker-photo" />
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
        :root{ 
          --bg-start: #0a1a0f; 
          --bg-mid: #1a2e1a; 
          --bg-end: #0d1a0d; 
          --accent: #ffd700; 
          --accent-2: #ff6b6b; 
          --muted: rgba(255,255,255,0.88);
          --christmas-red: #dc2626;
          --christmas-green: #16a34a;
          --christmas-gold: #fbbf24;
        }
        *{box-sizing:border-box}
        .event-section{font-family:Inter,Montserrat,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;line-height:1.25;margin:0;color:var(--muted);-webkit-font-smoothing:antialiased}
        .event-section{
          background:linear-gradient(180deg,var(--bg-start) 0%, var(--bg-mid) 50%, var(--bg-end) 100%);
          background-image: 
            url('/images/haloween/christmas.webp'),
            radial-gradient(circle at 20% 30%, rgba(22, 163, 74, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.1) 0%, transparent 70%);
          background-size: cover, auto, auto, auto;
          background-position: center, center, center, center;
          background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
          background-blend-mode: overlay, normal, normal, normal;
          padding:24px 18px; 
          overflow-x:hidden;
          position:relative;
        }
        .event-section::before{
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(180deg, rgba(10, 26, 15, 0.7) 0%, rgba(22, 46, 26, 0.6) 50%, rgba(13, 26, 13, 0.7) 100%);
          background-image:
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity:1;
          pointer-events:none;
          z-index:0;
        }
        .event-section::after{
          content:'';
          position:absolute;
          inset:0;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px);
          pointer-events:none;
          animation: snow-fall 20s linear infinite;
        }
        @keyframes snow-fall{
          0%{background-position:0 0, 0 0}
          100%{background-position:0 100px, 100px 0}
        }

        /* Layout: desktop -> two columns (content + visual). Use minmax so the right column can shrink. */
        .event-card{
          position:relative;
          display:grid;
          grid-template-columns:1fr minmax(240px, 440px);
          gap:26px;
          padding:20px;
          border-radius:20px;
          background:linear-gradient(180deg, rgba(10, 26, 15, 0.95), rgba(22, 46, 26, 0.9));
          backdrop-filter: blur(12px);
          box-shadow:0 18px 50px rgba(0,0,0,0.6), 0 0 40px rgba(22, 163, 74, 0.2);
          overflow:hidden;
          min-width:0;
          max-width:1200px;
          margin-inline:auto;
          border:2px solid rgba(251, 191, 36, 0.2);
        }

        /* prevent grid children from overflowing (important for responsive shrink) */
        .event-content, .speaker-wrap, .speaker-card { min-width: 0 }

        .neon-outline{position:absolute;left:6px;right:6px;top:6px;bottom:6px;width:auto;height:auto;pointer-events:none;border-radius:20px;z-index:0}
        .neon-path{
          stroke:#ffd700;
          stroke-linejoin:round;
          filter:drop-shadow(0 0 8px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 16px rgba(255, 215, 0, 0.4));
          stroke-opacity:0.8;
          stroke-dasharray: 1600;
          stroke-dashoffset:1600;
          animation: dash 6s linear infinite;
        }
        @keyframes dash{0%{stroke-dashoffset:1600}50%{stroke-dashoffset:0}100%{stroke-dashoffset:-1600}}

        .bg-layers{position:absolute;inset:0;pointer-events:none;border-radius:20px;overflow:hidden;z-index:0}
        .gradient-blob{position:absolute;filter:blur(64px);opacity:0.6;mix-blend-mode:screen}
        .g1{
          width:560px;
          height:560px;
          left:-8vw;
          top:-10vw;
          background:radial-gradient(circle at 30% 30%, rgba(22, 163, 74, 0.4), rgba(22, 163, 74, 0.05));
          animation: blob 14s infinite linear;
        }
        .g2{
          width:420px;
          height:420px;
          right:-8vw;
          bottom:-6vw;
          background:radial-gradient(circle at 70% 30%, rgba(220, 38, 38, 0.3), rgba(220, 38, 38, 0.05));
          animation: blob 18s infinite linear reverse;
        }
        @keyframes blob{0%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(8px) rotate(28deg)}100%{transform:translateY(0) rotate(0deg)}}
        .scanline{
          position:absolute;
          inset:0;
          background-image:repeating-linear-gradient(180deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.00) 2px);
          opacity:0.06;
          mix-blend-mode:overlay;
          animation: scan 8s linear infinite;
        }
        @keyframes scan{0%{transform:translateY(-4%)}100%{transform:translateY(4%)}}

        .event-content{position:relative;z-index:4;display:flex;flex-direction:column;gap:12px;padding-right:6px;min-width:0;opacity:0.95}
        .eyebrow{
          display:inline-block;
          background:linear-gradient(90deg, #ffd700, #ff6b6b);
          color:#1a0f00;
          padding:8px 14px;
          border-radius:999px;
          font-weight:700;
          font-size:12px;
          letter-spacing:0.6px;
          box-shadow:0 8px 22px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 107, 107, 0.2);
          position:relative;
        }
        .eyebrow::after{
          content:'🎄';
          margin-left:6px;
        }

        /* use clamp so the hero scales across device sizes */
        .hero{font-size:clamp(22px, 4.4vw, 40px);line-height:1.02;margin:4px 0 0;font-weight:800;color:rgba(255,255,255,0.98);letter-spacing:-0.4px;position:relative;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
        .highlight{
          background:linear-gradient(135deg, #ffd700, #ff6b6b, #ffd700);
          background-size: 200% 200%;
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        .title-emoji{
          font-size:0.9em;
          animation: bounce 2s ease-in-out infinite;
          filter:drop-shadow(0 0 8px rgba(255, 215, 0, 0.6));
        }
        @keyframes bounce{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-8px) rotate(15deg)}}
        .title-sheen{
          position:absolute;
          right:0;
          top:-6px;
          width:160px;
          height:28px;
          transform:skewX(-18deg);
          background:linear-gradient(90deg, rgba(255,215,0,0.1), rgba(255,215,0,0.3));
          mix-blend-mode:overlay;
          border-radius:6px;
          opacity:0.0;
          animation: sheent 3.6s infinite;
        }
        @keyframes sheent{0%{opacity:0;transform:translateX(-40px) skewX(-18deg)}50%{opacity:0.9;transform:translateX(120px) skewX(-18deg)}100%{opacity:0;transform:translateX(300px) skewX(-18deg)}}
        .sub{font-weight:700;color:rgba(255,255,255,0.95);margin-top:6px}
        .desc{color:var(--muted);font-size:15px;margin-top:10px;max-width:640px}

        .winners-pill{display:inline-flex;align-items:center;gap:10px;margin-top:10px;margin-left:20px;padding:10px 12px;border-radius:100px;background:linear-gradient(90deg,#dc2626,#ff6b6b);color:#fff;font-weight:700;box-shadow:0 8px 30px rgba(220,38,38,0.4);transform:translateZ(0);animation: pulse 3.2s ease-in-out infinite}
        @keyframes pulse{0%{box-shadow:0 8px 22px rgba(220,38,38,0.3)}50%{box-shadow:0 18px 60px rgba(220,38,38,0.6)}100%{box-shadow:0 8px 22px rgba(220,38,38,0.3)}}

        .cta-row { display: flex; gap: 12px; align-items: center; margin-top: 18px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; gap: 10px; padding: 14px 22px; border-radius: 999px; border: 0; font-weight: 800; font-size: 15px; cursor: pointer; outline-offset: 4px; position: relative; overflow: hidden; min-width: 170px; perspective: 1000px; }
        .btn-primary { 
          background: linear-gradient(135deg, #dc2626, #ff6b6b, #ffd700, #16a34a, #dc2626); 
          background-size: 400% 400%; 
          animation: gradientShift 8s ease infinite; 
          color: #fff; 
          text-shadow: 0 2px 6px rgba(0,0,0,0.5); 
          box-shadow: 0 12px 30px rgba(220, 38, 38, 0.4), 0 0 20px rgba(255, 215, 0, 0.3); 
          transform: translateZ(0); 
          transition: transform 300ms ease, box-shadow 300ms ease; 
        }
        @keyframes gradientShift { 0% { background-position: 0% 50% } 50% { background-position: 100% 50% } 100% { background-position: 0% 50% } }
        .btn-primary:hover { 
          transform: translateY(-6px) scale(1.08) rotateX(6deg) rotateY(-6deg); 
          box-shadow: 0 32px 80px rgba(220, 38, 38, 0.6), 0 0 40px rgba(255, 215, 0, 0.5); 
        }
        .btn-primary::after { 
          content: ""; 
          position: absolute; 
          left: -40%; 
          top: -20%; 
          width: 120%; 
          height: 120%; 
          transform: skewX(-20deg); 
          background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.6), rgba(255,255,255,0.05)); 
          opacity: 0; 
          transition: all 600ms ease; 
        }
        .btn-primary:hover::after { opacity: 1; left: 40%; }
        .btn-primary::before { 
          content: ""; 
          position: absolute; 
          inset: -3px; 
          border-radius: inherit; 
          padding: 2px; 
          background: linear-gradient(135deg, #ffd700, #dc2626, #16a34a, #ffd700); 
          background-size: 500% 500%; 
          animation: borderShift 6s linear infinite; 
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); 
          -webkit-mask-composite: xor; 
          mask-composite: exclude; 
          opacity: 0; 
          transition: opacity 0.4s ease; 
        }
        .btn-primary:hover::before { opacity: 1; }
        @keyframes borderShift { 0% { background-position: 0% 0% } 50% { background-position: 100% 100% } 100% { background-position: 0% 0% } }
        .cta-ripple { 
          position: absolute; 
          border-radius: 999px; 
          transform: translate(-50%, -50%) scale(0); 
          background: radial-gradient(circle at center, rgba(255,215,0,0.8), rgba(220, 38, 38,0.3)); 
          pointer-events: none; 
          animation: ripple-anim 700ms ease-out forwards; 
        }
        @keyframes ripple-anim { 0% { transform: translate(-50%, -50%) scale(0); opacity: 0.9 } 100% { transform: translate(-50%, -50%) scale(1.4); opacity: 0 } }

        .countdown-wrap{display:flex;align-items:center}
        .countdown{
          display:flex;
          flex-direction:column;
          gap:6px;
          padding:10px 14px;
          border-radius:12px;
          background:linear-gradient(180deg, rgba(10, 26, 15, 0.8), rgba(22, 46, 26, 0.7));
          backdrop-filter: blur(8px);
          border:2px solid rgba(255, 215, 0, 0.3);
          min-width:240px;
          text-align:center;
          box-shadow:0 4px 20px rgba(0,0,0,0.3), inset 0 0 20px rgba(255, 215, 0, 0.1);
        }
        .cd-label{font-size:12px;color:rgba(255,255,255,0.9);font-weight:700}
        .time-grid{display:flex;align-items:center;gap:8px;justify-content:center}
        .time-part{display:flex;flex-direction:column;align-items:center;min-width:56px}
        .time-part .num{
          font-weight:900;
          font-size:20px;
          color:#ffd700;
          letter-spacing:0.6px;
          text-shadow:0 0 10px rgba(255, 215, 0, 0.6);
        }
        .time-part .label{font-size:11px;color:rgba(255,255,255,0.8);font-weight:700;margin-top:4px}
        .sep{font-weight:900;color:#ffd700;font-size:18px;text-shadow:0 0 8px rgba(255, 215, 0, 0.5);}
        .closed-pill{
          padding:10px 14px;
          border-radius:999px;
          background:linear-gradient(90deg,#dc2626,#ff6b6b);
          color:white;
          font-weight:800;
          box-shadow:0 12px 34px rgba(220,38,38,0.4);
        }

        .info-row{display:flex;gap:18px;align-items:center;margin-top:18px;color:rgba(255,255,255,0.92)}
        .date{font-weight:900;color:#ffd700;font-size:18px;text-shadow:0 0 10px rgba(255, 215, 0, 0.5);}
        .time{color:rgba(255,255,255,0.92);font-weight:700}
        .phone-pill{display:inline-flex;align-items:center;gap:8px;white-space:nowrap}

        .speaker-wrap{position:relative;z-index:5;display:flex;align-items:flex-end;justify-content:center}
        .speaker-card{
          width:100%;
          max-width:440px;
          border-radius:20px;
          background:linear-gradient(180deg, rgba(10, 26, 15, 0.85), rgba(22, 46, 26, 0.8));
          padding:12px;
          border:2px solid rgba(255, 215, 0, 0.3);
          box-shadow:0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(22, 163, 74, 0.3);
          position:relative;
          overflow:visible;
          transform-origin:center center;
          transition:transform 360ms cubic-bezier(.2,.9,.26,1);
        }
        .speaker-card:focus{outline:2px solid rgba(255, 215, 0, 0.5);outline-offset:6px}
        .speaker-photo-wrap{
          width:100%;
          border-radius:14px;
          padding:6px;
          background:linear-gradient(180deg, rgba(255, 215, 0, 0.1), rgba(22, 163, 74, 0.05));
          display:block;
          border:1px solid rgba(255, 215, 0, 0.2);
        }
        .speaker-photo{display:block;max-width:100%;height:auto;max-height:520px;object-fit:contain;border-radius:10px}
        .speaker-badge{
          position:absolute;
          left:14px;
          bottom:14px;
          background:linear-gradient(90deg,#ffd700,#ff6b6b);
          color:#1a0f00;
          padding:8px 12px;
          border-radius:999px;
          font-weight:800;
          box-shadow:0 8px 22px rgba(0,0,0,0.4);
        }
        .stripe{
          position:absolute;
          height:120%;
          width:22px;
          right:-6px;
          top:-10%;
          background:linear-gradient(180deg,rgba(255,215,0,0.2),rgba(22,163,74,0.1));
          transform:skewY(-18deg);
          border-radius:999px;
        }
        .speaker-overlay{
          position:absolute;
          inset:0;
          border-radius:14px;
          display:flex;
          align-items:flex-end;
          justify-content:center;
          padding:16px;
          background:linear-gradient(180deg,transparent,rgba(0,0,0,0.5));
          opacity:0;
          transition:opacity 360ms;
        }
        .speaker-card:hover .speaker-overlay,.speaker-card:focus .speaker-overlay{opacity:1}
        .overlay-text{
          color:white;
          font-weight:700;
          background:linear-gradient(90deg,rgba(0,0,0,0.5),rgba(0,0,0,0.7));
          padding:8px 12px;
          border-radius:8px;
        }

        .reveal{opacity:0;transform:translateY(18px) translateZ(0);transition:all 700ms cubic-bezier(.2,.9,.26,1)}
        .reveal.in-view{opacity:1;transform:translateY(0)}

        /* Modal */
        .modal-overlay{ 
          position:fixed; 
          inset:0; 
          display:flex; 
          align-items:center; 
          justify-content:center; 
          background:linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.85)); 
          z-index:9999; 
          padding:24px; 
          backdrop-filter: blur(4px);
        }
        .modal{ 
          width:100%; 
          max-width:700px; 
          border-radius:12px; 
          background:linear-gradient(180deg, rgba(10, 26, 15, 0.98), rgba(6, 20, 12, 0.98)); 
          box-shadow:0 30px 80px rgba(0,0,0,0.8), 0 0 40px rgba(255, 215, 0, 0.2); 
          position:relative; 
          padding:18px; 
          outline:none; 
          border:2px solid rgba(255, 215, 0, 0.3);
        }
        .modal-close{ 
          position:absolute; 
          right:12px; 
          top:10px; 
          background:rgba(220, 38, 38, 0.8); 
          color:#fff; 
          border:0; 
          font-size:28px; 
          line-height:1; 
          padding:6px 12px; 
          border-radius:8px; 
          cursor:pointer; 
          transition:all 0.3s ease;
          z-index:10;
        }
        .modal-close:hover{
          background:rgba(220, 38, 38, 1);
          transform:scale(1.1);
        }
        .modal-close:focus{outline:2px solid rgba(255, 215, 0, 0.5);outline-offset:2px}
        .iframe-wrapper{ 
          min-height:320px; 
          display:flex; 
          flex-direction:column; 
          gap:12px; 
        }
        .iframe-wrapper iframe{ 
          width:100%; 
          height:min(62vh, 620px); 
          border:0; 
          border-radius:8px; 
          background:white; 
        }
        .iframe-spinner{ 
          display:flex; 
          flex-direction:column;
          align-items:center; 
          justify-content:center;
          gap:12px; 
          color:var(--muted); 
          min-height:320px;
        }
        .iframe-spinner svg{
          animation: spin 1s linear infinite; 
          color:#ffd700;
        }
        @keyframes spin{to{transform:rotate(360deg)}}
        .spinner-text{
          color:rgba(255,255,255,0.9);
          font-weight:600;
        }
        .iframe-error{
          padding:18px; 
          color:var(--muted);
          text-align:center;
        }
        .iframe-error p{
          margin-bottom:16px;
          color:rgba(255,255,255,0.9);
        }
        .modal-footer{
          display:flex;
          justify-content:flex-end;
          gap:10px;
          margin-top:8px;
        }
        .btn-ghost{
          background:transparent;
          border:2px solid rgba(255, 215, 0, 0.4);
          color:#ffd700;
          transition:all 0.3s ease;
        }
        .btn-ghost:hover{
          background:rgba(255, 215, 0, 0.1);
          border-color:rgba(255, 215, 0, 0.6);
        }

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
