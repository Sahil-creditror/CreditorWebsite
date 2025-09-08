"use client";

import React, { useState, useEffect } from "react";
import {
  FaInfoCircle,
  FaUser,
  FaLock,
  FaCreditCard,
  FaBan,
  FaCopyright,
  FaTools,
  FaBalanceScale,
  FaSignOutAlt,
  FaGavel,
  FaSyncAlt,
  FaEnvelope,
  FaBook,
  FaSearch,
  FaCheck,
  FaQuestionCircle
} from "react-icons/fa";
import { motion } from "framer-motion";

// Define types for our components
interface Section {
  icon: React.ReactElement;
  title: string;
}

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [readSections, setReadSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      const scrollPosition = window.scrollY + 100;
      
      // Get all section elements
      const sectionElements = document.querySelectorAll('[data-section]');
      
      sectionElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setActiveSection(index);

          // Mark section as read when it's in view for a while
          setTimeout(() => {
            setReadSections(prev => new Set(prev).add(index));
          }, 1000);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sectionElement = document.querySelector(`[data-section="${index}"]`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
      // mark read immediately when user clicks
      setReadSections(prev => new Set(prev).add(index));
    }
  };

  const filteredSections = (sections: Section[]) => {
    if (!searchQuery) return sections;
    return sections.filter(section =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sections: Section[] = [
    { icon: <FaInfoCircle />, title: "Introduction" },
    { icon: <FaUser />, title: "Information We Collect" },
    { icon: <FaLock />, title: "How We Use Your Information" },
    { icon: <FaCreditCard />, title: "Sharing of Information" },
    { icon: <FaBan />, title: "Cookies & Tracking Technologies" },
    { icon: <FaCopyright />, title: "Data Security" },
    { icon: <FaTools />, title: "Your Rights & Choices" },
    { icon: <FaBalanceScale />, title: "No Refund Policy" },
    { icon: <FaSignOutAlt />, title: "Third-Party Links" },
    { icon: <FaGavel />, title: "Children's Privacy" },
    { icon: <FaSyncAlt />, title: "Changes to This Policy" },
    { icon: <FaEnvelope />, title: "Contact Us" }
  ];

  // Progress tracking
  const progressPercentage = (readSections.size / sections.length) * 100;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-700/20 dark:to-purple-700/20"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-purple-400/10 dark:bg-purple-600/10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-40">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="pt-10 md:pt-20 pb-6 text-gray-800 dark:text-gray-100">
          {/* Header */}
          <motion.header
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-28 h-28 rounded-full bg-blue-500/10"></div>
            <div className="absolute -bottom-10 -left-10 w-20 h-20 rounded-full bg-purple-500/10"></div>

            <div className="relative">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="mt-4 text-lg opacity-90">
                This Privacy Policy explains how Creditor Academy collects, uses, and protects your personal
                information when you use our website and services.
              </p>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 flex items-start gap-3">
                <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Effective Date:</strong> 26 September 2024
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Estimated reading time: 4-6 minutes
                  </p>
                </div>
              </div>
            </div>
          </motion.header>

          {/* Table of Contents */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <FaBook className="text-blue-500 text-xl" />
              <h2 className="text-2xl font-semibold">Table of Contents</h2>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className={`flex items-center border rounded-lg transition-all duration-200 max-w-md ${isSearchFocused ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200 dark:border-gray-700'}`}>
                <FaSearch className="ml-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full py-3 px-3 bg-transparent outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    aria-label="Clear search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Reading progress</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Sections list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredSections(sections).length > 0 ? (
                filteredSections(sections).map((section, index) => {
                  const originalIndex = sections.findIndex(s => s.title === section.title);
                  const isActive = activeSection === originalIndex;
                  return (
                    <button
                      key={originalIndex}
                      onClick={() => scrollToSection(originalIndex)}
                      className={`flex items-center w-full gap-3 py-3 px-4 rounded-lg transition-colors duration-150 text-left ${
                        isActive ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 shadow-sm" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                      title={section.title}
                    >
                      <span className="text-blue-500 flex-shrink-0 text-lg">{section.icon}</span>
                      <span className="flex-1">{section.title}</span>
                      {readSections.has(originalIndex) && (
                        <FaCheck className="text-green-500 text-sm" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-full text-center py-4 text-gray-500 dark:text-gray-400">
                  No sections found
                </div>
              )}
            </div>

            {/* Help text */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start gap-2">
              <FaQuestionCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Use the search bar to quickly find specific privacy information. Green checkmarks indicate sections you've already read.
              </p>
            </div>
          </motion.div>

          {/* Sections */}
          {sections.map((section, index) => (
            <motion.div
              key={index}
              data-section={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              className="mb-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`bg-gradient-to-r p-5 text-white flex justify-between items-center ${[
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-green-500 to-green-600',
                'from-yellow-500 to-yellow-600',
                'from-red-500 to-red-600',
                'from-indigo-500 to-indigo-600',
                'from-gray-500 to-gray-600',
                'from-pink-500 to-pink-600',
                'from-teal-500 to-teal-600',
                'from-orange-500 to-orange-600',
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600'
              ][index]}`}>
                <h3 className="flex items-center gap-3 text-xl font-semibold">
                  {section.icon} {index + 1}. {section.title}
                </h3>
                {readSections.has(index) && (
                  <span className="text-sm bg-white/20 py-1 px-2 rounded-full flex items-center gap-1">
                    <FaCheck className="text-xs" /> Read
                  </span>
                )}
              </div>
              <div className="p-6">
                {index === 0 && (
                  <p className="text-base">
                    Creditor Academy ("we," "our," or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                  </p>
                )}
                {index === 1 && (
                  <>
                    <p className="text-base mb-3"><strong>Personal Information:</strong> Name, email address, phone number, billing details, and account credentials when you register or make a purchase.</p>
                    <p className="text-base mb-3"><strong>Payment Information:</strong> Collected via secure third-party payment processors.</p>
                    <p className="text-base mb-3"><strong>Usage Data:</strong> IP addresses, browser type, device information, and usage patterns collected via cookies and analytics tools.</p>
                    <p className="text-base"><strong>Communications:</strong> Messages you send us via contact forms, chat support, or email.</p>
                  </>
                )}
                {index === 2 && (
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Providing access to courses, memberships, and business services.</li>
                    <li>Processing payments and managing accounts.</li>
                    <li>Improving website functionality and user experience.</li>
                    <li>Sending important updates, newsletters, and promotional offers (with your consent).</li>
                  </ul>
                )}
                {index === 3 && (
                  <ul className="list-disc ml-6 space-y-2">
                    <li><strong>Service Providers:</strong> Payment processors, hosting services, and analytics providers.</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
                    <li><strong>Business Partners:</strong> If you enroll in courses or services provided in collaboration with third parties.</li>
                  </ul>
                )}
                {index === 4 && (
                  <p className="text-base">
                    We use cookies to enhance your experience. You can modify your browser settings to disable cookies, but some features may not function properly.
                  </p>
                )}
                {index === 5 && (
                  <p className="text-base">
                    We implement industry-standard security measures to protect your data. However, no method of transmission over the Internet is 100% secure.
                  </p>
                )}
                {index === 6 && (
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Access, update, or delete your personal information.</li>
                    <li>Opt out of marketing communications.</li>
                    <li>Request a copy of your data.</li>
                  </ul>
                )}
                {index === 7 && (
                  <p className="text-base">
                    <strong>No Refund Policy:</strong> All purchases made on Creditor Academy are final. We do not offer refunds under any circumstances.
                  </p>
                )}
                {index === 8 && (
                  <p className="text-base">
                    Our website may contain links to third-party websites. We are not responsible for their privacy practices.
                  </p>
                )}
                {index === 9 && (
                  <p className="text-base">
                    Our services are not intended for individuals under the age of 13. We do not knowingly collect data from children.
                  </p>
                )}
                {index === 10 && (
                  <p className="text-base">
                    We may update this Privacy Policy from time to time. The latest version will be available on our website; material changes will be communicated as appropriate.
                  </p>
                )}
                {index === 11 && (
                  <>
                    <p className="text-base">
                      <strong>Creditor Academy</strong>
                      <br />
                      Email: <a href="mailto:counselor@creditoracademy.com" className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">counselor@creditoracademy.com</a>
                    </p>
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm">
                        For any questions about this Privacy Policy or how we handle your data, please contact us at the email above.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
