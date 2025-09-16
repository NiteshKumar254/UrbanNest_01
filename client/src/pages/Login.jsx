
// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { useAuth } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [auth, setAuth] = useAuth();

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       console.log({ email, password });

//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
//         { email, password },
//         { headers: { "Content-Type": "application/json" } }
//       );

//       toast.success("Login successful");

//       setAuth({
//         ...auth,
//         user: response.data?.user,
//         token: response.data?.token,
//       });

//       localStorage.setItem("auth", JSON.stringify(response.data));

//       setEmail("");
//       setPassword("");

//       navigate("/");
//     } catch (error) {
//       const backendError = error.response?.data?.error;

//       let friendlyMessage = "Login failed, please try again!";
//       if (backendError === "Invalid user details") {
//         friendlyMessage = "No account found. Please create one!";
//       } else if (backendError === "Invalid credentials") { 
//         friendlyMessage = "Invalid email or password!";
//       }

//       setError(friendlyMessage);
//       toast.error(friendlyMessage);
//       console.error(error);
//     }
//   };

//   return (
//     <div className="flex items-center bg-cover justify-center bg-[#5D576F] pt-32 pb-32"
//     style={{ backgroundImage: "url('/signup-bg-img2.png')" }}>
//       <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border bg-white text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               required
//             />
//           </div>

//           {/* Keep me signed in + Forgot password */}
//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input
//                 type="checkbox"
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
//               />
//               <span className="ml-2 text-sm text-gray-700">
//                 Keep me signed in
//               </span>
//             </label>
//             <a href="#" className="text-sm text-indigo-600 hover:underline">
//               Forgot password?
//             </a>
//           </div>

//           {/* Error message */}
//           {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

//           {/* Submit button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-3"
//           >
//             Login
//           </button>
//         </form>

//         {/* Redirect to Register */}
//         <p className="text-center mt-6 text-sm text-gray-700">
//           Don't have an account?{" "}
//           <a href="/register" className="text-blue-500 hover:underline">
//             Register
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Login successful");

      setAuth({
        ...auth,
        user: response.data?.user,
        token: response.data?.token,
      });

      localStorage.setItem("auth", JSON.stringify(response.data));

      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      const backendError = error.response?.data?.error;

      let friendlyMessage = "Login failed, please try again!";

      // Backend error handling
      if (backendError === "Invalid user details, please create an account") {
        friendlyMessage = "No account found. Please create one!";
      } else if (backendError === "Invalid credentials") {
        friendlyMessage = "Invalid email or password!";
      }

      setError(friendlyMessage);
      toast.error(friendlyMessage);
      console.error("Login Error:", error.response?.data || error);
    }
  };

  return (
    <div
      className="flex items-center bg-cover justify-center bg-[#5D576F] pt-32 pb-32"
      style={{ backgroundImage: "url('/signup-bg-img2.png')" }}
    >
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
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

          {/* Keep me signed in + Forgot password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                Keep me signed in
              </span>
            </label>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Error message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 my-3"
          >
            Login
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-center mt-6 text-sm text-gray-700">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
