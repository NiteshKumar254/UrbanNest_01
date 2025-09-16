
import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import BannerImage from "/src/assets/Gemini_Generated_Image_p22tuop22tuop22t.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSearch } from "../context/Search";

const Banner = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useSearch();

  const handelSerach = async (e) => {
    e.preventDefault();
    if (!search.keyword) {
      alert("Please enter a keyword to search");
      return;
    }
    try {
      const uri = `${import.meta.env.VITE_BASE_URL}/api/post/search/${search.keyword}`;
      console.log("Requesting:", uri);

      const { data } = await axios.get(uri); // 
      console.log("Response", data);

      setSearch({ ...search, results: data }); // 
      navigate(`/search`);
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div
      className="relative w-full h-[800px] bg-cover bg-center"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-white h-full px-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
         The Ultimate Living Experience
        </h1>
        <p className="text-base sm:text-lg mt-2 text-center">
          Find Your Perfect Home Away From Home
        </p>
        <p className='max-w-130 mt-2 text-sm md:text-base'>PGs, Hostels & Rentals at convenient locations — start your PG journey today with trusted spaces across the city.</p>


        {/* Search bar */}
        <div className="mt-8 w-full max-w-[57rem] sm:w-[80%] md:w-[60%] bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search destinations..."
            className="flex-grow p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })} // ✅ input bind kiya
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
            onClick={handelSerach}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
