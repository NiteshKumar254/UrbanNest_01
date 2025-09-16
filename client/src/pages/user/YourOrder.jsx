
import React, { useState, useEffect } from 'react';
import { useAuth } from "../../context/UserContext";
import axios from 'axios';
import { motion } from 'framer-motion';

const YourOrder = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [auth] = useAuth();

  const getBookings = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/payment/my-bookings`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError("failed to fetch bookings");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getBookings();
    }
  }, [auth?.token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl font-semibold text-white">Loading.. Please Wait!</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl text-red-500 font-semibold">{error}</h2>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-3xl font-semibold text-white">No Bookings Found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#5D576F] min-h-screen">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-extrabold mb-8 text-white text-center"
      >
      My Bookings
      </motion.h2>

      <div className="space-y-6">
        {bookings.map((booking) => (
          <motion.div
            key={booking._id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white bg-[#9C98A6] shadow-lg rounded-2xl p-6"
          >
            <div className="border-b-2 border-gray-300 pb-4 mb-4">
              <h3 className="text-xl font-bold text-gray-800">Booking Id:  {booking._id}</h3>
              <p className="text-sm text-gray-600">Date of Booking: {new Date(booking.bookedAt).toLocaleDateString()}</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold text-gray-700">Pg/Hostel Name:</h4>
              <ul className="list-disc list-inside space-y-2">
                {booking.items.map((item, index) => (
                  <li key={index} className="text-gray-600">
                    {item.title} - ₹{item.price}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t-2 border-gray-300 pt-4 mt-4 text-right">
              <p className="text-2xl font-bold text-black">Total Amount: ₹{booking.totalAmount}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default YourOrder;