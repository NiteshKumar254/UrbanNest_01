import React from "react";
import { FaLaptopCode, FaHeart, FaUsers, FaGlobe } from "react-icons/fa";

const jobs = [
  {
    title: "Frontend Developer",
    location: "Remote",
    type: "Full Time",
  },
  {
    title: "Backend Developer",
    location: "Bangalore, India",
    type: "Full Time",
  },
  {
    title: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
  },
  {
    title: "Marketing Executive",
    location: "Delhi, India",
    type: "Internship",
  },
];

const perks = [
  {
    icon: <FaLaptopCode size={28} />,
    title: "Remote Friendly",
    description: "Work from anywhere with flexible hours.",
  },
  {
    icon: <FaHeart size={28} />,
    title: "Inclusive Culture",
    description: "Diverse, open, and welcoming environment.",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Growth Opportunities",
    description: "Learn, grow, and build your dream career.",
  },
  {
    icon: <FaGlobe size={28} />,
    title: "Global Impact",
    description: "Your work helps people find safe housing.",
  },
];

const CareerPage = () => {
  return (
    <div className="bg-[#413C4D] text-white min-h-screen">
      {/* Hero */}
      <section className="text-center py-20 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Join Our Team</h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
          At PG Finder, we’re building a better way for students and professionals to find a home away from home.
        </p>
        <a
          href="#jobs"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-3 rounded-md"
        >
          View Open Positions
        </a>
      </section>

      {/* Perks */}
      <section className="py-16 px-4 bg-[#5D576F]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {perks.map((perk, index) => (
            <div key={index} className="p-6 bg-gray-700 rounded-xl hover:bg-gray-600 transition">
              <div className="mb-4 text-blue-400 mx-auto">{perk.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{perk.title}</h3>
              <p className="text-sm text-gray-300">{perk.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Job Listings */}
      <section id="jobs" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-gray-800 rounded-xl hover:shadow-xl transition"
              >
                <div>
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-sm text-gray-400">{job.location} • {job.type}</p>
                </div>
                <a
                  href="#"
                  className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium transition"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5D576F] text-center px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Didn’t find the right role?</h2>
        <p className="text-lg text-white mb-6 max-w-2xl mx-auto">
          We're always looking for great people. Drop us your resume and we’ll get in touch.
        </p>
        <a
          href="mailto:careers@pgfinder.com"
          className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition"
        >
          Send Resume
        </a>
      </section>
    </div>
  );
};

export default CareerPage;
