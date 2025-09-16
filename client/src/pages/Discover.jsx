
// // // // import React, { useEffect, useState } from "react";
// // // // import axios from "axios";
// // // // import { Link } from "react-router-dom";
// // // // import Filter from "../components/Search/Filter";

// // // // const Discover = () => {
// // // //   const [posts, setPosts] = useState([]);
// // // //   const [filteredPosts, setFilteredPosts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);

// // // //   // Fetch posts
// // // //   useEffect(() => {
// // // //     const fetchPosts = async () => {
// // // //       try {
// // // //         const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`);

       
// // // //         if (res.data.success) {
// // // //           setPosts(res.data.posts);
// // // //           setFilteredPosts(res.data.posts);
// // // //         }
// // // //         setLoading(false);
// // // //       } catch (error) {
// // // //         console.error("Error fetching posts", error);
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchPosts();
// // // //   }, []);

// // // //   // Filter handler
// // // //   const handleFilter = (filters) => {
// // // //     let results = [...posts];

// // // //     if (filters.gender) {
// // // //       results = results.filter(
// // // //         (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
// // // //       );
// // // //     }

// // // //     if (filters.minPrice) {
// // // //       results = results.filter((p) => Number(p.price) >= Number(filters.minPrice));
// // // //     }
// // // //     if (filters.maxPrice) {
// // // //       results = results.filter((p) => Number(p.price) <= Number(filters.maxPrice));
// // // //     }

// // // //     if (filters.amenities.length > 0) {
// // // //       results = results.filter((p) =>
// // // //         filters.amenities.every((a) =>
// // // //           p.facilities?.map((f) => f.toLowerCase()).includes(a.toLowerCase())
// // // //         )
// // // //       );
// // // //     }

// // // //     if (filters.isAvailable !== undefined) {
// // // //       results = results.filter((p) => p.isAvailable === filters.isAvailable);
// // // //     }

// // // //     if (filters.state) {
// // // //       results = results.filter((p) =>
// // // //         p.state?.toLowerCase().includes(filters.state.toLowerCase())
// // // //       );
// // // //     }

// // // //     if (filters.city) {
// // // //       results = results.filter((p) =>
// // // //         p.city?.toLowerCase().includes(filters.city.toLowerCase())
// // // //       );
// // // //     }

// // // //     setFilteredPosts(results);
// // // //   };

// // // //   if (loading) {
// // // //     return <h2 className="text-center mt-10 text-2xl font-semibold">Loading...</h2>;
// // // //   }

// // // //   return (
// // // //     <div className="mx-[4rem]  my-[2rem] ">
// // // //       {/* Heading */}
// // // //       <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
// // // //         Discover <span className="text-blue-600">Stays</span>
// // // //       </h1>

// // // //       {/* Layout */}
// // // //       <div className="flex flex-col md:flex-row gap-8">
// // // //         {/* Filters Sidebar */}
// // // //         <div className="bg-white shadow-md rounded-xl p-5 h-fit md:w-1/4 w-full">
// // // //           <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
// // // //           <Filter onFilter={handleFilter} />
// // // //         </div>

// // // //         {/* Posts Grid */}
// // // //         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // // //           {filteredPosts.length > 0 ? (
// // // //             filteredPosts.map((post) => (
// // // //               <Link
// // // //                 to={`/product/${post.slug}`}
// // // //                 key={post._id}
// // // //                 className="block bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden"
// // // //               >
// // // //                 {/* Image */}
// // // //                 {post.images && post.images.length > 0 && (
// // // //                   <div className="relative overflow-hidden rounded-t-xl">
// // // //                     <img
// // // //                       src={post.images[0]}
// // // //                       alt={post.title}
// // // //                       className="h-48 w-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-95"
// // // //                     />
// // // //                   </div>
// // // //                 )}

// // // //                 {/* Content */}
// // // //                 <div className="p-4 flex flex-col justify-between h-40">
// // // //                   <div>
// // // //                     <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
// // // //                       {post.title}
// // // //                     </h2>
// // // //                     <p className="text-gray-600 text-sm">{post.hotelLocation}</p>
// // // //                     <p className="text-gray-500 mt-2 text-sm line-clamp-2">
// // // //                       {post.description}
// // // //                     </p>
// // // //                   </div>

