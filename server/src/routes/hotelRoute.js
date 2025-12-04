import express from 'express'
import { protect } from '../middlweres/authMiddlewere.js';
import { registerHotel } from '../controllers/hotelController.js';

const hotelRouter = express.Router();

hotelRouter.post("/api/register" ,protect , registerHotel);
// hotelRouter.post("/register"  , registerHotel);



export default hotelRouter