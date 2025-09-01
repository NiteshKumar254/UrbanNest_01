
//...........................
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Discover = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/post/get-all-posts");
        if (res.data.success) {
          setPosts(res.data.posts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <h2 className="text-center mt-5 text-xl font-semibold">Loading...</h2>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
        Discover <span className="text-blue-600">Stays</span>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            to={`/product/${post.slug}`}
            key={post._id}
            className="block bg-white rounded-2xl shadow-md hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 overflow-hidden"
          >
            {/* Image */}
            {post.images && post.images.length > 0 && (
              <div className="relative overflow-hidden rounded-t-2xl">
                <img
                  src={post.images[0]}
                  alt={post.title}
                  className="h-60 w-full object-cover transform transition duration-500 hover:scale-110 hover:brightness-90"
                />
              </div>
            )}

            {/* Content */}
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h2>
              <p className="text-gray-600 text-sm">{post.hotelLocation}</p>
              <p className="text-gray-500 mt-3 line-clamp-2">{post.description}</p>

              <div className="flex justify-between items-center mt-5">
                <span className="text-xl font-extrabold text-blue-600">
                  ₹{post.price}
                </span>

                {/* Button hata diya kyunki pura card clickable hai */}
                <span className="px-3 py-1 text-blue-600 text-sm font-semibold border border-blue-500 rounded-lg">
                  View →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;