// // // //                   <div className="flex justify-between items-center mt-3">
// // // //                     <span className="text-base font-bold text-blue-600">
// // // //                       ₹{post.price}
// // // //                     </span>
// // // //                     <span className="px-3 py-1 text-blue-600 text-xs font-semibold border border-blue-500 rounded-md">
// // // //                       View →
// // // //                     </span>
// // // //                   </div>
// // // //                 </div>
// // // //               </Link>
// // // //             ))
// // // //           ) : (
// // // //             <p className="col-span-full text-center text-gray-500 text-lg">
// // // //               No results found for your filters.
// // // //             </p>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Discover;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { Link } from "react-router-dom";
// // // import Filter from "../components/Search/Filter";

// // // const Discover = () => {
// // //   const [posts, setPosts] = useState([]);
// // //   const [filteredPosts, setFilteredPosts] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   // Fetch posts
// // //   useEffect(() => {
// // //     const fetchPosts = async () => {
// // //       try {
// // //         const res = await axios.get(
// // //           `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
// // //         );

// // //         if (res.data.success) {
// // //           setPosts(res.data.posts);
// // //           setFilteredPosts(res.data.posts);
// // //         }
// // //         setLoading(false);
// // //       } catch (error) {
// // //         console.error("Error fetching posts", error);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchPosts();
// // //   }, []);

// // //   // Filter handler
// // //   const handleFilter = (filters) => {
// // //     let results = [...posts];

// // //     if (filters.gender) {
// // //       results = results.filter(
// // //         (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
// // //       );
// // //     }

// // //     if (filters.minPrice) {
// // //       results = results.filter(
// // //         (p) => Number(p.price) >= Number(filters.minPrice)
// // //       );
// // //     }
// // //     if (filters.maxPrice) {
// // //       results = results.filter(
// // //         (p) => Number(p.price) <= Number(filters.maxPrice)
// // //       );
// // //     }

// // //     if (filters.amenities.length > 0) {
// // //       results = results.filter((p) =>
// // //         filters.amenities.every((a) =>
// // //           p.facilities?.map((f) => f.toLowerCase()).includes(a.toLowerCase())
// // //         )
// // //       );
// // //     }

// // //     if (filters.isAvailable !== undefined) {
// // //       results = results.filter((p) => p.isAvailable === filters.isAvailable);
// // //     }

// // //     if (filters.state) {
// // //       results = results.filter((p) =>
// // //         p.state?.toLowerCase().includes(filters.state.toLowerCase())
// // //       );
// // //     }

// // //     if (filters.city) {
// // //       results = results.filter((p) =>
// // //         p.city?.toLowerCase().includes(filters.city.toLowerCase())
// // //       );
// // //     }

// // //     setFilteredPosts(results);
// // //   };

// // //   // ⏳ Loading UI
// // //   if (loading) {
// // //     return (
// // //       <div className="flex flex-col items-center justify-center min-h-screen">
// // //         {/* Spinner */}
// // //         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
// // //         <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
// // //           Fetching awesome stays for you...
// // //         </p>

// // //         {/* Skeleton Grid */}
// // //         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-6">
// // //           {[1, 2, 3, 4, 5, 6].map((i) => (
// // //             <div
// // //               key={i}
// // //               className="bg-white rounded-xl shadow-md p-4 animate-pulse"
// // //             >
// // //               <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
// // //               <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
// // //               <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
// // //               <div className="h-4 bg-gray-300 rounded w-5/6"></div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="mx-[4rem]  my-[2rem] ">
// // //       {/* Heading */}
// // //       <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
// // //         Discover <span className="text-blue-600">Stays</span>
// // //       </h1>

// // //       {/* Layout */}
// // //       <div className="flex flex-col md:flex-row gap-8">
// // //         {/* Filters Sidebar */}
// // //         <div className="bg-white shadow-md rounded-xl p-5 h-fit md:w-1/4 w-full">
// // //           <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
// // //           <Filter onFilter={handleFilter} />
// // //         </div>

