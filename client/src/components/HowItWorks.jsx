import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Search Stays",
      description:
        "Find hostels and PGs in your preferred city and locality using our smart filters.",
      icon: "🔍",
    },
    {
      title: "Explore Listings",
      description:
        "Compare verified properties with real photos, pricing, and included amenities.",
      icon: "📷",
    },
    {
      title: "Contact or Book",
      description:
        "Reach out to the owner/manager via call or instantly reserve your stay from the listing page.",
      icon: "📞",
    },
    {
      title: "Move In Easily",
      description:
        "We assist you at every step to ensure a smooth and hassle-free move-in experience.",
      icon: "🏠",
    },
  ];

  return (
    <section className="py-16 bg-[#413C4D] text-white">
      <div className="max-w-6xl mx-auto px-4 text-center text-white">
        {/* Title */}
        <h2 className="text-4xl font-bold mb-4 tracking-tight">How It Works</h2>
        <p className="text-gray-300 mb-12 text-sm sm:text-base">
          We’ve made it simple and stress-free to find your perfect hostel or PG.
        </p>

        {/* Steps Grid (2x2 layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col justify-between h-full transition-all duration-300 hover:bg-gray-700 hover:shadow-2xl transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {step.description}
              </p>

              {/* Border animation on hover */}
              <div className="mt-4 h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
