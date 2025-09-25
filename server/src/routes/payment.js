import express from 'express';
import { createOrder, verifyAndSavePayment, getBookings } from '../controller/payment.js';
import { requireSignIn } from "../middlewares/Auth.js"; // ऑथेंटिकेशन मिडलवेयर इंपोर्ट करें

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyAndSavePayment);
router.get('/my-bookings', requireSignIn, getBookings); // ऑथेंटिकेशन के साथ

export default router;