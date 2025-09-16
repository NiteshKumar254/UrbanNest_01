import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CityPage = () => {
  const { city } = useParams(); //
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  // API se fetch
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/get-posts-by-city/${city}`
        );
        setPosts(data.posts || []);
      } catch (error) {
        console.error("❌ Error fetching city posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [city]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">
        PGs in {city}
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">
          No PGs found in {city}.
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={post.images[0]}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {post.hotelLocation}, {post.city}
                </p>
                <p className="text-gray-800 font-bold">₹{post.price}/month</p>

                <Link
                  to={`/product/${post.slug}`}
                  className="mt-3 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CityPage;
