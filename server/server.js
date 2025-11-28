import express from 'express'
import "dotenv/config"
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './src/controllers/clearkWebhooks.js';
import DbConnected from './src/config/db.config.js';

DbConnected();


const app = express();
app.use(cors());

// ❗ Clerk webhook route MUST come before express.json()
// ❗ And MUST use express.raw()
app.post(
  "/api/clerk",
  express.raw({ type: "application/json" }),   // <-- REQUIRED
  clerkWebhooks
);

// Now it's safe to parse JSON for normal routes
app.use(express.json());

// Clerk auth middleware for protected routes
app.use(clerkMiddleware());

// Test route
app.get('/', (req, res) => res.send("Api Is Working Finally!"));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running at http://localhost:${PORT}`);
});
