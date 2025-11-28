import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dbConnect from './src/configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './src/controllers/clerkWebhooks.js';




const app = express();
app.use(cors());


app.get("/" , (req, res) => res.send("Api Working Success Full :) ") );


app.use('/api/clerk' , clerkWebhooks);

app.use(clerkMiddleware())
app.use(express.json());








const PORT = process.env.PORT || 4000;

dbConnect()
app.listen( PORT , () => {
    console.log(`server is runing http://localhost:${PORT}`); 
})