// import { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import { FaPaperPlane } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// export default function Chatbot() {
//   const [messages, setMessages] = useState([
//     { role: "bot", type: "text", text: "Hi 👋! How can I help you find a PG today?" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const bottomRef = useRef(null);
//   const navigate = useNavigate();

//   const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

//   const sendMessage = async (customMessage) => {
//     const messageText = customMessage || input;
//     if (!messageText.trim()) return;

//     const userMsg = { role: "user", type: "text", text: messageText };
//     setMessages((prev) => [...prev, userMsg]);
//     setInput("");
//     setLoading(true);

//     try {
//       const { data } = await axios.post(`${API_URL}/api/chatbot`, {
//         message: messageText,
//       });

//       if (data.type === "pg-list") {
//         const botMsg = { role: "bot", type: "pg-list", data: data.data, text: data.reply };
//         setMessages((prev) => [...prev, botMsg]);
//       } else {
//         const botMsg = { role: "bot", type: "text", text: data.reply };
//         setMessages((prev) => [...prev, botMsg]);
//       }
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { role: "bot", type: "text", text: "⚠️ Oops! Server se connect nahi ho paaya. Thoda baad try karo 🙂" },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Scroll only inside chat container
//   useEffect(() => {
//     if (messages.length > 1) {
//       const container = bottomRef.current?.parentElement;
//       if (container) {
//         container.scrollTop = container.scrollHeight;
//       }
//     }
//   }, [messages]);

//   // 🔹 Categorized Suggestions (Enhanced)
//   const suggestionGroups = {
//     Budget: ["PG under 5000", "PG 5k-10k", "Luxury PGs"],
//     Location: ["Near Metro", "In Delhi", "In Bangalore", "In Hyderabad"],
//     Facility: ["With WiFi", "With AC", "With Food"],
//     Gender: ["Boys PG", "Girls PG", "Co-Living"],
//     "Room Type": ["Single Room", "Double Sharing", "Triple Sharing"],
//   };

//   return (
//     <div className="w-[800px] h-[600px] border ml-80 rounded-2xl shadow-lg flex flex-col">
//       {/* Header */}
//       <div className="bg-blue-600 text-white text-lg font-semibold p-3 rounded-t-2xl">
//         PG Finder Bot 🤖
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             className={`flex items-start space-x-2 ${
//               msg.role === "user" ? "justify-end" : "justify-start"
//             }`}
//           >
//             {msg.role === "bot" && <span className="text-xl">🤖</span>}

//             {/* Text Messages */}
//             {msg.type === "text" && (
//               <div
//                 className={`px-3 py-2 rounded-xl max-w-[75%] ${
//                   msg.role === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-800"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             )}

//             {/* PG List Cards */}
//             {msg.type === "pg-list" && (
//               <div className="space-y-2">
//                 <p className="text-gray-700 font-medium">{msg.text}</p>
//                 {msg.data.map((post) => (
//                   <div
//                     key={post._id}
//                     onClick={() => navigate(`/product/${post.slug || post.title}`)}
//                     className="border rounded-lg p-2 bg-white shadow-sm text-sm cursor-pointer hover:bg-gray-100 transition"
//                   >
//                     <h3 className="font-semibold">{post.title}</h3>
//                     <p className="text-gray-600">₹{post.price} • {post.city}</p>
//                     {post.nearArea && (
//                       <p className="text-gray-500 text-xs">Near {post.nearArea}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {msg.role === "user" && <span className="text-xl">👤</span>}
//           </div>
//         ))}

//         {/* Typing Indicator */}
//         {loading && (
//           <div className="flex items-center space-x-1 text-gray-500 text-sm">
//             <span>🤖</span>
//             <span className="animate-pulse">● ● ●</span>
//           </div>
//         )}

//         <div ref={bottomRef} />
//       </div>

//       {/* 🔹 Categorized Quick Suggestions (Enhanced UI) */}
//       <div className="px-3 py-2 border-t bg-gray-100 space-y-3 max-h-44 overflow-y-auto">
//         {Object.entries(suggestionGroups).map(([category, options], idx) => (
//           <div key={idx} className="space-y-1">
//             {/* Category Header */}
//             <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
//               {category === "Budget" && <span>💰</span>}
//               {category === "Location" && <span>📍</span>}
//               {category === "Facility" && <span>🛠</span>}
//               {category === "Gender" && <span>👥</span>}
//               {category === "Room Type" && <span>🛏</span>}
//               <span>{category}</span>
//               <div className="flex-1 border-t border-gray-300"></div>
//             </div>

