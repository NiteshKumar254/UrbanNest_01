
// // import React, { useEffect, useState } from "react";
// // import { FaImage } from "react-icons/fa";
// // import Navbar from "./Navbar";
// // import axios from "axios";
// // import { toast } from "react-toastify";

// // const CreatePost = () => {
// //   const [title, setTitle] = useState("");
// //   const [hotelLocation, setHotelLocation] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [facilities, setFacilities] = useState([]); // ✅ array for multiple checkbox
// //   const [nearArea, setNearArea] = useState(""); // comma separated
// //   const [category, setCategory] = useState([]);
// //   const [selectedCategory, setSelectedCategory] = useState("");
// //   const [images, setImages] = useState([]);
// //   const [gender, setGender] = useState("unisex");
// //   const [availableBeds, setAvailableBeds] = useState("0");
// //   const [totalBeds, setTotalBeds] = useState("1");
// //   const [isAvailable, setIsAvailable] = useState(true); // <-- Added availability state
// //   const [price, setPrice] = useState("");
// //   const [ownerName, setOwnerName] = useState("");
// //   const [ownerContactNumber, setOwnerContactNumber] = useState("");
// //   const [state, setState] = useState("");
// //   const [city, setCity] = useState("");

// //   // ✅ Facilities List (same as backend enum)
// //   const allFacilities = [
// //     "WiFi",
// //     "Meals",
// //     "Laundry",
// //     "Housekeeping",
// //     "CCTV",
// //     "Parking",
// //     "Power Backup",
// //     "RO Water",
// //     "AC",
// //     "Non-AC",
// //     "Gym",
// //     "Study Table",
// //   ];

// //   // Fetch categories
// //   const fetchCategory = async () => {
// //     try {
// //       const { data } = await axios.get(
// //         `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
// //       );
// //       setCategory(data.categories);
// //     } catch (error) {
// //       console.error("Error fetching categories:", error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCategory();
// //   }, []);

// //   // Image change
// //   const handleImageChange = (e) => {
// //     const files = Array.from(e.target.files);
// //     if (files.length > 3) {
// //       toast.warn("You can only upload a maximum of 3 images.");
// //     } else {
// //       setImages(files);
// //     }
// //   };

// //   // ✅ Facilities checkbox handler
// //   const handleFacilityChange = (e) => {
// //     const { value, checked } = e.target;
// //     if (checked) {
// //       setFacilities((prev) => [...prev, value]);
// //     } else {
// //       setFacilities((prev) => prev.filter((f) => f !== value));
// //     }
// //   };

