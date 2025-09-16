import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({ products = [] }) => {
  return (
    <div className="flex flex-col items-center w-full px-6 md:px-12">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-8 mt-9 text-center">
        {products.length < 1
          ? "No Products Found"
          : `Found: ${products.length} products`}
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl">
        {products.map((post) => (
          <Link
            to={`/product/${post.slug}`}
            key={post._id}
            className="block group"
          >
            <article
              className="relative isolate flex flex-col justify-end overflow-hidden 
                         rounded-2xl px-6 pb-6 pt-48 shadow-lg transition 
                         duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-2xl"
            >
              {/* Image */}
              <img
                src={post.images?.[0] || "https://via.placeholder.com/400x300"}
                alt={post.title || "Post Thumbnail"}
                className="absolute inset-0 h-full w-full object-cover transition duration-300 
                           group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Hotel Location */}
              <h3 className="z-10 text-lg md:text-xl font-bold text-white drop-shadow-md mb-1">
                {post.hotelLocation || "Location not available"}
              </h3>

              {/* Title */}
              <p className="z-10 text-sm md:text-base text-gray-200 drop-shadow-sm">
                {post.title || "Title not available"}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