// // //         {/* Posts Grid */}
// // //         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// // //           {filteredPosts.length > 0 ? (
// // //             filteredPosts.map((post) => (
// // //               <Link
// // //                 to={`/product/${post.slug}`}
// // //                 key={post._id}
// // //                 className="block bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden"
// // //               >
// // //                 {/* Image */}
// // //                 {post.images && post.images.length > 0 && (
// // //                   <div className="relative overflow-hidden rounded-t-xl">
// // //                     <img
// // //                       src={post.images[0]}
// // //                       alt={post.title}
// // //                       className="h-48 w-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-95"
// // //                     />
// // //                   </div>
// // //                 )}

// // //                 {/* Content */}
// // //                 <div className="p-4 flex flex-col justify-between h-40">
// // //                   <div>
// // //                     <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
// // //                       {post.title}
// // //                     </h2>
// // //                     <p className="text-gray-600 text-sm">{post.hotelLocation}</p>
// // //                     <p className="text-gray-500 mt-2 text-sm line-clamp-2">
// // //                       {post.description}
// // //                     </p>
// // //                   </div>

// // //                   <div className="flex justify-between items-center mt-3">
// // //                     <span className="text-base font-bold text-blue-600">
// // //                       ₹{post.price}
// // //                     </span>
// // //                     <span className="px-3 py-1 text-blue-600 text-xs font-semibold border border-blue-500 rounded-md">
// // //                       View →
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             ))
// // //           ) : (
// // //             <p className="col-span-full text-center text-gray-500 text-lg">
// // //               No results found for your filters.
// // //             </p>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Discover;
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import Filter from "../components/Search/Filter";

// // const Discover = () => {
// //   const [posts, setPosts] = useState([]);
// //   const [filteredPosts, setFilteredPosts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   // Fetch posts
// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
// //         );

// //         if (res.data.success) {
// //           setPosts(res.data.posts);
// //           setFilteredPosts(res.data.posts);
// //         }
// //         setLoading(false);
// //       } catch (error) {
// //         console.error("Error fetching posts", error);
// //         setLoading(false);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   // Filter handler
// //   const handleFilter = (filters) => {
// //     let results = [...posts];

// //     if (filters.gender) {
// //       results = results.filter(
// //         (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
// //       );
// //     }

// //     if (filters.minPrice) {
// //       results = results.filter(
// //         (p) => Number(p.price) >= Number(filters.minPrice)
// //       );
// //     }

// //     if (filters.maxPrice) {
// //       results = results.filter(
// //         (p) => Number(p.price) <= Number(filters.maxPrice)
// //       );
// //     }

// //     if (filters.amenities.length > 0) {
// //       results = results.filter((p) =>
// //         filters.amenities.every((a) =>
// //           p.facilities?.map((f) => f.toLowerCase()).includes(a.toLowerCase())
// //         )
// //       );
// //     }

// //     if (filters.isAvailable !== undefined) {
// //       results = results.filter((p) => p.isAvailable === filters.isAvailable);
// //     }

// //     if (filters.state) {
// //       results = results.filter((p) =>
// //         p.state?.toLowerCase().includes(filters.state.toLowerCase())
// //       );
// //     }

// //     if (filters.city) {
// //       results = results.filter((p) =>
// //         p.city?.toLowerCase().includes(filters.city.toLowerCase())
// //       );
// //     }

// //     setFilteredPosts(results);
// //   };

// //   // Loading state
// //   if (loading) {
// //     return (
// //       <div className="flex flex-col items-center justify-center min-h-screen">
// //         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
// //         <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
// //           Fetching awesome stays for you...
// //         </p>

// //         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-6">
// //           {[1, 2, 3, 4, 5, 6].map((i) => (
// //             <div key={i} className="bg-white rounded-xl shadow-md p-4 animate-pulse">
// //               <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
// //               <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
// //               <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
// //               <div className="h-4 bg-gray-300 rounded w-5/6"></div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="mx-[4rem] my-[2rem]">
// //       <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
// //         Discover <span className="text-blue-600">Stays</span>
// //       </h1>

