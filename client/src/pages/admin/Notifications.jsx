import React from "react";
import Navbar from "./Navbar";

const Notifications = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
         <div className="ml-[4rem]">
        <Navbar />
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🔔 Admin Notifications (In Development)
        </h2>
        <p className="text-gray-600 mb-6">
          This section will keep you, as an admin, updated with all important 
          activities happening on the platform.  
          Stay tuned, we’re working to bring this live soon!
        </p>

        <div className="bg-gray-50 border rounded-lg p-5 text-left">
          <h3 className="text-lg font-medium text-gray-700 mb-3">
            🔹 What this page will show:
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>📌 New bookings made by users</li>
            <li>📅 Scheduled visit requests & confirmations</li>
            <li>💳 Payment updates & pending dues</li>
            <li>👤 New user signups & account activity</li>
            <li>⚠️ System alerts / important announcements</li>
            <li>📢 Other critical updates for admin panel</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
