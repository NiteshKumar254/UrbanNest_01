
import express from 'express';
import { registerController, loginController } from '../controller/User.js';
import { updateProfileController } from '../controller/updateProfileController.js';
import { requireSignIn, isAdmin } from '../middlewares/Auth.js';

const app = express.Router();

// Public routes
app.post('/register', registerController);
app.post('/login', loginController);

// Protected User routes
app.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected Admin routes
app.get('/is-admin', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// New protected route for profile updates
app.put('/profile', requireSignIn, updateProfileController);

export default app;