// //   // Submit form
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (
// //       !title ||
// //       !hotelLocation ||
// //       !description ||
// //       facilities.length === 0 ||
// //       !nearArea ||
// //       !selectedCategory ||
// //       !availableBeds ||
// //       !totalBeds ||
// //       !ownerName ||
// //       !ownerContactNumber ||
// //       !price ||
// //       !state ||
// //       !city
// //     ) {
// //       toast.error("All fields are required.");
// //       return;
// //     }

// //     if (images.length !== 3) {
// //       toast.error("Please upload exactly 3 images.");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("title", title);
// //     formData.append("hotelLocation", hotelLocation);
// //     formData.append("description", description);
// //     formData.append("ownerName", ownerName);
// //     formData.append("ownerContactNumber", ownerContactNumber);
// //     formData.append("state", state);
// //     formData.append("city", city);

// //     // ✅ Facilities array append
// //     facilities.forEach((f) => {
// //       formData.append("facilities", f);
// //     });

// //     // ✅ Nearby areas
// //     nearArea.split(",").forEach((n) => {
// //       formData.append("nearArea", n.trim());
// //     });

// //     formData.append("category", selectedCategory);
// //     formData.append("availableBeds", availableBeds);
// //     formData.append("totalBeds", totalBeds);
// //     formData.append("isAvailable", isAvailable);  // <-- Append availability flag
// //     formData.append("price", price);
// //     formData.append("gender", gender);

// //     images.forEach((file) => {
// //       formData.append("images", file);
// //     });

// //     try {
// //       await axios.post(
// //         `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
// //         formData,
// //         { headers: { "Content-Type": "multipart/form-data" } }
// //       );

// //       toast.success("Post created successfully!");

// //       // reset
// //       setTitle("");
// //       setHotelLocation("");
// //       setDescription("");
// //       setFacilities([]);
// //       setNearArea("");
// //       setSelectedCategory("");
// //       setImages([]);
// //       setAvailableBeds("0");
// //       setTotalBeds("1");
// //       setGender("unisex");
// //       setOwnerName("");
// //       setOwnerContactNumber("");
// //       setState("");
// //       setCity("");
// //       setIsAvailable(true);  // reset availability to default true
// //       setPrice("");
// //     } catch (error) {
// //       console.error("Error creating post:", error);
// //       toast.error("Failed to create post.");
// //     }
// //   };

// //   return (
// //     <div className="flex justify-between  text-black mt-11">
// //       <div className="ml-[4rem]">
// //         <Navbar />
// //       </div>
// //       <div className="flex flex-col  p-8 w-[81%]">
// //         <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Post</h1>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           {/* Title */}
// //           <input
// //             type="text"
// //             placeholder="Pg/Hostel/House Name"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className="w-[81%] p-3 border bg-white border-gray-300 rounded"
// //             required
// //           />

// //           {/* Location */}
// //           <input
// //             type="text"
// //             placeholder="Enter Location"
// //             value={hotelLocation}
// //             onChange={(e) => setHotelLocation(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* State */}
// //           <input
// //             type="text"
// //             placeholder="Enter State Name"
// //             value={state}
// //             onChange={(e) => setState(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* City */}
// //           <input
// //             type="text"
// //             placeholder="Enter City Name"
// //             value={city}
// //             onChange={(e) => setCity(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* Owner Name */}
// //           <input
// //             type="text"
// //             placeholder="Owner Name"
// //             value={ownerName}
// //             onChange={(e) => setOwnerName(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* Owner Contact Number */}
// //           <input
// //             type="text"
// //             placeholder="Owner Contact Number"
// //             value={ownerContactNumber}
// //             onChange={(e) => setOwnerContactNumber(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* Description */}
// //           <textarea
// //             placeholder="Description"
// //             value={description}
// //             onChange={(e) => setDescription(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* ✅ Facilities Checkboxes */}
// //           <div>
// //             <label className="block text-gray-700 text-sm font-bold mb-2">
// //               Facilities
// //             </label>
// //             <div className="grid grid-cols-2 gap-2 w-[81%] bg-white p-3 border border-gray-300 rounded">
// //               {allFacilities.map((facility, index) => (
// //                 <label key={index} className="flex items-center space-x-2">
// //                   <input
// //                     type="checkbox"
// //                     value={facility}
// //                     checked={facilities.includes(facility)}
// //                     onChange={handleFacilityChange}
// //                     className="accent-blue-600"
// //                   />
// //                   <span>{facility}</span>
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Price */}
// //           <input
// //             type="number"
// //             placeholder="Price Per Month"
// //             value={price}
// //             onChange={(e) => setPrice(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //             required
// //           />

// //           {/* Nearby Area */}
// //           <input
// //             type="text"
// //             placeholder="Nearby Areas (comma separated)"
// //             value={nearArea}
// //             onChange={(e) => setNearArea(e.target.value)}
// //             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
// //           />

