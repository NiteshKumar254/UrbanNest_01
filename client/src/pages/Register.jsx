import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); //  default role
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // basic validation
    if (!name || !email || !password) {
      setError("Please enter all fields");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register`,
        { name, email, password, role }, // send role also
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Registration successful");
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");

      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.error || "Registration failed");
      toast.error("Registration failed, please try again!");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center bg-cover justify-center w-full bg-gray-100 pt-20 pb-20"
     style={{ backgroundImage: "url('/signup-bg-img2.png')" }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>

          {/* Role selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Register as
            </label>
            <div className="flex gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                User
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={(e) => setRole(e.target.value)}
                  className="mr-2"
                />
                Admin
              </label>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-3"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-700">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Please Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
