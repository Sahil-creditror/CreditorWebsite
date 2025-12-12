"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DEFAULT_WEBINAR_ID } from "@/config/api";
import { registerZoomWebinar, ZoomWebinarRegistrationPayload, fetchOccurrences, OccurrenceItem } from "@/services/zoom";
import { initializeToken } from "@/lib/tokenManager";
import { GraduationCap, Building2, CreditCard, Users, Calendar, Clock, DollarSign, ArrowRight, AlertCircle } from "lucide-react";

type FormState = Omit<ZoomWebinarRegistrationPayload, "webinarId"> & {
  selectedWebinarId?: string;
};

interface ExtendedOccurrenceItem extends OccurrenceItem {
  webinarId: string;
}

// Webinar IDs from environment - defined outside component to avoid re-creation
const WEBINAR_IDS = {
  midnight: process.env.NEXT_PUBLIC_WEBINAR_ID_MIDNIGHT || '81368819394',
  morning: process.env.NEXT_PUBLIC_WEBINAR_ID_MORNING || '85345478550',
  afternoon: process.env.NEXT_PUBLIC_WEBINAR_ID_AFTERNOON || '85009970371',
  evening: process.env.NEXT_PUBLIC_WEBINAR_ID_EVENING || '84323907773',
};

export default function RegistrationPage(): React.ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get session date from URL params (passed from Event component)
  const sessionDate = searchParams.get('session_date') || '';
  
  const [formData, setFormData] = useState<FormState>({
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    occurrence_id: '',
    selectedWebinarId: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [occurrences, setOccurrences] = useState<ExtendedOccurrenceItem[]>([]);
  const [loadingOccurrences, setLoadingOccurrences] = useState(true);
  const [touched, setTouched] = useState({
    email: false,
    first_name: false,
    last_name: false,
    occurrence_id: false,
  });

  useEffect(() => {
    // Add entrance animation
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('visible');
      }, index * 100);
    });

    // Initialize token and fetch occurrences
    const initializeAndLoadOccurrences = async () => {
      // Initialize token first
      await initializeToken();
      
      // Then fetch occurrences from all four webinar IDs
      await loadOccurrences();
    };

    // Fetch occurrences from all four webinar IDs
    const loadOccurrences = async () => {
      setLoadingOccurrences(true);
      console.log('\n🔄 ========== LOADING OCCURRENCES FOR DROPDOWNS ==========');
      console.log('📅 Fetching from 4 webinar IDs:');
      console.log(`  - Midnight: ${WEBINAR_IDS.midnight}`);
      console.log(`  - Morning: ${WEBINAR_IDS.morning}`);
      console.log(`  - Afternoon: ${WEBINAR_IDS.afternoon}`);
      console.log(`  - Evening: ${WEBINAR_IDS.evening}`);
      
      try {
        // Fetch occurrences from all four webinar IDs in parallel
        const [midnightResult, morningResult, afternoonResult, eveningResult] = await Promise.all([
          fetchOccurrences(WEBINAR_IDS.midnight),
          fetchOccurrences(WEBINAR_IDS.morning),
          fetchOccurrences(WEBINAR_IDS.afternoon),
          fetchOccurrences(WEBINAR_IDS.evening),
        ]);

        const allOccurrences: ExtendedOccurrenceItem[] = [];
        const now = new Date();
        console.log(`\n⏰ Current time: ${now.toISOString()}`);

        // Process midnight webinar occurrences
        if (midnightResult.success && midnightResult.data) {
          const futureOccurrences = midnightResult.data.occurrences
            .filter(occ => new Date(occ.start_time) > now)
            .map(occ => ({ ...occ, webinarId: WEBINAR_IDS.midnight }));
          console.log(`\n🌃 Midnight webinar (${WEBINAR_IDS.midnight}):`);
          console.log(`  - Total: ${midnightResult.data.occurrences.length}`);
          console.log(`  - Future: ${futureOccurrences.length}`);
          if (futureOccurrences.length > 0) {
            futureOccurrences.forEach((occ, idx) => {
              console.log(`  ${idx + 1}. ${occ.date} at ${occ.time} (ID: ${occ.occurrence_id})`);
            });
          }
          allOccurrences.push(...futureOccurrences);
        }

        // Process morning webinar occurrences
        if (morningResult.success && morningResult.data) {
          const futureOccurrences = morningResult.data.occurrences
            .filter(occ => new Date(occ.start_time) > now)
            .map(occ => ({ ...occ, webinarId: WEBINAR_IDS.morning }));
          console.log(`\n🌅 Morning webinar (${WEBINAR_IDS.morning}):`);
          console.log(`  - Total: ${morningResult.data.occurrences.length}`);
          console.log(`  - Future: ${futureOccurrences.length}`);
          if (futureOccurrences.length > 0) {
            futureOccurrences.forEach((occ, idx) => {
              console.log(`  ${idx + 1}. ${occ.date} at ${occ.time} (ID: ${occ.occurrence_id})`);
            });
          }
          allOccurrences.push(...futureOccurrences);
        }

        // Process afternoon webinar occurrences
        if (afternoonResult.success && afternoonResult.data) {
          const futureOccurrences = afternoonResult.data.occurrences
            .filter(occ => new Date(occ.start_time) > now)
            .map(occ => ({ ...occ, webinarId: WEBINAR_IDS.afternoon }));
          console.log(`\n☀️ Afternoon webinar (${WEBINAR_IDS.afternoon}):`);
          console.log(`  - Total: ${afternoonResult.data.occurrences.length}`);
          console.log(`  - Future: ${futureOccurrences.length}`);
          if (futureOccurrences.length > 0) {
            futureOccurrences.forEach((occ, idx) => {
              console.log(`  ${idx + 1}. ${occ.date} at ${occ.time} (ID: ${occ.occurrence_id})`);
            });
          }
          allOccurrences.push(...futureOccurrences);
        }

        // Process evening webinar occurrences
        if (eveningResult.success && eveningResult.data) {
          const futureOccurrences = eveningResult.data.occurrences
            .filter(occ => new Date(occ.start_time) > now)
            .map(occ => ({ ...occ, webinarId: WEBINAR_IDS.evening }));
          console.log(`\n🌙 Evening webinar (${WEBINAR_IDS.evening}):`);
          console.log(`  - Total: ${eveningResult.data.occurrences.length}`);
          console.log(`  - Future: ${futureOccurrences.length}`);
          if (futureOccurrences.length > 0) {
            futureOccurrences.forEach((occ, idx) => {
              console.log(`  ${idx + 1}. ${occ.date} at ${occ.time} (ID: ${occ.occurrence_id})`);
            });
          }
          allOccurrences.push(...futureOccurrences);
        }

        // Sort all occurrences by start_time and take next 4
        const nextFour = allOccurrences
          .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
          .slice(0, 4);

        console.log(`\n📋 DROPDOWN OCCURRENCES (Next 4 upcoming sessions):`);
        if (nextFour.length > 0) {
          nextFour.forEach((occ, idx) => {
            console.log(`  ${idx + 1}. ${occ.date} at ${occ.time} PST`);
            console.log(`     - Webinar ID: ${occ.webinarId}`);
            console.log(`     - Occurrence ID: ${occ.occurrence_id}`);
            console.log(`     - Start Time: ${occ.start_time}`);
          });
        } else {
          console.log('  ⚠️ No upcoming occurrences found!');
        }
        console.log('==========================================================\n');

        setOccurrences(nextFour);
        
          // Auto-select first occurrence if available
          if (nextFour.length > 0) {
            const firstOccurrence = nextFour[0];
            
            // Store in localStorage
            if (typeof window !== 'undefined') {
              localStorage.setItem('selected_occurrence_id', firstOccurrence.occurrence_id);
              localStorage.setItem('selected_webinar_id', firstOccurrence.webinarId);
              console.log('[Register] Auto-selected and stored occurrence_id:', firstOccurrence.occurrence_id);
            }
            
            setFormData(prev => ({ 
              ...prev, 
              occurrence_id: firstOccurrence.occurrence_id,
              selectedWebinarId: firstOccurrence.webinarId
            }));
          }
      } catch (error) {
        console.error("❌ Error loading occurrences:", error);
      } finally {
        setLoadingOccurrences(false);
      }
    };

    initializeAndLoadOccurrences();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
  };

  const handleChange = (field: keyof FormState, value: string) => {
    if (field === 'occurrence_id') {
      // Find the selected occurrence to get its webinarId
      const selectedOcc = occurrences.find(occ => occ.occurrence_id === value);
      
      // Store occurrence_id in localStorage
      if (value && typeof window !== 'undefined') {
        localStorage.setItem('selected_occurrence_id', value);
        localStorage.setItem('selected_webinar_id', selectedOcc?.webinarId || '');
        console.log('[Register] Stored occurrence_id in localStorage:', value);
      }
      
      setFormData({ 
        ...formData, 
        [field]: value,
        selectedWebinarId: selectedOcc?.webinarId || ''
      });
    } else {
      setFormData({ ...formData, [field]: value });
    }
    setError(null);
  };

  const formatOccurrenceLabel = (occurrence: ExtendedOccurrenceItem) => {
    // Convert start_time (UTC) to PST timezone and format: "Monday, Dec 8 at 6:00 PM PST"
    const date = new Date(occurrence.start_time);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: 'America/Los_Angeles', // PST/PDT timezone
      timeZoneName: 'short' // Shows "PST" or "PDT"
    };
    return date.toLocaleString('en-US', options);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      email: true,
      first_name: true,
      last_name: true,
      occurrence_id: true,
    });

    // Validate
    if (!formData.first_name.trim()) {
      setError('First name is required');
      return;
    }
    if (!formData.last_name.trim()) {
      setError('Last name is required');
      return;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!formData.occurrence_id) {
      setError('Please select a webinar session');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Get occurrence_id and webinar_id from formData or localStorage as backup
      const occurrenceId = formData.occurrence_id || 
        (typeof window !== 'undefined' ? localStorage.getItem('selected_occurrence_id') : null) || 
        '';
      
      const webinarId = formData.selectedWebinarId || 
        (typeof window !== 'undefined' ? localStorage.getItem('selected_webinar_id') : null) || 
        DEFAULT_WEBINAR_ID;

      console.log('[Register] Submitting registration with:', {
        occurrence_id: occurrenceId,
        webinar_id: webinarId,
      });

      // Call WebX API to register user for the webinar
      const result = await registerZoomWebinar({
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
        occurrence_id: occurrenceId,
        webinarId: webinarId,
      });

      if (result.success && result.data) {
        // Registration successful - redirect to success page
        const params = new URLSearchParams({
          name: `${formData.first_name} ${formData.last_name}`,
          join_url: result.data.join_url,
          session_date: result.data.start_time || sessionDate,
          registrant_id: result.data.registrant_id,
        });

        router.push(`/event-registration?${params.toString()}`);
      } else {
        // Handle error
        setError(result.error || 'Registration failed. Please try again.');
        setIsSubmitting(false);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen flex flex-col bg-gradient-to-b from-blue-900 via-blue-300 to-blue-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-black">
      {/* Background overlays */}
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(1200px_600px_at_20%_-10%,rgba(59,130,246,0.10),transparent),radial-gradient(900px_500px_at_80%_110%,rgba(16,185,129,0.10),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2] [background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(0,0,0,0.04)_24px)] dark:[background-image:repeating-linear-gradient(0deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px),repeating-linear-gradient(90deg,transparent,transparent_23px,rgba(255,255,255,0.05)_24px)]" />
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-40 [background-image:radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.6),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.4),transparent_35%)] dark:opacity-20" />

      {/* Content Section */}
      <section className="container relative mx-auto px-4 pt-12 md:pt-20 pb-20 md:pb-32 z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
          <h1 className="text-4xl md:text-5xl font-extrabold text-smokewhite my-20 dark:text-white mb-3 tracking-tight">
            CREDITOR ACADEMY
          </h1>
          <p className="text-lg md:text-xl text-white dark:text-primary/90 font-semibold">
            Free Non-Member Orientation
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side - Info */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-2xl shadow-lg animate-in opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-tr from-primary/8 to-transparent" />
              
              <div className="px-6 py-8 md:px-10 md:py-12 bg-white/80 dark:bg-secondary/60 backdrop-blur-sm">
                <h2 className="text-3xl md:text-4xl font-extrabold text-secondary dark:text-white leading-tight mb-4">
                  Join Our Free <span className="text-primary">Saturday Orientation</span>
                </h2>
                <p className="text-lg text-secondary/80 dark:text-white/80 leading-relaxed mb-8">
                  Discover everything we offer — from private education and trust setup 
                  to credit mastery and financial freedom. See why thousands are choosing 
                  to live, build, and thrive in the private.
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    {
                      icon: GraduationCap,
                      title: "Expert Training",
                      desc: "Learn from industry professionals with years of experience",
                      gradient: "from-blue-500/10 to-blue-600/5",
                      iconBg: "bg-blue-500/10",
                      iconColor: "text-blue-600 dark:text-blue-400"
                    },
                    {
                      icon: Building2,
                      title: "Trust Setup",
                      desc: "Understanding private trusts and asset protection",
                      gradient: "from-purple-500/10 to-purple-600/5",
                      iconBg: "bg-purple-500/10",
                      iconColor: "text-purple-600 dark:text-purple-400"
                    },
                    {
                      icon: CreditCard,
                      title: "Credit Mastery",
                      desc: "Master your credit and achieve financial freedom",
                      gradient: "from-green-500/10 to-green-600/5",
                      iconBg: "bg-green-500/10",
                      iconColor: "text-green-600 dark:text-green-400"
                    },
                    {
                      icon: Users,
                      title: "Community Support",
                      desc: "Join thousands building and thriving in the private",
                      gradient: "from-amber-500/10 to-amber-600/5",
                      iconBg: "bg-amber-500/10",
                      iconColor: "text-amber-600 dark:text-amber-400"
                    }
                  ].map((benefit, idx) => {
                    const Icon = benefit.icon;
                    return (
                      <div
                        key={idx}
                        className={`group flex items-start gap-3 bg-gradient-to-br ${benefit.gradient} dark:from-slate-800/80 dark:to-slate-800/60 rounded-xl p-4 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
                      >
                        <div className={`flex-none w-10 h-10 rounded-lg ${benefit.iconBg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                          <Icon className={`w-5 h-5 ${benefit.iconColor}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-secondary dark:text-white mb-1">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-secondary/70 dark:text-white/70 leading-snug">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Session Info */}
                <div className="rounded-xl bg-white/60 dark:bg-secondary/60 p-6 shadow-sm ring-1 ring-black/5">
                  <div className="text-lg font-bold text-secondary dark:text-white mb-4">Session Details</div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-secondary/80 dark:text-white/80">
                      <Calendar className="w-5 h-5 text-primary flex-none" />
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium">When:</span>
                        <span className="font-bold text-primary">Every Saturday at 10:00 AM PST</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-secondary/80 dark:text-white/80">
                      <Clock className="w-5 h-5 text-primary flex-none" />
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium">Duration:</span>
                        <span className="font-bold text-secondary dark:text-white">40-60 minutes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-secondary/80 dark:text-white/80">
                      <DollarSign className="w-5 h-5 text-primary flex-none" />
                      <div className="flex-1 flex justify-between items-center">
                        <span className="font-medium">Cost:</span>
                        <span className="font-bold text-green-600 dark:text-green-400">100% FREE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-5 flex flex-col gap-6 mb-20">
            <div className="sticky top-20 animate-in opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards] [animation-duration:600ms] [animation-name:fade-in-up]">
              <div className="rounded-3xl bg-white/80 p-6 md:p-8 shadow-2xl ring-1 ring-black/5 dark:bg-secondary dark:ring-white/8 backdrop-blur-sm">
                <div className="mb-6">
                  <div className="text-xs font-semibold text-secondary/70 dark:text-white/70 mb-1">Free Orientation</div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-secondary dark:text-white mb-2">
                    Reserve Your Spot
                  </h3>
                  <p className="text-sm text-secondary/70 dark:text-white/70">
                    Fill out the form below to register for the next session
                  </p>
                </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Occurrence Selection */}
                <div>
                  <label htmlFor="occurrence_id" className="block text-sm font-bold text-secondary dark:text-white mb-2">
                    Select Webinar Session <span className="text-red-500">*</span>
                  </label>
                  {loadingOccurrences ? (
                    <div className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/60 text-secondary/40 dark:text-white/40">
                      Loading available sessions...
                    </div>
                  ) : occurrences.length > 0 ? (
                    <select
                      id="occurrence_id"
                      className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium
                        ${touched.occurrence_id && !formData.occurrence_id
                          ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                          : 'border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/60'
                        } 
                        text-secondary dark:text-white
                        focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none
                        disabled:opacity-60 disabled:cursor-not-allowed`}
                      value={formData.occurrence_id}
                      onChange={(e) => handleChange('occurrence_id', e.target.value)}
                      onBlur={() => handleBlur('occurrence_id')}
                      disabled={isSubmitting}
                    >
                      <option value="">Choose a session</option>
                      {occurrences.map((occ) => (
                        <option key={occ.occurrence_id} value={occ.occurrence_id}>
                          {formatOccurrenceLabel(occ)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="w-full px-4 py-3 rounded-xl border-2 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/10 text-yellow-700 dark:text-yellow-400">
                      No upcoming sessions available. Please check back later.
                    </div>
                  )}
                  {touched.occurrence_id && !formData.occurrence_id && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">Please select a session</p>
                  )}
                </div>

                <div>
                  <label htmlFor="first_name" className="block text-sm font-bold text-secondary dark:text-white mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium
                      ${touched.first_name && !formData.first_name.trim()
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                        : 'border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/60'
                      } 
                      text-secondary dark:text-white placeholder:text-secondary/40 dark:placeholder:text-white/40
                      focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none
                      disabled:opacity-60 disabled:cursor-not-allowed`}
                    value={formData.first_name}
                    onChange={(e) => handleChange('first_name', e.target.value)}
                    onBlur={() => handleBlur('first_name')}
                    disabled={isSubmitting}
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                  />
                  {touched.first_name && !formData.first_name.trim() && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">First name is required</p>
                  )}
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-bold text-secondary dark:text-white mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium
                      ${touched.last_name && !formData.last_name.trim()
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                        : 'border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/60'
                      }
                      text-secondary dark:text-white placeholder:text-secondary/40 dark:placeholder:text-white/40
                      focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none
                      disabled:opacity-60 disabled:cursor-not-allowed`}
                    value={formData.last_name}
                    onChange={(e) => handleChange('last_name', e.target.value)}
                    onBlur={() => handleBlur('last_name')}
                    disabled={isSubmitting}
                    placeholder="Enter your last name"
                    autoComplete="family-name"
                  />
                  {touched.last_name && !formData.last_name.trim() && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">Last name is required</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-secondary dark:text-white mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 font-medium
                      ${touched.email && (!formData.email.trim() || !validateEmail(formData.email))
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
                        : 'border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/60'
                      }
                      text-secondary dark:text-white placeholder:text-secondary/40 dark:placeholder:text-white/40
                      focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none
                      disabled:opacity-60 disabled:cursor-not-allowed`}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                  {touched.email && !formData.email.trim() && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">Email is required</p>
                  )}
                  {touched.email && formData.email.trim() && !validateEmail(formData.email) && (
                    <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 font-medium">Please enter a valid email</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone_number" className="block text-sm font-bold text-secondary dark:text-white mb-2">
                    Phone Number <span className="text-secondary/50 dark:text-white/50 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone_number"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-white/10 bg-white dark:bg-secondary/60 text-secondary dark:text-white placeholder:text-secondary/40 dark:placeholder:text-white/40 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed font-medium"
                    value={formData.phone_number || ''}
                    onChange={(e) => handleChange('phone_number', e.target.value)}
                    disabled={isSubmitting}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                  />
                </div>

                {error && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-none" />
                    <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-extrabold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Registering...
                    </>
                  ) : (
                    <>
                      Complete Registration
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                <div className="flex items-center gap-2 text-xs text-secondary/60 dark:text-white/60 pt-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span>Your information is secure and will never be shared with third parties.</span>
                </div>
              </form>

              <div className="mt-4 text-xs text-secondary/60 dark:text-white/60 text-center">
                By registering you agree to receive occasional emails about the event and resources. You can unsubscribe any time.
              </div>
            </div>

            {/* Support Box */}
              {/* <div className="rounded-2xl bg-white/60 dark:bg-secondary/60 p-5 shadow-sm ring-1 ring-black/5 backdrop-blur-sm">
              <div className="flex items-center gap-3 text-sm text-secondary/80 dark:text-white/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary flex-none" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  Need help? Contact us at{' '}
                  <a href="tel:425-400-9246" className="font-bold text-primary hover:underline">
                    425-400-9246
                  </a>
                </div>
              </div>
              </div> */}
            </div>
          </div>

        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}