// //           {/* Category */}
// //           <div>
// //             <label className="block text-gray-700 text-sm font-bold mb-2">
// //               Occupancy Type
// //             </label>
// //             <select
// //               value={selectedCategory}
// //               onChange={(e) => setSelectedCategory(e.target.value)}
// //               className="w-[81%] bg-white text-black border border-gray-300 p-2 rounded-md"
// //             >
// //               <option value="">Select a category</option>
// //               {category?.map((item) => (
// //                 <option key={item._id} value={item._id}>
// //                   {item.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Available Beds */}
// //           <div>
// //             <label className="block text-gray-700 text-sm font-bold mb-2">
// //               Available Beds
// //             </label>
// //             <select
// //               value={availableBeds}
// //               onChange={(e) => setAvailableBeds(e.target.value)}
// //               className="w-[81%] bg-white border border-gray-300 p-2 rounded"
// //             >
// //               {[...Array(6)].map((_, i) => (
// //                 <option key={i} value={i + 1}>
// //                   {i + 1}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Gender */}
// //           <div>
// //             <label className="block text-gray-700 text-sm font-bold mb-2">
// //               Gender
// //             </label>
// //             <select
// //               value={gender}
// //               onChange={(e) => setGender(e.target.value)}
// //               className="w-[81%] bg-white border border-gray-300 p-2 rounded"
// //             >
// //               <option value="">Select Gender</option>
// //               <option value="male">Male</option>
// //               <option value="female">Female</option>
// //               <option value="unisex">Unisex</option>
// //             </select>
// //           </div>

// //           {/* Total Beds */}
// //           <div>
// //             <label className="block text-gray-700 text-sm font-bold mb-2">
// //               Total Beds
// //             </label>
// //             <select
// //               value={totalBeds}
// //               onChange={(e) => setTotalBeds(e.target.value)}
// //               className="w-[81%] bg-white border border-gray-300 p-2 rounded"
// //             >
// //               {[...Array(6)].map((_, i) => (
// //                 <option key={i} value={i + 1}>
// //                   {i + 1}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           {/* Availability Checkbox */}
// //           <div className="w-[81%] p-3 border border-gray-300 rounded flex items-center space-x-2">
// //             <input
// //               type="checkbox"
// //               id="isAvailable"
// //               checked={isAvailable}
// //               onChange={(e) => setIsAvailable(e.target.checked)}
// //               className="accent-blue-600"
// //             />
// //             <label htmlFor="isAvailable" className="text-gray-700 font-semibold">
// //               Available for Booking
// //             </label>
// //           </div>

// //           {/* Images (max 3) */}
// //           <div className="w-[81%] border border-gray-300 rounded p-3 flex flex-col">
// //             <label
// //               htmlFor="images"
// //               className="cursor-pointer flex items-center gap-2"
// //             >
// //               <FaImage /> Upload images (max 3)
// //             </label>
// //             <input
// //               type="file"
// //               multiple
// //               accept="image/*"
// //               id="images"
// //               onChange={handleImageChange}
// //               className="hidden"
// //             />
// //             <div className="flex mt-2 space-x-2">
// //               {images.length > 0 &&
// //                 images.map((file, index) => (
// //                   <img
// //                     key={index}
// //                     src={URL.createObjectURL(file)}
// //                     alt="preview"
// //                     className="w-20 h-20 object-cover rounded"
// //                   />
// //                 ))}
// //             </div>
// //           </div>

// //           {/* Submit button */}
// //           <button
// //             type="submit"
// //             className="w-[81%] p-3 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
// //           >
// //             Create Post
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CreatePost;

// import React, { useEffect, useState } from "react";
// import { FaImage } from "react-icons/fa";
// import Navbar from "./Navbar";
// import axios from "axios";
// import { toast } from "react-toastify";

// const CreatePost = () => {
//   const [title, setTitle] = useState("");
//   const [hotelLocation, setHotelLocation] = useState("");
//   const [description, setDescription] = useState("");
//   const [facilities, setFacilities] = useState([]);
//   const [nearArea, setNearArea] = useState("");
//   const [category, setCategory] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [images, setImages] = useState([]);
//   const [gender, setGender] = useState("unisex");
//   const [availableBeds, setAvailableBeds] = useState("0");
//   const [totalBeds, setTotalBeds] = useState("1");
//   const [isAvailable, setIsAvailable] = useState(true);
//   const [price, setPrice] = useState("");
//   const [ownerName, setOwnerName] = useState("");
//   const [ownerContactNumber, setOwnerContactNumber] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [loading, setLoading] = useState(false); // ✅ loader state

