"use client";

import React from "react";

type FeatureRow = {
  key: string;
  label: string;
  starter?: string | boolean;
  cadillac?: string | boolean;
  note?: string;
};

interface ComparisonTableProps {
  starterPrototypeLink?: string;
  cadillacPrototypeLink?: string;
  className?: string;
  featuresData?: FeatureRow[];
}

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M4.5 10.5l3 3L15.5 5.5"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CrossIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M5 5l10 10M15 5L5 15"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const DEFAULT_FEATURES: FeatureRow[] = [
  { key: "pages", label: "Number of Pages", starter: "2-3 pages", cadillac: "5-7+ custom pages" },
  { key: "logo", label: "Custom Logo", starter: "Basic text/logo", cadillac: "Premium design with revisions" },
  { key: "policy", label: "Policy Pages", starter: "Basic templates", cadillac: "Custom-written & formatted" },
  { key: "contact", label: "Contact Form", starter: "Basic with auto-email", cadillac: "Advanced with CRM sync" },
  { key: "uiux", label: "UI/UX Design", starter: "Clean layout", cadillac: "Brand-aligned premium design" },
  { key: "security", label: "Security (SSL)", starter: "HTTPS", cadillac: "HTTPS + Extra layers" },
  { key: "dashboard", label: "Detail User Dashboard", starter: false, cadillac: true },
  { key: "underwriter", label: "Underwriter-Ready Structure", starter: false, cadillac: true },
  { key: "mobile", label: "Mobile Responsive", starter: true, cadillac: true },
  { key: "hosting", label: "Hosting & Maintenance", starter: "Monthly", cadillac: "Monthly" },
  { key: "member", label: "Member Login / Portal", starter: false, cadillac: true },
  { key: "backend", label: "Backend Integration", starter: false, cadillac: true },
  { key: "blog", label: "Blog / Resource Section", starter: false, cadillac: true },
  { key: "chatbot", label: "Chatbot / Live Chat", starter: false, cadillac: true },
  { key: "booking", label: "Appointment Booking", starter: false, cadillac: true },
  { key: "seo", label: "SEO Optimization", starter: false, cadillac: true },
  { key: "training", label: "Client Training / Walkthrough", starter: false, cadillac: true },
];

