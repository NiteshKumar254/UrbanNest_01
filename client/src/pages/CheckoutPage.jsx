

import React, { useEffect } from "react";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/UserContext"; 
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CheckoutPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => total + item.price, 0);
  const totalWithGST = (totalAmount * 1.05);

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const handlePayment = async () => {
    if (!totalAmount) {
      alert("Cart is empty!");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:3000/api/payment/create-order", {
        amount: totalWithGST * 100,
      });

      const order = data.order;

      const options = {
        key: "rzp_test_REWAA4VEJmuU60",
        amount: order.amount,
        currency: order.currency,
        name: "PG Finder",
        description: "Your Booking Payment",
        order_id: order.id,
        handler: async function (response) {
          try {
            const { data: verifyData } = await axios.post("http://localhost:3000/api/payment/verify-payment", {
              ...response,
              user: auth.user._id,
              cart: cart,
            }, {
              headers: {
                Authorization: `Bearer ${auth.token}`,
              },
            });
            
            if (verifyData.success) {
              alert("Payment successful! Booking confirmed.");
              setCart([]);
              localStorage.removeItem("cart");
              navigate("/user/your-order"); 
            } else {
              alert("Payment verification failed! Please contact support.");
            }
          } catch (err) {
            console.error("Verification failed:", err);
            alert("Payment verification failed. Please try again or contact support.");
          }
        },
        prefill: {
          name: auth.user.name,
          email: auth.user.email,
        },
        theme: {
          color: "#413C4D",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[#5D576F] min-h-screen">
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl font-extrabold mb-8 text-white text-center"
      >
        Checkout
      </motion.h2>

      <div className="bg-white bg-[#9C98A6] shadow-lg rounded-2xl p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-3">
          Your Booking Details
        </h3>
        <div className="space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between bg-gray-100 rounded-xl p-4 shadow-sm"
            >
              <div>
                <h4 className="text-lg font-semibold text-gray-700">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500">
                  {item.description?.substring(0, 60)}...
                </p>
              </div>
              <span className="text-xl font-bold text-gray-800">
                ₹{item.price}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-2xl bg-[#9C98A6] p-6">
        <h3 className="text-2xl font-semibold mb-4 text-black border-b pb-3">
          Order Summary
        </h3>
        <div className="flex justify-between text-lg text-black mb-2">
          <span>Subtotal</span>
          <span>₹{totalAmount}</span>
        </div>
        <div className="flex justify-between text-lg text-black mb-2">
          <span>GST (5%)</span>
          <span>₹{(totalAmount * 0.05).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-2xl text-black border-t pt-4">
          <span>Total</span>
          <span>₹{(totalAmount * 1.05).toFixed(2)}</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 transition-colors duration-300 text-white py-4 rounded-xl text-lg font-semibold shadow-lg"
        >
          💳 Pay Now
        </motion.button>
      </div>
    </div>
  );
};

export default CheckoutPage;