//   const allFacilities = [
//     "WiFi",
//     "Meals",
//     "Laundry",
//     "Housekeeping",
//     "CCTV",
//     "Parking",
//     "Power Backup",
//     "RO Water",
//     "AC",
//     "Non-AC",
//     "Gym",
//     "Study Table",
//   ];

//   const fetchCategory = async () => {
//     try {
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
//       );
//       setCategory(data.categories);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 3) {
//       toast.warn("You can only upload a maximum of 3 images.");
//     } else {
//       setImages(files);
//     }
//   };

//   const handleFacilityChange = (e) => {
//     const { value, checked } = e.target;
//     if (checked) {
//       setFacilities((prev) => [...prev, value]);
//     } else {
//       setFacilities((prev) => prev.filter((f) => f !== value));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true); // ✅ start loading

//     if (
//       !title ||
//       !hotelLocation ||
//       !description ||
//       facilities.length === 0 ||
//       !nearArea ||
//       !selectedCategory ||
//       !availableBeds ||
//       !totalBeds ||
//       !ownerName ||
//       !ownerContactNumber ||
//       !price ||
//       !state ||
//       !city
//     ) {
//       toast.error("All fields are required.");
//       setLoading(false);
//       return;
//     }

//     if (images.length !== 3) {
//       toast.error("Please upload exactly 3 images.");
//       setLoading(false);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("hotelLocation", hotelLocation);
//     formData.append("description", description);
//     formData.append("ownerName", ownerName);
//     formData.append("ownerContactNumber", ownerContactNumber);
//     formData.append("state", state);
//     formData.append("city", city);
//     facilities.forEach((f) => {
//       formData.append("facilities", f);
//     });
//     nearArea.split(",").forEach((n) => {
//       formData.append("nearArea", n.trim());
//     });
//     formData.append("category", selectedCategory);
//     formData.append("availableBeds", availableBeds);
//     formData.append("totalBeds", totalBeds);
//     formData.append("isAvailable", isAvailable);
//     formData.append("price", price);
//     formData.append("gender", gender);
//     images.forEach((file) => {
//       formData.append("images", file);
//     });

//     try {
//       await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       toast.success("Post created successfully!");
//       setTitle("");
//       setHotelLocation("");
//       setDescription("");
//       setFacilities([]);
//       setNearArea("");
//       setSelectedCategory("");
//       setImages([]);
//       setAvailableBeds("0");
//       setTotalBeds("1");
//       setGender("unisex");
//       setOwnerName("");
//       setOwnerContactNumber("");
//       setState("");
//       setCity("");
//       setIsAvailable(true);
//       setPrice("");
//     } catch (error) {
//       console.error("Error creating post:", error);
//       toast.error("Failed to create post.");
//     } finally {
//       setLoading(false); // ✅ stop loading
//     }
//   };

//   return (
//     <div className="flex justify-between  text-black mt-11">
//       <div className="ml-[4rem]">
//         <Navbar />
//       </div>
//       <div className="flex flex-col  p-8 w-[81%]">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Create Post</h1>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Title */}
//           <input
//             type="text"
//             placeholder="Pg/Hostel/House Name"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="w-[81%] p-3 border bg-white border-gray-300 rounded"
//             required
//           />

//           {/* Location */}
//           <input
//             type="text"
//             placeholder="Enter Location"
//             value={hotelLocation}
//             onChange={(e) => setHotelLocation(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* State */}
//           <input
//             type="text"
//             placeholder="Enter State Name"
//             value={state}
//             onChange={(e) => setState(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* City */}
//           <input
//             type="text"
//             placeholder="Enter City Name"
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* Owner Name */}
//           <input
//             type="text"
//             placeholder="Owner Name"
//             value={ownerName}
//             onChange={(e) => setOwnerName(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* Owner Contact Number */}
//           <input
//             type="text"
//             placeholder="Owner Contact Number"
//             value={ownerContactNumber}
//             onChange={(e) => setOwnerContactNumber(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* Description */}
//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* Facilities */}
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Facilities
//             </label>
//             <div className="grid grid-cols-2 gap-2 w-[81%] bg-white p-3 border border-gray-300 rounded">
//               {allFacilities.map((facility, index) => (
//                 <label key={index} className="flex items-center space-x-2">
//                   <input
//                     type="checkbox"
//                     value={facility}
//                     checked={facilities.includes(facility)}
//                     onChange={handleFacilityChange}
//                     className="accent-blue-600"
//                   />
//                   <span>{facility}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* Price */}
//           <input
//             type="number"
//             placeholder="Price Per Month"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//             required
//           />

