
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaShoppingCart } from "react-icons/fa"; // 👈 Added FaShoppingCart
import { MdLocationOn } from "react-icons/md";
import RelatedPost from "./RelatedPost";
import { useCart } from "../../context/Cart";
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const Product = () => {
  const params = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [relatedPost, setRelatedPost] = useState([]);
  const [cart, setCart] = useCart();

  const handelPostDetails = async () => {
    try {
      console.log("Fetching post for slug:", params.slug);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`
      );

      console.log("Full API response:", response.data);

      const post = response.data.post;
      console.log("Post object:", post);

      setPostDetails(post);

      if (post?._id && post?.category?._id) {
        getRelatedPost(post._id, post.category._id);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    }
  };

  const getRelatedPost = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/related-post/${pid}/${cid}`
      );
      console.log("Related posts response:", data);
      setRelatedPost(data.relatedPost || []);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  useEffect(() => {
    if (params?.slug) handelPostDetails();
  }, [params?.slug]);

  console.log("PostDetails in render:", postDetails);

  const handleAddToCart = () => {
    // check if product already exists in cart
    const exists = cart.some((item) => item._id === postDetails._id);

    if (exists) {
      toast.info("Room is already in your cart");
      return;
    }

    if (postDetails.isAvailable) {
      const updatedCart = [...cart, postDetails];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      toast.success("Room added to cart successfully");
    }
  };

  if (!postDetails) return <Spinner />;

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:space-x-8 overflow-hidden">
        {/* Images Section */}
        <div className="flex flex-col space-y-4 p-4 md:w-1/2">
          {postDetails?.images?.length > 0 && (
            <>
              <img
                src={postDetails.images[0]}
                alt="Main Image"
                className="w-full h-[25rem] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
              <div className="grid grid-cols-2 gap-2">
                {postDetails.images.slice(1).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Additional Image ${idx + 1}`}
                    className="h-[100%] object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Details Section */}
        <div className="flex-1 p-8 md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {postDetails.title || "No Title Found"}
          </h1>
          <div className="flex items-center space-x-2 text-yellow-500 mb-4">
            <FaStar />
            <span className="text-xl font-semibold">4.5</span>
            <span className="text-gray-500">(1200 Reviews)</span>
          </div>
          <p className="flex items-center text-gray-600 mb-4">
            <MdLocationOn className="text-xl" />
            {postDetails.hotelLocation || "Location unavailable"}
          </p>

          <div className="flex space-x-4 mb-6">
            <button className="px-6 py-3 font-semibold rounded-lg shadow-transparent bg-blue-500 text-white hover:bg-blue-600">
              Check-in
            </button>

            {/* ✅ Add to Cart button with icon */}
            <button
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-transparent ${
                postDetails.isAvailable
                  ? cart.some((item) => item._id === postDetails._id)
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-black-300 cursor-not-allowed"
              }`}
              disabled={
                !postDetails.isAvailable ||
                cart.some((item) => item._id === postDetails._id)
              }
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="text-lg" />
              {cart.some((item) => item._id === postDetails._id)
                ? "Already in Cart"
                : "Add to Cart"}
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Overview</h2>
            <p className="text-gray-600 mt-2">{postDetails?.description}</p>
          </div>

          <div className="mt-3">
            <p className="text-base font-bold text-orange-600">
              Price Per Day:{" "}
              <span className="text-xl text-gray-500">
                {postDetails?.price.toLocaleString("en-Us", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </p>
          </div>

          <div className="flex justify-between">
            {/* NearBy Area */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-700">Near Area</h2>
              <ul className="space-y-2 mt-2 text-gray-700 list-disc pl-5">
                {postDetails.nearArea?.length > 0 ? (
                  postDetails.nearArea.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))
                ) : (
                  <li className="text-gray-400 italic">
                    No nearby areas listed
                  </li>
                )}
              </ul>
            </div>

            {/* Facilities */}
            <div className="mt-8 mr-32">
              <h2 className="text-xl font-semibold text-gray-700">Facilities</h2>
              <ul className="space-y-2 mt-2 text-gray-700 list-disc pl-5">
                {postDetails.facilities?.flatMap((area, idx) =>
                  area.split(",").map((subArea, subIdx) => (
                    <li key={`${idx}-${subIdx}`}>{subArea.trim()}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <h1 className="ml-11 font-semibold text-3xl mb-7 mt-5">
        You may like this:
      </h1>
      <RelatedPost relatedProducts={relatedPost} />
    </div>
  );
};

export default Product;
