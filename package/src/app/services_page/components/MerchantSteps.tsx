"use client";

type Step = {
  title: string;
  description: string;
};

type MerchantStepsProps = {
  heading?: string;
  steps?: Step[];
};

const defaultSteps: Step[] = [
  {
    title: "STEP 1",
    description:
      "Complete a secure pre‑application — takes less than 5 minutes.",
  },
  {
    title: "STEP 2",
    description:
      "Get underwritten by a private‑friendly processor — usually within 48 hours.",
  },
  {
    title: "STEP 3",
    description:
      "Begin processing payments through your Private Trust, Association, or any business structure.",
  },
];

export default function MerchantSteps({
  heading = "Get Started in 3 Private Steps",
  steps = defaultSteps,
}: MerchantStepsProps) {
  return (
    <section className="py-16 md:py-20 bg-lightgray/40 dark:bg-secondary/10">
      <div className="container">
        <h2 className="text-center text-2xl md:text-4xl font-extrabold text-primary mb-10 md:mb-12">
          {heading}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Step 1 */}
          <div className="relative rounded-2xl bg-white dark:bg-secondary/20 border border-secondary/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary font-bold tracking-wide">{steps[0]?.title}</p>
                <p className="mt-3 text-secondary/80 dark:text-white/80 text-base md:text-lg max-w-3xl">
                  {steps[0]?.description}
                </p>
              </div>
              <span className="text-5xl md:text-6xl font-extrabold text-black/10 dark:text-white/10 select-none">1</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-2xl bg-blue-50/80 dark:bg-blue-900/40 border border-blue-200/60 dark:border-blue-700/40 shadow-[0_10px_30px_rgba(30,64,175,0.08)] p-6 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary font-bold tracking-wide">{steps[1]?.title}</p>
                <p className="mt-3 text-secondary/80 dark:text-white/85 text-base md:text-lg max-w-3xl">
                  {steps[1]?.description}
                </p>
              </div>
              <span className="text-5xl md:text-6xl font-extrabold text-blue-300/50 dark:text-blue-200/20 select-none">2</span>
            </div>
          </div>

          {/* Step 3 spans full width */}
          <div className="relative rounded-2xl bg-white dark:bg-secondary/20 border border-secondary/10 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-6 md:p-8 lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-primary font-bold tracking-wide">{steps[2]?.title}</p>
                <p className="mt-3 text-secondary/80 dark:text-white/80 text-base md:text-lg max-w-4xl">
                  {steps[2]?.description}
                </p>
              </div>
              <span className="text-5xl md:text-6xl font-extrabold text-black/10 dark:text-white/10 select-none">3</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


