import express from 'express'
import {
    checkAvailabilityAPI,
    createBooking,
    gethotelBookigs,
    getUserBookings
} from '../controllers/bookingController.js';
import { protect } from '../middlweres/authMiddlewere.js'


const bookingRouter = express.Router();


bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/hotel', protect, gethotelBookigs);

export default bookingRouter;