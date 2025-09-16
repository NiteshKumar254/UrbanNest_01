

// import React, { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom"; 

// const AllPost = () => {
//   const [postData, setPostData] = useState([]);
//   const navigate = useNavigate(); 

//   const handleApi = async () => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
//       );
//       setPostData(response.data.posts);
//     } catch (error) {
//       console.log(error);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     handleApi();
//   }, []);


//   const handlePostClick = (slug) => {
//     navigate(`/product/${slug}`);
//   };

//   return (
//     <div className="flex justify-between text-black mt-11">
//       <div className="ml-[4rem]">
//         <Navbar />
//       </div>
      
//       <div className="max-w-7xl mx-auto px-4 py-8">
//         <h1 className="text-2xl font-bold mb-6">All Posts</h1>

//         {postData.length === 0 ? (
//           <p className="text-gray-500">No posts available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {postData.map((post) => (
//               <div
//                 key={post._id}
//                 onClick={() => handlePostClick(post.slug)} // 
//                 className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer" // ✅ cursor-pointer क्लास जोड़ें ताकि यह क्लिक करने योग्य दिखे
//               >
//                 {post.images && post.images.length > 0 && (
//                   <img
//                     src={post.images[0]}
//                     alt={post.title}
//                     className="w-full h-48 object-cover"
//                   />
//                 )}

//                 <div className="p-4">
//                   <h2 className="text-lg font-semibold">{post.title}</h2>
//                   <p className="text-sm text-gray-500">
//                     {post.hotelLocation}
//                   </p>
//                   <p className="text-sm mt-2 line-clamp-2 text-gray-600">
//                     {post.description}
//                   </p>

//                   <div className="flex justify-between items-center mt-3 text-sm">
//                     <span className="font-medium text-green-600">
//                       ₹{post.price}/month
//                     </span>
//                     <span className="text-gray-600">
//                       Beds: {post.availableBeds}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllPost;
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AllPost = () => {
  const [postData, setPostData] = useState([]);
  const navigate = useNavigate();

  // Fetch All Posts
  const handleApi = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/post/get-all-posts`
      );
      setPostData(response.data.posts);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    handleApi();
  }, []);

  // Navigate to post details
  const handlePostClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  // Delete Post
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/post/delete-post/${id}`
      );

      if (response.data.success) {
        toast.success("Post deleted successfully");
        setPostData(postData.filter((post) => post._id !== id)); // UI update
      } else {
        toast.error(response.data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Server error while deleting post");
    }
  };

  return (
    <div className="flex justify-between text-black mt-11">
      <div className="ml-[4rem]">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">All Posts</h1>

        {postData.length === 0 ? (
          <p className="text-gray-500">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postData.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition relative"
              >
                {/* Delete Button (top-right corner) */}
                <button
                  onClick={() => handleDelete(post._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600 transition"
                >
                  Delete
                </button>

                {/* Card Clickable Section */}
                <div
                  onClick={() => handlePostClick(post.slug)}
                  className="cursor-pointer"
                >
                  {post.images && post.images.length > 0 && (
                    <img
                      src={post.images[0]}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}

                  <div className="p-4">
                    <h2 className="text-lg font-semibold">{post.title}</h2>
                    <p className="text-sm text-gray-500">
                      {post.hotelLocation}
                    </p>
                    <p className="text-sm mt-2 line-clamp-2 text-gray-600">
                      {post.description}
                    </p>

                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="font-medium text-green-600">
                        ₹{post.price}/month
                      </span>
                      <span className="text-gray-600">
                        Beds: {post.availableBeds}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPost;
