
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import RelatedPost from "./RelatedPost";
import { useCart } from "../../context/Cart";
import { useAuth } from "../../context/UserContext"; // auth import
import Spinner from "../Spinner";
import { toast } from "react-toastify";

const Product = () => {
  const params = useParams();
  const [postDetails, setPostDetails] = useState(null);
  const [relatedPost, setRelatedPost] = useState([]);
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Schedule Visit State
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showVisitForm) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showVisitForm]);

  const handelPostDetails = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-post/${params.slug}`
      );

      const post = response.data.post;
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
      setRelatedPost(data.relatedPost || []);
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  useEffect(() => {
    if (params?.slug) handelPostDetails();
  }, [params?.slug]);

  const handleAddToCart = () => {
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

  const handleScheduleVisit = async () => {
    if (!visitDate || !visitTime) {
      toast.error("Please select date and time for visit");
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/visit/schedule-visit`,
        {
          postId: postDetails._id,
          userId: auth?.user?._id,
          visitDate,
          visitTime,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        }
      );

      if (data.success) {
        toast.success("Visit scheduled successfully");
        setShowVisitForm(false);
        setVisitDate("");
        setVisitTime("");
      } else {
        toast.error(data.message || "Failed to schedule visit");
      }
    } catch (error) {
      console.error("Error scheduling visit:", error);
      toast.error("Server error while scheduling visit");
    }
  };

  if (!postDetails) return <Spinner />;

  return (
    <div className="p-8 min-h-screen bg-[#413C4D]">
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
          <h1 className="text-3xl font-bold text-white mb-2">
            {postDetails.title || "No Title Found"}
          </h1>
          <div className="flex items-center space-x-2 text-yellow-500 mb-4">
            <FaStar />
            <span className="text-xl font-semibold">4.5</span>
            <span className="text-gray-400">(1200 Reviews)</span>
          </div>
          <p className="flex items-center text-white mb-4">
            <MdLocationOn className="text-xl" />
            {postDetails.hotelLocation || "Location unavailable"}
          </p>

          <div className="flex space-x-4 mb-6">
            <button
              className="px-6 py-3 font-semibold rounded-lg shadow-md bg-green-500 text-white hover:bg-green-600"
              onClick={() => setShowVisitForm(true)}
            >
              Schedule Visit
            </button>

            <button
              className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-lg shadow-md ${
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
                ? "Already added to Book"
                : "Add to Book"}
            </button>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Overview</h2>
            <p className="text-white mt-2">{postDetails?.description}</p>
          </div>

          {/* Pricing */}
          <div className="mt-3">
            <p className="text-base font-bold text-orange-600">
              Price Per Month:{" "}
              <span className="text-xl text-white">
                {postDetails?.price.toLocaleString("en-Us", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </p>
          </div>

          {/* Extra Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-white">
            <div>
              <p>
                <span className="font-semibold">Owner:</span>{" "}
                {postDetails.ownerName}
              </p>
              <p>
                <span className="font-semibold">Contact:</span>{" "}
                {postDetails.ownerContactNumber}
              </p>
              <p>
                <span className="font-semibold">City:</span> {postDetails.city}
              </p>
              <p>
                <span className="font-semibold">State:</span> {postDetails.state}
              </p>
            </div>
            <div>
              <p>
                <span className="font-semibold">Available Beds:</span>{" "}
                {postDetails.availableBeds}
              </p>
              <p>
                <span className="font-semibold">Total Beds:</span>{" "}
                {postDetails.totalBeds}
              </p>
              <p>
                <span className="font-semibold">Gender:</span>{" "}
                {postDetails.gender}
              </p>
              <p>
                <span className="font-semibold">Occupancy Type:</span>{" "}
                {postDetails?.category?.name}
              </p>
            </div>
          </div>

          {/* Nearby & Facilities */}
          <div className="flex flex-col md:flex-row justify-between mt-10">
            <div className="mt-6 md:mt-0">
              <h2 className="text-xl font-semibold text-white">Nearby Areas</h2>
              <ul className="space-y-2 mt-2 text-white list-disc pl-5">
                {postDetails.nearArea?.length > 0 ? (
                  postDetails.nearArea.map((area, idx) => (
                    <li key={idx}>{area}</li>
                  ))
                ) : (
                  <li className="text-white italic">No nearby areas listed</li>
                )}
              </ul>
            </div>

            <div className="mt-6 md:mt-0">
              <h2 className="text-xl font-semibold text-white">Facilities</h2>
              <ul className="space-y-2 mt-2 text-white list-disc pl-5">
                {postDetails.facilities?.flatMap((item, idx) =>
                  item.split(",").map((subItem, subIdx) => (
                    <li key={`${idx}-${subIdx}`}>{subItem.trim()}</li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <h1 className="ml-11 font-semibold text-3xl mb-7 mt-5 text-white">
        You may like this:
      </h1>
      <RelatedPost relatedProducts={relatedPost} />

      {/* Schedule Visit Modal */}
      {showVisitForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Schedule a Visit</h2>

            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg p-2"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-700 font-medium mb-1">
                Time
              </label>
              <input
                type="time"
                className="w-full border rounded-lg p-2"
                value={visitTime}
                onChange={(e) => setVisitTime(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowVisitForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                onClick={handleScheduleVisit}
              >
                Confirm Visit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