//           {/* Nearby Area */}
//           <input
//             type="text"
//             placeholder="Nearby Areas (comma separated)"
//             value={nearArea}
//             onChange={(e) => setNearArea(e.target.value)}
//             className="w-[81%] bg-white p-3 border border-gray-300 rounded"
//           />

//           {/* Category */}
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Occupancy Type
//             </label>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="w-[81%] bg-white text-black border border-gray-300 p-2 rounded-md"
//             >
//               <option value="">Select a category</option>
//               {category?.map((item) => (
//                 <option key={item._id} value={item._id}>
//                   {item.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Available Beds */}
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Available Beds
//             </label>
//             <select
//               value={availableBeds}
//               onChange={(e) => setAvailableBeds(e.target.value)}
//               className="w-[81%] bg-white border border-gray-300 p-2 rounded"
//             >
//               {[...Array(6)].map((_, i) => (
//                 <option key={i} value={i + 1}>
//                   {i + 1}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Gender
//             </label>
//             <select
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//               className="w-[81%] bg-white border border-gray-300 p-2 rounded"
//             >
//               <option value="">Select Gender</option>
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="unisex">Unisex</option>
//             </select>
//           </div>

//           {/* Total Beds */}
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Total Beds
//             </label>
//             <select
//               value={totalBeds}
//               onChange={(e) => setTotalBeds(e.target.value)}
//               className="w-[81%] bg-white border border-gray-300 p-2 rounded"
//             >
//               {[...Array(6)].map((_, i) => (
//                 <option key={i} value={i + 1}>
//                   {i + 1}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Availability Checkbox */}
//           <div className="w-[81%] p-3 border border-gray-300 rounded flex items-center space-x-2">
//             <input
//               type="checkbox"
//               id="isAvailable"
//               checked={isAvailable}
//               onChange={(e) => setIsAvailable(e.target.checked)}
//               className="accent-blue-600"
//             />
//             <label htmlFor="isAvailable" className="text-gray-700 font-semibold">
//               Available for Booking
//             </label>
//           </div>

//           {/* Images */}
//           <div className="w-[81%] border border-gray-300 rounded p-3 flex flex-col">
//             <label
//               htmlFor="images"
//               className="cursor-pointer flex items-center gap-2"
//             >
//               <FaImage /> Upload images (max 3)
//             </label>
//             <input
//               type="file"
//               multiple
//               accept="image/*"
//               id="images"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//             <div className="flex mt-2 space-x-2">
//               {images.length > 0 &&
//                 images.map((file, index) => (
//                   <img
//                     key={index}
//                     src={URL.createObjectURL(file)}
//                     alt="preview"
//                     className="w-20 h-20 object-cover rounded"
//                   />
//                 ))}
//             </div>
//           </div>

//           {/* Submit button with loader */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-[81%] p-3 rounded text-white font-semibold transition ${
//               loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {loading ? (
//               <div className="flex items-center justify-center gap-2">
//                 <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
//                 Creating post, please wait...
//               </div>
//             ) : (
//               "Create Post"
//             )}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;

