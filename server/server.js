import express from 'express'
import "dotenv/config"
import cors from 'cors'
import DbConnected from './src/config/db.config.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './src/controllers/clearkWebhooks.js';


DbConnected();

const app = express();
app.use(cors());

// middlwere
app.use(express.json());
app.use(clerkMiddleware());


// Api to Liestitin to Clerek
app.post("/api/clerk", clerkWebhooks)



app.get('/', (req, res)=> res.send("Api Is Working Finalliy ! "));

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(` 🚀 Server Running in  http://localhost:${PORT}`);
});