//             {/* Options as scrollable chips */}
//             <div className="flex gap-2 overflow-x-auto scrollbar-hide">
//               {options.map((q, i) => (
//                 <button
//                   key={i}
//                   onClick={() => sendMessage(q)}
//                   className="whitespace-nowrap bg-white border px-4 py-1.5 rounded-full text-sm shadow-sm hover:bg-blue-100 hover:border-blue-400 transition"
//                 >
//                   {q}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Input */}
//       <div className="flex items-center border-t p-2">
//         <textarea
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter" && !e.shiftKey) {
//               e.preventDefault();
//               sendMessage();
//             }
//           }}
//           placeholder="Type your message..."
//           rows={1}
//           className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//         />
//         <button
//           onClick={() => sendMessage()}
//           disabled={loading}
//           className="ml-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full"
//         >
//           <FaPaperPlane size={16} />
//         </button>
//       </div>
//     </div>
//   );
// }

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: "bot", type: "text", text: "Hi 👋! How can I help you find a PG today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

  const sendMessage = async (customMessage) => {
    const messageText = customMessage || input;
    if (!messageText.trim()) return;

    const userMsg = { role: "user", type: "text", text: messageText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axios.post(`${API_URL}/api/chatbot`, {
        message: messageText,
      });

      if (data.type === "pg-list") {
        const botMsg = { role: "bot", type: "pg-list", data: data.data, text: data.reply };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        const botMsg = { role: "bot", type: "text", text: data.reply };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", type: "text", text: "⚠️ Oops! Server se connect nahi ho paaya. Thoda baad try karo 🙂" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Scroll only inside chat container
  useEffect(() => {
    if (messages.length > 1) {
      const container = bottomRef.current?.parentElement;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [messages]);

  // 🔹 Categorized Suggestions (Backend aligned)
const suggestionGroups = {
 Budget: [
    "PG under 5000",    // singleMatch → price <= 5000
    "PG above 5000", // rangeMatch → price between 5000 - 10000
    "PG above 10000"    // singleMatch but treated as > 10000 (Luxury PGs)
  ],// price
  Location: ["Near Metro", "In Patna", "In Bhopal", "In Kolkata"], // city/state/nearArea
  Facility: ["With WiFi", "With AC", "With Food", "With Parking"], // facilities[]
  Gender: ["For Male", "For Female", "For Unisex"], // ✅ backend aligned
};



  return (
    <div className="w-[800px] h-[600px] border ml-80 rounded-2xl shadow-lg mt-10 mb-10 flex flex-col">
      {/* Header */}
      <div className="bg-[#413C4D] text-white text-lg font-semibold p-3 rounded-t-2xl">
        PG Finder Bot 🤖
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto  p-3 space-y-3 bg-gray-50">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start space-x-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "bot" && <span className="text-xl bg-[#413C4D]">🤖</span>}

            {/* Text Messages */}
            {msg.type === "text" && (
              <div
                className={`px-3 py-2 rounded-xl max-w-[75%] ${
                  msg.role === "user"
                    ? "bg-[#413C4D] text-white"
                    : "bg-[#8C869E] text-gray-800"
                }`}
              >
                
                {msg.text}
              </div>
            )}

            {/* PG List Cards */}
            {msg.type === "pg-list" && (
              <div className="space-y-2 ">
                <p className="text-gray-700 font-medium">{msg.text}</p>
                {msg.data.map((post) => (
                  <div
                    key={post._id}
                    onClick={() => navigate(`/product/${post.slug || post._id}`)}
                    className="border rounded-lg p-2 bg-white shadow-sm text-sm cursor-pointer hover:bg-gray-100 transition"
                  >
                    <h3 className="font-semibold">{post.title}</h3>
                    <p className="text-gray-600">
                      ₹{post.price} • {post.city}, {post.state}
                    </p>
                    {post.nearArea && post.nearArea.length > 0 && (
                      <p className="text-gray-500 text-xs">
                        Near {post.nearArea.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {msg.role === "user" && <span className="text-xl">👤</span>}
          </div>
        ))}

        {/* Typing Indicator */}
        {loading && (
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <span>🤖</span>
            <span className="animate-pulse">● ● ●</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 🔹 Categorized Quick Suggestions (Enhanced UI) */}
      <div className="px-3 py-2 border-t  space-y-3 max-h-44 overflow-y-auto">
        
        {Object.entries(suggestionGroups).map(([category, options], idx) => (
          <div key={idx} className="space-y-1">
            {/* Category Header */}
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
              {category === "Budget" && <span>💰</span>}
              {category === "Location" && <span>📍</span>}
              {category === "Facility" && <span>🛠</span>}
              {category === "Gender" && <span>👥</span>}
              <span>{category}</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Options as scrollable chips */}
            <div className="flex gap-2  overflow-x-auto scrollbar-hide">
              {options.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="whitespace-nowrap bg-white border px-4 py-1.5 rounded-full text-sm shadow-sm hover:bg-blue-100 hover:border-blue-400 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center border-t p-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Type your message..."
          rows={1}
          className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="ml-2  bg-[#8C869E] hover:bg-[#413C4D]   disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full"
        >
          <FaPaperPlane size={16} />
        </button>
      </div>
    </div>
  );
}
