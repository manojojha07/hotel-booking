import express from 'express'
import { protect } from '../middlweres/authMiddlewere.js';
import upload from '../middlweres/uploadMiddlwere.js';
import { createRoom, getOwnerRomms, getRooms, toggleRomAvailability } from '../controllers/roomController.js';

const roomRouter = express.Router();


// roomRouter.post('/', upload.array("images", 4), protect, createRoom);

roomRouter.post('/' , protect, createRoom);
roomRouter.get('/', getRooms);
roomRouter.get('/owner', protect, getOwnerRomms);
roomRouter.post('/toggle-availability',  protect, toggleRomAvailability);

 


export default roomRouter