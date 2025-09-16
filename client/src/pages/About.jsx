import React from "react";
import { FaUsers, FaGlobe, FaHome, FaSmile } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-[#4A435B] text-white min-h-screen py-12 px-6">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">
          About <span className="text-purple-400">UrbanNest</span>
        </h1>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          UrbanNest is your trusted platform to find the perfect PG/Hostel.
          Our mission is to simplify the house-hunting journey by connecting 
          students and working professionals with safe, affordable, and 
          comfortable accommodations.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-pink-600 to-pink-500 text-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transform transition duration-300">
          <FaUsers className="text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Community</h3>
          <p className="text-gray-200">
            A growing family of students and professionals finding their perfect stay.
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transform transition duration-300">
          <FaGlobe className="text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Vision</h3>
          <p className="text-gray-200">
            To become the most reliable platform for PG/Hostel search across India.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-500 text-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transform transition duration-300">
          <FaHome className="text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Mission</h3>
          <p className="text-gray-200">
            Making accommodation search easy, transparent, and stress-free.
          </p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white p-6 rounded-2xl shadow-lg text-center hover:scale-105 transform transition duration-300">
          <FaSmile className="text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Our Values</h3>
          <p className="text-gray-200">
            Trust, safety, and customer satisfaction above everything else.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold">
          Let’s help you find your next <span className="text-purple-400">Nest 🏠</span>
        </h2>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          UrbanNest is here to make your stay search effortless. 
          Whether you are a student or a professional, we’ll help 
          you find a place you can call home.
        </p>
      </div>
    </div>
  );
};

export default About;
