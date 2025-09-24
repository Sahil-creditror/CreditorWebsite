"use client";

import { 
  FaCreditCard, 
  FaRocket, 
  FaBuilding, 
  FaCheck, 
  FaClock, 
  FaShieldAlt, 
  FaHeadset, 
  FaChartLine,
  FaMobileAlt,
  FaLock,
  FaArrowRight
} from 'react-icons/fa';

export default function TransparentPricingSnapshot() {
  const plans = [
    {
      name: "Starter Plan",
      icon: FaCreditCard,
      description: "Best for small shops & new businesses",
      fees: "2.9% + $0.30",
      period: "per transaction",
      features: [
        { text: "No setup fees", icon: FaCheck },
        { text: "Free online portal", icon: FaMobileAlt },
        { text: "Payouts in 24–48 hours", icon: FaClock }
      ],
      ideal: "Ideal if you process under $10,000/month"
    },
    {
      name: "Growth Plan",
      icon: FaRocket,
      description: "Designed for growing merchants",
      fees: "2.5% + $0.25",
      period: "per transaction",
      features: [
        { text: "ACH payments enabled", icon: FaChartLine },
        { text: "Free virtual terminal & reporting", icon: FaMobileAlt },
        { text: "Payouts in 24 hours", icon: FaClock }
      ],
      ideal: "Best if you process $10,000–$100,000/month"
    },
    {
      name: "Enterprise Plan",
      icon: FaBuilding,
      description: "High volume or special industries",
      fees: "Custom rates",
      period: "starting at 2.2% + $0.20",
      features: [
        { text: "Dedicated account manager", icon: FaHeadset },
        { text: "Chargeback protection tools", icon: FaShieldAlt },
        { text: "Same-day funding available", icon: FaClock }
      ],
      ideal: "Tailored for High Volume"
    }
  ];

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 dark:from-slate-900 dark:via-blue-900/20 dark:to-blue-800/10 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-300/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span>Transparent & Competitive Pricing</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black dark:text-white mb-6 leading-tight">
            Transparent Pricing Snapshot
          </h2>
          
          <p className="text-xl md:text-2xl text-blue-800 dark:text-blue-200 max-w-3xl mx-auto leading-relaxed">
            Scale your business with our flexible payment processing solutions designed for every stage of growth
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {plans.map((plan, idx) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={idx}
                className="relative group"
              >
                <div className="relative h-full rounded-3xl border-2 border-blue-200 dark:border-blue-700 bg-white/80 dark:bg-slate-800/80 shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-105 backdrop-blur-sm overflow-hidden">
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-5 group-hover:opacity-10 transition-opacity duration-500" />
                  
                  <div className="relative p-8 lg:p-10 h-full flex flex-col">
                    {/* Plan Icon & Name */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                        <IconComponent className="text-2xl" />
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 dark:text-white">
                          {plan.name}
                        </h3>
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-4xl lg:text-5xl font-black text-blue-900 dark:text-white">
                          {plan.fees}
                        </span>
                        <span className="text-blue-600 dark:text-blue-400 text-lg">
                          {plan.period}
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8 flex-grow">
                      {plan.features.map((feature, featureIdx) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={featureIdx} className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                              <FeatureIcon className="text-sm" />
                            </div>
                            <span className="text-blue-800 dark:text-blue-200 font-medium">
                              {feature.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Ideal Usage */}
                    <div className="pt-6 border-t border-blue-200 dark:border-blue-700">
                      <p className="text-blue-700 dark:text-blue-300 text-sm font-medium">
                        {plan.ideal}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          {/* <div className="inline-flex items-center gap-6 px-8 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-700 shadow-lg mb-8">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <FaLock className="text-blue-500" />
              <span className="font-medium">Secure & Encrypted</span>
            </div>
            <div className="w-px h-6 bg-blue-300 dark:bg-blue-600" />
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <FaHeadset className="text-blue-500" />
              <span className="font-medium">24/7 Support</span>
            </div>
            <div className="w-px h-6 bg-blue-300 dark:bg-blue-600" />
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <FaShieldAlt className="text-blue-500" />
              <span className="font-medium">PCI Compliant</span>
            </div>
          </div>

          <p className="text-lg text-blue-800 dark:text-blue-200 max-w-2xl mx-auto mb-8">
            All plans include advanced fraud protection, real-time reporting, and seamless integration with your existing systems.
          </p> */}

          <a
            href="/pmaform"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-400/50"
            aria-label="Request a custom quote"
          >
            <span>Start Your Journey Today</span>
            <FaArrowRight className="text-lg" />
          </a>
        </div>
      </div>
    </section>
  );
}