// //       <div className="flex flex-col md:flex-row gap-8">
// //         {/* Filters Sidebar */}
// //         <div className="bg-white shadow-md rounded-xl p-5 h-fit md:w-1/4 w-full">
// //           <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
// //           <Filter onFilter={handleFilter} />
// //         </div>

// //         {/* Posts Grid */}
// //         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredPosts.length > 0 ? (
// //             filteredPosts.map((post) => (
// //               <Link
// //                 to={`/product/${post.slug}`}
// //                 key={post._id}
// //                 className="block bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden"
// //               >
// //                 {post.images && post.images.length > 0 && (
// //                   <div className="relative overflow-hidden rounded-t-xl">
// //                     <img
// //                       src={post.images[0]}
// //                       alt={post.title}
// //                       className="h-48 w-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-95"
// //                     />
// //                   </div>
// //                 )}

// //                 <div className="p-4 flex flex-col justify-between h-40">
// //                   <div>
// //                     <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
// //                       {post.title}
// //                     </h2>
// //                     <p className="text-gray-600 text-sm">{post.hotelLocation}</p>
// //                     <p className="text-gray-500 mt-2 text-sm line-clamp-2">
// //                       {post.description}
// //                     </p>
// //                   </div>

// //                   <div className="flex justify-between items-center mt-3">
// //                     <span className="text-base font-bold text-blue-600">
// //                       ₹{post.price}
// //                     </span>
// //                     <span className="px-3 py-1 text-blue-600 text-xs font-semibold border border-blue-500 rounded-md">
// //                       View →
// //                     </span>
// //                   </div>
// //                 </div>
// //               </Link>
// //             ))
// //           ) : (
// //             <p className="col-span-full text-center text-gray-500 text-lg">
// //               No results found for your filters.
// //             </p>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Discover;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Filter from "../components/Search/Filter";

// const Discover = () => {
//   const [posts, setPosts] = useState([]);
//   const [filteredPosts, setFilteredPosts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Fetch posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
//         );

//         if (res.data.success) {
//           setPosts(res.data.posts);
//           setFilteredPosts(res.data.posts);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching posts", error);
//         setLoading(false);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Filter handler
//   const handleFilter = (filters) => {
//     let results = [...posts];

//     if (filters.gender) {
//       results = results.filter(
//         (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
//       );
//     }

//     if (filters.minPrice) {
//       results = results.filter(
//         (p) => Number(p.price) >= Number(filters.minPrice)
//       );
//     }
//     if (filters.maxPrice) {
//       results = results.filter(
//         (p) => Number(p.price) <= Number(filters.maxPrice)
//       );
//     }

//     if (filters.amenities.length > 0) {
//       results = results.filter((p) =>
//         filters.amenities.every((a) =>
//           p.facilities?.map((f) => f.toLowerCase()).includes(a.toLowerCase())
//         )
//       );
//     }

//     if (filters.isAvailable !== undefined) {
//       results = results.filter((p) => p.isAvailable === filters.isAvailable);
//     }

//     if (filters.state) {
//       results = results.filter((p) =>
//         p.state?.toLowerCase().includes(filters.state.toLowerCase())
//       );
//     }

//     if (filters.city) {
//       results = results.filter((p) =>
//         p.city?.toLowerCase().includes(filters.city.toLowerCase())
//       );
//     }

//     setFilteredPosts(results);
//   };

//   // ⏳ Loading UI
//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         {/* Spinner */}
//         <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//         <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
//           Fetching awesome stays for you...
//         </p>

//         {/* Skeleton Grid */}
//         <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-6">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow-md p-4 animate-pulse"
//             >
//               <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
//               <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
//               <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
//               <div className="h-4 bg-gray-300 rounded w-5/6"></div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-[4rem] my-[2rem]">
//       {/* Heading */}
//       <h1 className="text-4xl font-extrabold text-gray-800 mb-10 text-center">
//         Discover <span className="text-blue-600">Stays</span>
//       </h1>

