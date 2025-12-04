import express from 'express'
import { protect } from '../middlweres/authMiddlewere.js';
import { getUserData, storeRecentSearchedCities } from '../controllers/userController.js';

const userRoueter = express.Router();


userRoueter.get('/' ,protect, getUserData);
userRoueter.post('/store-recent-search' ,protect, storeRecentSearchedCities);



export default userRoueter;