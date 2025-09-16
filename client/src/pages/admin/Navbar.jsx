

import React from "react";
import { FaUser, FaPlus, FaList, FaFolder, FaMap, FaBell } from "react-icons/fa";
import { Link } from "react-router-dom";

const navbarMenu = [
  { id: 1, name: "Admin Details", link: "/admin/details", icon: <FaUser /> },
  { id: 2, name: "Create Post", link: "/admin/create-post", icon: <FaPlus /> },
  { id: 3, name: "All Posts", link: "/admin/all-post", icon: <FaList /> },
  {
    id: 4,
    name: "Create Category",
    link: "/admin/create-category",
    icon: <FaFolder />,
  },
  { id: 5, name: "All Bookings", link: "/admin/all-booking", icon: <FaMap /> },
  { id: 6, name: "Notifications", link: "/admin/notifications", icon: <FaBell /> }, // ✅ new
];

const Navbar = () => {
  return (
    <div className="bg-[#5D576F] text-white w-[15rem] h-50  mt-10 mb-10 min-h-[28rem] border-r border-gray-700">
      <nav className="flex flex-col p-5 space-y-4">
        {navbarMenu.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="flex items-center p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
          >
            <span className="mr-3 text-xl">{item.icon}</span>
            <span className="text-md">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