//       {/* Layout */}
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <div className="bg-white shadow-md rounded-xl p-5 h-fit md:w-1/4 w-full">
//           <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
//           <Filter onFilter={handleFilter} />
//         </div>

//         {/* Posts Grid */}
//         <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredPosts.length > 0 ? (
//             filteredPosts.map((post) => (
//               <Link
//                 to={`/product/${post.slug}`}
//                 key={post._id}
//                 className="block bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden"
//               >
//                 {/* Image */}
//                 {post.images && post.images.length > 0 && (
//                   <div className="relative overflow-hidden rounded-t-xl">
//                     <img
//                       src={post.images[0]}
//                       alt={post.title}
//                       className="h-48 w-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-95"
//                     />
//                   </div>
//                 )}

//                 {/* Content */}
//                 <div className="p-4 flex flex-col justify-between h-40">
//                   <div>
//                     <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
//                       {post.title}
//                     </h2>
//                     <p className="text-gray-600 text-sm">{post.hotelLocation}</p>
//                     <p className="text-gray-500 mt-2 text-sm line-clamp-2">
//                       {post.description}
//                     </p>
//                   </div>

//                   <div className="flex justify-between items-center mt-3">
//                     <span className="text-base font-bold text-blue-600">
//                       ₹{post.price}
//                     </span>
//                     <span className="px-3 py-1 text-blue-600 text-xs font-semibold border border-blue-500 rounded-md">
//                       View →
//                     </span>
//                   </div>
//                 </div>
//               </Link>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500 text-lg">
//               No results found for your filters.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Discover;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "../components/Search/Filter";

const Discover = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
        );

        if (res.data.success) {
          setPosts(res.data.posts);
          setFilteredPosts(res.data.posts);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter handler
  const handleFilter = (filters) => {
    let results = [...posts];

    if (filters.gender) {
      results = results.filter(
        (p) => p.gender?.toLowerCase() === filters.gender.toLowerCase()
      );
    }

    if (filters.minPrice) {
      results = results.filter(
        (p) => Number(p.price) >= Number(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      results = results.filter(
        (p) => Number(p.price) <= Number(filters.maxPrice)
      );
    }

    if (filters.amenities.length > 0) {
      results = results.filter((p) =>
        filters.amenities.every((a) =>
          p.facilities?.map((f) => f.toLowerCase()).includes(a.toLowerCase())
        )
      );
    }

    if (filters.isAvailable !== undefined) {
      results = results.filter((p) => p.isAvailable === filters.isAvailable);
    }

    if (filters.state) {
      results = results.filter((p) =>
        p.state?.toLowerCase().includes(filters.state.toLowerCase())
      );
    }

    if (filters.city) {
      results = results.filter((p) =>
        p.city?.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredPosts(results);
  };

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-lg font-medium animate-pulse">
          Fetching awesome stays for you...
        </p>

        {/* Skeleton Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-4 animate-pulse h-[22rem]"
            >
              <div className="h-40 bg-gray-300 rounded-md mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-[#413C4D] mx-[4rem] my-[2rem]">
      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-white mb-10 text-center">
        Discover <span className="text-blue-200">Stays</span>
      </h1>

      {/* Layout */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="bg-white shadow-md rounded-xl p-5 h-fit md:w-1/4 w-full">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Filters</h2>
          <Filter onFilter={handleFilter} />
        </div>

        {/* Posts Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Link
                to={`/product/${post.slug}`}
                key={post._id}
                className="block bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300 overflow-hidden h-[22rem] flex flex-col"
              >
                {/* Image Section */}
                {post.images && post.images.length > 0 && (
                  <div className="h-48 w-full overflow-hidden rounded-t-xl">
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="h-full w-full object-cover transform transition duration-500 hover:scale-105 hover:brightness-95"
                    />
                  </div>
                )}

                {/* Content Section */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-sm">{post.hotelLocation}</p>
                    <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-base font-bold text-blue-600">
                      ₹{post.price}
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-[#2C2835] to-[#6B657C] hover:from-[#413C4D] hover:to-[#2C2835] text-l w-20 font-semibold border border-blue-500 rounded-md">
                      View →
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No results found for your filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;