import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState([]);
  const [nearArea, setNearArea] = useState("");
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
  const [gender, setGender] = useState("unisex");
  const [availableBeds, setAvailableBeds] = useState("0");
  const [price, setPrice] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerContactNumber, setOwnerContactNumber] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Facilities List
  const allFacilities = [
    "WiFi",
    "Meals",
    "Laundry",
    "Housekeeping",
    "CCTV",
    "Parking",
    "Power Backup",
    "RO Water",
    "AC",
    "Non-AC",
    "Gym",
    "Study Table",
  ];

  // ✅ Fetch categories
  const fetchCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/category/get-category`
      );
      setCategory(data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  // ✅ Image change
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length < 3) {
      toast.warn("Please upload at least 3 images.");
      return;
    }
    if (files.length > 5) {
      toast.warn("You can upload a maximum of 5 images.");
      return;
    }
    setImages(files);
  };

  // ✅ Facilities checkbox
  const handleFacilityChange = (e) => {
    const { value, checked } = e.target;
    setFacilities((prev) =>
      checked ? [...prev, value] : prev.filter((f) => f !== value)
    );
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (
      !title ||
      !hotelLocation ||
      !description ||
      facilities.length === 0 ||
      !nearArea ||
      !selectedCategory ||
      !availableBeds ||
      !ownerName ||
      !ownerContactNumber ||
      !price ||
      !state ||
      !city
    ) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    if (images.length < 3) {
      toast.error("Please upload at least 3 images.");
      setLoading(false);
      return;
    }
    if (images.length > 5) {
      toast.error("You can upload a maximum of 5 images.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("hotelLocation", hotelLocation);
    formData.append("description", description);
    formData.append("ownerName", ownerName);
    formData.append("ownerContactNumber", ownerContactNumber);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("category", selectedCategory);
    formData.append("availableBeds", availableBeds);
    formData.append("price", price);
    formData.append("gender", gender);

    facilities.forEach((f) => formData.append("facilities", f));
    nearArea
      .split(",")
      .map((n) => n.trim())
      .forEach((n) => formData.append("nearArea", n));

    images.forEach((file) => formData.append("images", file));

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/post/create-post`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Post created successfully!");

      // Reset form
      setTitle("");
      setHotelLocation("");
      setDescription("");
      setFacilities([]);
      setNearArea("");
      setSelectedCategory("");
      setImages([]);
      setAvailableBeds("0");
      setGender("unisex");
      setOwnerName("");
      setOwnerContactNumber("");
      setState("");
      setCity("");
      setPrice("");
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post.");
    } finally {
      setLoading(false);
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
            placeholder="Pg/Hostel/House Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[81%] p-3 border bg-white border-gray-300 rounded"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Enter Location"
            value={hotelLocation}
            onChange={(e) => setHotelLocation(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* State */}
          <input
            type="text"
            placeholder="Enter State Name"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* City */}
          <input
            type="text"
            placeholder="Enter City Name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* Owner Name */}
          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* Owner Contact Number */}
          <input
            type="text"
            placeholder="Owner Contact Number"
            value={ownerContactNumber}
            onChange={(e) => setOwnerContactNumber(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
          />

          {/* Facilities */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Facilities
            </label>
            <div className="grid grid-cols-2 gap-2 w-[81%] bg-white p-3 border border-gray-300 rounded">
              {allFacilities.map((facility, index) => (
                <label key={index} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={facility}
                    checked={facilities.includes(facility)}
                    onChange={handleFacilityChange}
                    className="accent-blue-600"
                  />
                  <span>{facility}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <input
            type="number"
            placeholder="Price Per Month"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-[81%] bg-white p-3 border border-gray-300 rounded"
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
              Occupancy Type
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

          {/* Available Beds */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Available Beds
            </label>
            <select
              value={availableBeds}
              onChange={(e) => setAvailableBeds(e.target.value)}
              className="w-[81%] bg-white border border-gray-300 p-2 rounded"
            >
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-[81%] bg-white border border-gray-300 p-2 rounded"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Images */}
          <div className="w-[81%] border border-gray-300 rounded p-3 flex flex-col">
            <label
              htmlFor="images"
              className="cursor-pointer flex items-center gap-2"
            >
              <FaImage /> Upload images (min 3, max 5)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              id="images"
              onChange={handleImageChange}
              className="hidden"
            />
            <div className="flex mt-2 space-x-2">
              {images.length > 0 &&
                images.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-[81%] p-3 rounded text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Creating post...
              </div>
            ) : (
              "Create Post"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
