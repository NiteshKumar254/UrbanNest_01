
import React, { useState } from "react";
import { useAuth } from "../../context/UserContext";
import { motion } from "framer-motion";
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserDetails = () => {
  const [auth, setAuth] = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Use a state to manage form fields, pre-filled with current user data
  const [formData, setFormData] = useState({
    name: auth?.user?.name || "",
    password: "", // We don't pre-fill password for security reasons
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut", delay: 0.2 } },
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle the "Edit" and "Update" button click
  const handleUpdate = async () => {
    if (isEditing) {
      try {
        const { data } = await axios.put(
          'http://localhost:3000/api/auth/profile',
          formData,
          {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          }
        );

        if (data?.error) {
          toast.error(data.error);
        } else {
          setAuth({ ...auth, user: data?.updatedUser });
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data.updatedUser;
          localStorage.setItem("auth", JSON.stringify(ls));
          toast.success("Profile updated successfully!");
          setIsEditing(false); // Exit edit mode
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong. Please try again.");
      }
    } else {
      setIsEditing(true); // Enter edit mode
    }
  };

  return (
    <motion.div
      className="p-8 max-w-lg mx-auto bg-[#5D576F] rounded-3xl shadow-2xl overflow-hidden mt-5 mb-5 relative"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full mix-blend-overlay"></div>
      <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-10 rounded-full mix-blend-overlay"></div>

      <div className="relative z-10 text-white">
        <h2 className="text-4xl font-extrabold mb-8 text-center tracking-tight leading-tight">
          Welcome, {auth?.user?.name.split(' ')[0] || "Guest"}!
        </h2>

        <div className="space-y-6">
          <motion.div variants={itemVariants} className="flex items-center bg-white bg-opacity-15 p-4 rounded-xl shadow-inner backdrop-blur-sm">
            <span className="font-semibold text-lg w-24 flex-shrink-0">Name:</span>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-lg font-medium bg-transparent border-b border-white focus:outline-none"
              />
            ) : (
              <span className="text-lg font-medium">{auth?.user?.name || "N/A"}</span>
            )}
          </motion.div>
          
          {/* Password is now an editable field */}
          <motion.div variants={itemVariants} className="flex items-center bg-white bg-opacity-15 p-4 rounded-xl shadow-inner backdrop-blur-sm">
            <span className="font-semibold text-lg w-24 flex-shrink-0">Password:</span>
            {isEditing ? (
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full text-lg font-medium bg-transparent border-b border-white focus:outline-none"
                placeholder="Enter new password"
              />
            ) : (
              <span className="text-lg font-medium">********</span> // Hide the password
            )}
          </motion.div>
          
          {/* Email remains read-only */}
          <motion.div variants={itemVariants} className="flex items-center bg-white bg-opacity-15 p-4 rounded-xl shadow-inner backdrop-blur-sm">
            <span className="font-semibold text-lg w-24 flex-shrink-0">Email:</span>
            <span className="text-lg font-medium">{auth?.user?.email || "N/A"}</span>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpdate}
          className="mt-10 w-full py-4 px-6 bg-white text-indigo-700 font-bold rounded-full text-lg shadow-xl hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          {isEditing ? "Update Profile" : "Edit Profile"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UserDetails;