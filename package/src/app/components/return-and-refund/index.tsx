"use client";

import React, { useState, useEffect } from "react";
import {
  FaInfoCircle,
  FaEnvelope,
  FaBan,
  FaExclamationTriangle,
  FaCreditCard,
  FaTools,
  FaGavel,
  FaSyncAlt,
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

export default function ReturnRefund() {
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
    { icon: <FaBan />, title: "No Refund Policy" },
    { icon: <FaExclamationTriangle />, title: "Exceptions" },
    { icon: <FaTools />, title: "Course and Membership Access" },
    { icon: <FaCreditCard />, title: "Payment Disputes" },
    { icon: <FaSyncAlt />, title: "Modifications to this Policy" },
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
                Return & Refund Policy
              </h1>
              <p className="mt-4 text-lg opacity-90">
                Below is Creditor Academy's policy regarding returns and refunds for memberships, courses, and services.
              </p>
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500 flex items-start gap-3">
                <FaInfoCircle className="text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    <strong>Effective Date:</strong> 26 September 2024
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                    Estimated reading time: 2-3 minutes
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
                Use the search bar to quickly find specific policy information. Green checkmarks indicate sections you've already read.
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
                'from-red-500 to-red-600',
                'from-yellow-500 to-yellow-600',
                'from-green-500 to-green-600',
                'from-purple-500 to-purple-600',
                'from-indigo-500 to-indigo-600',
                'from-pink-500 to-pink-600'
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
                    At Creditor Academy, we want to ensure you have a clear understanding of our return and refund policies before making any purchases. This policy outlines the terms and conditions regarding returns and refunds for all our services, courses, and memberships.
                  </p>
                )}
                {index === 1 && (
                  <p className="text-base">
                    At Creditor Academy, all purchases of memberships, courses, and business services are final. We do not offer refunds under any circumstances. Please ensure that you review all course details, membership benefits, and service descriptions carefully before making a purchase.
                  </p>
                )}
                {index === 2 && (
                  <p className="text-base">
                    Since we do not offer refunds, there are no exceptions to this policy. In special cases where a technical issue prevents access to a purchased course or service, our support team will assist in resolving the issue, but no refunds will be provided.
                  </p>
                )}
                {index === 3 && (
                  <ul className="list-disc ml-6 space-y-2">
                    <li>Upon successful payment, you will gain immediate access to the purchased content.</li>
                    <li>Ensure compatibility with your device and internet connection before making a purchase.</li>
                    <li>Course and membership access is non-transferable.</li>
                  </ul>
                )}
                {index === 4 && (
                  <p className="text-base">
                    If you have a payment issue or dispute, please contact us immediately at <a className="underline text-blue-600 dark:text-blue-400" href="mailto:sales@creditoracademy.com">sales@creditoracademy.com</a>. Chargebacks and unauthorized disputes may result in the suspension of your account.
                  </p>
                )}
                {index === 5 && (
                  <p className="text-base">
                    We reserve the right to update this policy at any time. Any modifications will be effective immediately upon posting on our website.
                  </p>
                )}
                {index === 6 && (
                  <>
                    <p className="text-base">
                      <strong>Creditor Academy</strong><br />
                      Email: <a className="underline text-blue-600 dark:text-blue-400" href="mailto:counselor@creditoracademy.com">counselor@creditoracademy.com</a>
                    </p>
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-start gap-3">
                      <FaEnvelope className="text-blue-500 mt-1" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">For assistance with access issues or payment disputes, contact our support team at <a className="underline text-blue-600 dark:text-blue-400" href="mailto:sales@creditoracademy.com">sales@creditoracademy.com</a>.</p>
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
