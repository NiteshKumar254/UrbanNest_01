
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "./Title";

const Hotel = () => {
  const [posts, setPosts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPosts(res.data.posts || []);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!posts.length) return;

    const interval = setInterval(() => {
      setImageIndexes((prev) => {
        const updated = { ...prev };
        posts.forEach((post) => {
          const i = updated[post._id] || 0;
          updated[post._id] = (i + 1) % post.images.length;
        });
        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [posts]);

  // Horizontal drag logic
  useEffect(() => {
    const slider = containerRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
      isDown = true;
      slider.classList.add("cursor-grabbing");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeaveHandler = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const mouseUpHandler = () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    };

    const mouseMoveHandler = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // scroll speed
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDownHandler);
    slider.addEventListener("mouseleave", mouseLeaveHandler);
    slider.addEventListener("mouseup", mouseUpHandler);
    slider.addEventListener("mousemove", mouseMoveHandler);

    return () => {
      slider.removeEventListener("mousedown", mouseDownHandler);
      slider.removeEventListener("mouseleave", mouseLeaveHandler);
      slider.removeEventListener("mouseup", mouseUpHandler);
      slider.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);

  return (
    <section className="bg-[#413C4D] text-white py-20 px-4 sm:px-8 lg:px-16">
      {/* Title */}
      <div className="text-center  mb-14">
        <Title
          title="Looking for your perfect stay?"
          subTitle="Find PGs, Hostels, and Rentals that feel like home — comfort, convenience, and community living."
          className="text-white"
        />
      </div>
     


      {/* Scrollable grid */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide py-2 cursor-grab"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {Array.from({ length: Math.ceil(posts.length / 6) }).map((_, batchIndex) => (
          <div
            key={batchIndex}
            className="grid grid-cols-3 grid-rows-2 gap-6 flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            {posts.slice(batchIndex * 6, batchIndex * 6 + 6).map((hotel) => (
              <div
                key={hotel._id}
                className="relative w-80 h-64 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer bg-gray-900"
              >
                {/* Image */}
                <img
                  src={hotel.images[imageIndexes[hotel._id] || 0]}
                  alt={hotel.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  onClick={() => navigate(`/product/${hotel.slug}`)}
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-50 transition-all duration-300" />

                {/* Text + Button */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-11/12 text-center text-white space-y-1">
                  <h3 className="text-lg font-semibold line-clamp-1">{hotel.title}</h3>
                  <p className="text-sm line-clamp-1">📍 {hotel.hotelLocation || hotel.city || "Unknown"}</p>
                  <p className="text-sm font-medium">₹{hotel.price || "N/A"} / month</p>

                  <button
                    onClick={() => navigate(`/product/${hotel.slug}`)}
                    className="mt-2 w-full bg-gradient-to-r from-[#2C2835] to-[#6B657C] hover:from-[#413C4D] hover:to-[#2C2835] text-white text-sm font-semibold py-2 rounded-md transition-all duration-300 shadow-lg hover:shadow-blue-700/40 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                  >
                    <span>View Details</span>
                    <span className="text-base">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hotel;
