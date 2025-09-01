



import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState(""); // comma separated
  const [nearArea, setNearArea] = useState(""); // comma separated
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [guest, setGuest] = useState("1");
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState("");

  // Fetch categories
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // Image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.warn("You can only upload a maximum of 3 images.");
    } else {
      setImages(files);
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !hotelLocation ||
      !description ||
      !facilities ||
      !nearArea ||
      !selectedCategory ||
      !guest ||
      !price
    ) {
      toast.error("All fields are required.");
      return;
    }

    if (images.length !== 3) {
      toast.error("Please upload exactly 3 images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("hotelLocation", hotelLocation);
    formData.append("description", description);

    // ✅ Backend ke hisaab se array bana ke bhejna
    facilities.split(",").forEach((f) => {
      formData.append("facilities", f.trim());
    });
    nearArea.split(",").forEach((n) => {
      formData.append("nearArea", n.trim());
    });

    formData.append("category", selectedCategory);
    formData.append("guest", guest);
    formData.append("isAvailable", isAvailable);
    formData.append("price", price);

    images.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Post created successfully!");

      // reset
      setTitle("");
      setHotelLocation("");
      setDescription("");
      setFacilities("");
      setNearArea("");
      setSelectedCategory("");
      setImages([]);
      setGuest("1");
      setIsAvailable(false);
      setPrice("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="flex justify-between text-black mt-11">
      <div className="ml-[4rem]">
        <Navbar />
      </div>
      <div className="flex flex-col p-8 w-[81%]">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Post</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[81%] p-3 border bg-white border-gray-300 rounded"
            required
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Hotel Location"
            value={hotelLocation}
            onChange={(e) => setHotelLocation(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
            required
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
            required
          />

          {/* Facilities */}
          <input
            type="text"
            placeholder="Facilities (comma separated)"
            value={facilities}
            onChange={(e) => setFacilities(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
            required
          />

          {/* Nearby Area */}
          <input
            type="text"
            placeholder="Nearby Areas (comma separated)"
            value={nearArea}
            onChange={(e) => setNearArea(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* Category */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-[81%] bg-white text-black border border-gray-300 p-2 rounded-md"
            >
              <option value="">Select a category</option>
              {category?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Guests */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Guests
            </label>
            <select
              value={guest}
              onChange={(e) => setGuest(e.target.value)}
              className="w-[81%] bg-white border border-gray-300 p-2 rounded"
            >
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Availability
            </label>
            <select
              value={isAvailable}
              onChange={(e) =>
                setIsAvailable(e.target.value === "true" ? true : false)
              }
              className="w-[81%] bg-white border border-gray-300 p-2 rounded"
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          {/* Image Upload */}
          <div className="w-[81%] p-3 border border-gray-300 rounded">
            <label className="flex items-center cursor-pointer">
              <FaImage className="mr-2 text-gray-600" />
              <span>Upload Images (max 3)</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            <div className="flex space-x-4 mt-2">
              {images.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-[81%] bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;


// import React, { useState } from "react";
// import axios from "axios";

// const CreatePost = () => {
//   const [formData, setFormData] = useState({
//     pgName: "",
//     address: "",
//     description: "",
//     category: "",
//     images: "",
//     guest: "",
//     rentPerMonth: "",
//     nearArea: "",
//     facilities: "",
//     pgType: "",
//     roomType: "",
//     securityDeposit: "",
//     foodIncluded: false,
//     rules: "",
//     genderRestriction: "",
//     ownerName: "",
//     contactNumber: "",
//     city: "",
//     state: "",
//     pincode: "",
//     landmark: "",
//     mapCoordinates: "",
//   });

//   // handle input change
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   // handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/post/create-post",
//         formData
//       );
//       alert("PG Created Successfully ✅");
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//       alert("Error creating PG ❌");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Create New PG</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* PG Name */}
//         <input
//           type="text"
//           name="pgName"
//           placeholder="PG Name"
//           value={formData.pgName}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         {/* Address */}
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         {/* Description */}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Rent */}
//         <input
//           type="number"
//           name="rentPerMonth"
//           placeholder="Rent Per Month"
//           value={formData.rentPerMonth}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* PG Type */}
//         <select
//           name="pgType"
//           value={formData.pgType}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select PG Type</option>
//           <option value="Boys">Boys</option>
//           <option value="Girls">Girls</option>
//           <option value="Co-ed">Co-ed</option>
//         </select>

//         {/* Room Type */}
//         <select
//           name="roomType"
//           value={formData.roomType}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         >
//           <option value="">Select Room Type</option>
//           <option value="Single">Single</option>
//           <option value="Double">Double</option>
//           <option value="Triple">Triple</option>
//           <option value="Dormitory">Dormitory</option>
//         </select>

//         {/* Security Deposit */}
//         <input
//           type="number"
//           name="securityDeposit"
//           placeholder="Security Deposit"
//           value={formData.securityDeposit}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Food Included */}
//         <label className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             name="foodIncluded"
//             checked={formData.foodIncluded}
//             onChange={handleChange}
//           />
//           <span>Food Included</span>
//         </label>

//         {/* Rules */}
//         <input
//           type="text"
//           name="rules"
//           placeholder="Rules (comma separated)"
//           value={formData.rules}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Gender Restriction */}
//         <input
//           type="text"
//           name="genderRestriction"
//           placeholder="Gender Restriction (optional)"
//           value={formData.genderRestriction}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Owner Info */}
//         <input
//           type="text"
//           name="ownerName"
//           placeholder="Owner Name"
//           value={formData.ownerName}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="contactNumber"
//           placeholder="Contact Number"
//           value={formData.contactNumber}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* City/State */}
//         <input
//           type="text"
//           name="city"
//           placeholder="City"
//           value={formData.city}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />
//         <input
//           type="text"
//           name="state"
//           placeholder="State"
//           value={formData.state}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Pincode */}
//         <input
//           type="text"
//           name="pincode"
//           placeholder="Pincode"
//           value={formData.pincode}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Landmark */}
//         <input
//           type="text"
//           name="landmark"
//           placeholder="Landmark"
//           value={formData.landmark}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Map Coordinates */}
//         <input
//           type="text"
//           name="mapCoordinates"
//           placeholder="Map Coordinates (lat,lng)"
//           value={formData.mapCoordinates}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//         />

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Create PG
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreatePost;
