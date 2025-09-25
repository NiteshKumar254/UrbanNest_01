


import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectToDb } from './src/config/db.js';

import fileUpload from "express-fileupload";
import bodyParser from "body-parser";

// routes import
import authRoutes from './src/routes/User.js';
import postRoutes from './src/routes/Post.js';
import categoryRoutes from "./src/routes/Category.js";
import paymentRoutes from './src/routes/payment.js'; 

import chatbotRoutes from "./src/routes/chatbot.js";

dotenv.config();

connectToDb();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(fileUpload({ useTempFiles: true }));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  console.log('Welcome to the API');
  res.send('Welcome to the API');
});

// Routes
app.use('/api/auth', authRoutes);
app.use("/api/post", postRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/payment', paymentRoutes); 





app.use("/api/chatbot", chatbotRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



