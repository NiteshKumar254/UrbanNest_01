import React from "react";
import { FaUser, FaEnvelope } from "react-icons/fa";
import Navbar from "./Navbar";
import { useAuth } from "../../context/UserContext";

const Details = () => {
  const [auth, setAuth] = useAuth();
  // console.log(auth, "auth");
  const users = {
    name: auth?.user?.name,
    email: auth?.user?.email,
  };

  return (
    <div className="flex flex-row ml-32 mt-10 mb-10 mr-32 bg-[#413C4D]">
      <Navbar />
      <div className="p-8 bg-[#5D576F] mx-8 mt-10 h-48 flex flex-col justify-center">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Your Details
        </h2>

        <div className="flex items-center text-white mb-4">
          <FaUser className="mr-3 text-white text-lg" />
          <span>
            <strong>Name:</strong> {users.name}
          </span>
        </div>

        <div className="flex items-center text-white">
          <FaEnvelope className="mr-3 text-white text-lg" />
          <span>
            <strong>Email:</strong> {users.email}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Details;