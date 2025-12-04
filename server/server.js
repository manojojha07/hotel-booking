import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dbConnect from './src/configs/db.js';
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from './src/controllers/clerkWebhooks.js';
import userRoueter from './src/routes/userRoute.js';
import hotelRouter from './src/routes/hotelRoute.js';
import connectCloudinary from './src/configs/cloudnay.js';
import roomRouter from './src/routes/roomRoute.js';
import bookingRouter from './src/routes/bookinRoute.js'

dbConnect();
connectCloudinary();


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(clerkMiddleware())
app.use(express.json());

app.use('/api/clerk' , clerkWebhooks);


app.get("/" , (req, res) => res.send("Api Working Success Full :) ") );
app.use('/api/user' , userRoueter);
app.use('/api/hotels' , hotelRouter);
app.use('/api/rooms', roomRouter);
app.use('/api/bookings' ,bookingRouter)



const PORT = process.env.PORT || 4000;


app.listen( PORT , () => {
    console.log(`server is runing http://localhost:${PORT}`); 
})