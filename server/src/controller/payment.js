
import Razorpay from 'razorpay';
import crypto from 'crypto';
import Booking from '../models/Booking.js';

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// payment order create
const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Amount must be a positive number.",
      });
    }

    const receiptId = crypto.randomBytes(16).toString('hex');

    const options = {
      amount: amount,
      currency: "INR",
      receipt: receiptId,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error("Error creating Razorpay order:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong! " + error.message,
    });
  }
};

//payment verify and save booking
const verifyAndSavePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const { user, cart } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      const booking = new Booking({
        user: user,
        items: cart.map(item => ({
          title: item.title,
          price: item.price,
        })),
        totalAmount: cart.reduce((total, item) => total + item.price, 0),
        payment: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature
        }
      });
      await booking.save();

      res.status(200).json({
        success: true,
        message: "Payment verified and booking saved successfully!",
        bookingId: booking._id
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid signature. Payment verification failed."
      });
    }
  } catch (error) {
    console.error("Error verifying payment and saving booking:", error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong! " + error.message,
    });
  }
};

//utilization of Booking model to fetch user bookings
const getBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await Booking.find({ user: userId }).sort({ bookedAt: -1 });
    res.status(200).json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    res.status(500).json({
      success: false,
      message: "Could not fetch bookings. " + error.message,
    });
  }
};


export {
  createOrder,
  verifyAndSavePayment,
  getBookings
};