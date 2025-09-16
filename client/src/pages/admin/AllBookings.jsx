import React from "react";
import Navbar from "./Navbar";

const AllBookings = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
         <div className="ml-[4rem]">
        <Navbar />
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          🚧 Feature Under Development
        </h2>
        <p className="text-gray-600 mb-6">
          We're working hard to bring this feature to you soon.  
          Stay tuned for updates!
        </p>

        <div className="bg-gray-50 border rounded-lg p-4 text-left">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            🔹 What this page will contain:
          </h3>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>View all your past and upcoming bookings</li>
            <li>Track payment status and invoices</li>
            <li>Modify or cancel reservations</li>
            <li>Download booking receipts</li>
            <li>Support & help related to your bookings</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
