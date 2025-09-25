// server/src/models/Booking.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // यह 'User' मॉडल से लिंक होगा
    required: true
  },
  items: [
    {
      title: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      // आप यहाँ और भी आइटम डिटेल्स जोड़ सकते हैं
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  payment: {
    razorpay_payment_id: {
      type: String,
      required: true
    },
    razorpay_order_id: {
      type: String,
      required: true
    },
    razorpay_signature: {
      type: String,
      required: true
    }
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;