export default function ComparisonTable({
  starterPrototypeLink,
  cadillacPrototypeLink,
  className = "",
  featuresData,
}: ComparisonTableProps) {
  const features = featuresData ?? DEFAULT_FEATURES;

  const renderCell = (value: string | boolean | undefined, highlight = false) => {
    if (typeof value === "boolean") {
      return value ? (
        <div className="flex items-center gap-2 text-base font-medium text-green-600 dark:text-green-400">
          <CheckIcon className="w-5 h-5" />
          <span>Included</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-base font-medium text-red-500 dark:text-red-400">
          <CrossIcon className="w-5 h-5" />
          <span>Not included</span>
        </div>
      );
    }

    if (!value) return <span className="text-base text-gray-500 dark:text-gray-400">—</span>;

    if (/https?/i.test(value) || /monthly/i.test(value)) {
      return (
        <div className="flex items-center gap-2 text-base font-medium text-green-600 dark:text-green-400">
          <CheckIcon className="w-5 h-5" />
          <span>{value}</span>
        </div>
      );
    }

    return (
      <span
        className={`text-base ${
          highlight ? "font-semibold text-indigo-700 dark:text-indigo-300" : "text-gray-700 dark:text-gray-200"
        }`}
      >
        {value}
      </span>
    );
  };

  return (
    <section className={`w-full ${className}`} aria-label="Plan comparison table">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-5xl font-extrabold py-20 text-gray-900 dark:text-gray-100">
              Starter vs Cadillac — at a glance
              <p className="mt-4 text-lg md:text-xl text-black dark:text-gray-300">
                Clear, responsive comparison so you can decide fast.
            </p>
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-lg px-2 py-1 rounded bg-green-50 text-green-700 border border-green-100 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              Included
            </span>
            <span className="text-lg px-2 py-1 rounded bg-red-50 text-red-700 border border-red-100 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800">
              Not included
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[720px] rounded-xl shadow-lg ring-1 ring-black/5 bg-gradient-to-b from-white to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-1">
            {/* Header */}
            <div className="grid grid-cols-3 gap-2 items-stretch p-4">
              <div className="flex items-center">
                <div className="text-lg font-medium text-gray-600 dark:text-gray-300">Features</div>
              </div>

              <div className="group transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg rounded-lg bg-white dark:bg-gray-800 p-4 flex flex-col justify-between">
                <div>
                  <div className="text-lg uppercase tracking-wide font-semibold text-indigo-600 dark:text-indigo-400">
                    Starter
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">$100</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Starter Plan</span>
                  </div>
                  <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                    Fast & lean website — ideal for smaller projects and quick launches.
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={starterPrototypeLink ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border ${
                      starterPrototypeLink
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-white dark:bg-gray-700 text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-60"
                    }`}
                    aria-disabled={!starterPrototypeLink}
                  >
                    View Prototype
                  </a>

                  <button className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                    Choose
                  </button>
                </div>
              </div>

              <div className="group transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-xl rounded-lg bg-gradient-to-b from-white to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-4 flex flex-col justify-between border border-indigo-100 dark:border-indigo-800">
                <div>
                  <div className="text-lg uppercase tracking-wide font-semibold text-indigo-800 dark:text-indigo-300">
                    Cadillac
                  </div>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-gray-900 dark:text-gray-100">$1,000</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Cadillac Plan</span>
                  </div>
                  <p className="mt-3 text-base text-gray-700 dark:text-gray-300">
                    Full custom solution — premium design, integrations and enterprise-ready structure.
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <a
                    href={cadillacPrototypeLink ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium border ${
                      cadillacPrototypeLink
                        ? "bg-indigo-700 text-white hover:bg-indigo-800"
                        : "bg-white dark:bg-gray-700 text-gray-500 border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-60"
                    }`}
                    aria-disabled={!cadillacPrototypeLink}
                  >
                    View Prototype
                  </a>

                  <button className="inline-flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium bg-indigo-600 text-white">
                    Choose
                  </button>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-900 rounded-b-lg">
              {features.map((f, idx) => {
                const starterVal = f.starter;
                const cadillacVal = f.cadillac;
                const cadillacBetter = starterVal === false && cadillacVal === true;

                return (
                  <div
                    key={f.key}
                    className={`grid grid-cols-3 gap-4 items-center px-4 py-4 sm:px-6 ${
                      idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"
                    }`}
                  >
                    <div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{f.label}</div>
                      {f.note ? <div className="text-base text-gray-600 dark:text-gray-300 mt-1">{f.note}</div> : null}
                    </div>

                    <div className="flex items-center">
                      <div className="w-full">{renderCell(starterVal)}</div>
                    </div>

                    <div
                      className={`flex items-center ${
                        cadillacBetter ? "bg-indigo-50 dark:bg-indigo-900/30 rounded py-2 px-3" : ""
                      }`}
                    >
                      <div className="w-full">{renderCell(cadillacVal, cadillacBetter)}</div>
                    </div>
                  </div>
                );
              })}

              {/* Footer CTA */}
              <div className="grid grid-cols-3 gap-4 items-center px-4 py-6 sm:px-6">
                <div />
                <div className="flex gap-2">
                  <a
                    href={starterPrototypeLink ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center px-4 py-2 rounded-md text-sm font-semibold ${
                      starterPrototypeLink
                        ? "bg-indigo-600 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {starterPrototypeLink ? "Open Starter Prototype" : "Attach Starter Link"}
                  </a>
                </div>

                <div className="flex gap-2">
                  <a
                    href={cadillacPrototypeLink ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full text-center px-4 py-2 rounded-md text-sm font-semibold ${
                      cadillacPrototypeLink
                        ? "bg-indigo-700 text-white"
                        : "bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-600 cursor-not-allowed opacity-60"
                    }`}
                  >
                    {cadillacPrototypeLink ? "Open Cadillac Prototype" : "Attach Cadillac Link"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
