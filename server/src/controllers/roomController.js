import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from 'cloudinary'
import Room from '../models/room.js'

// api create room for hotel 
export const createRoom = async(req ,res) => {
   try {
    const {roomType, pricePerNight, amenities} = req.body;
      const hotel = await Hotel.findOne({owner: req.auth.userId});

      if(hotel) return res.json({success:false, message: "Hotel Not Found "});

    //   upload images to cloudinary 
    const uploadImages = req.files.map(async(file) => {
      const response = await  cloudinary.uploader.upload(file.path);
        return response.secure_url;
    })
    // wait for all uploads to complete
   const images = await Promise.all(uploadImages);

   await Room.create({
    hotel: hotel._id,
    roomType,
    pricePerNight: +pricePerNight,
    amenities:JSON.parse(amenities),
    images,
   })

   res.json({success:true, message: "Room created successfully"});
   } catch (error) {
    console.log("come err from room controler thne create room");
    res.json({success:false, message:error.message})
   }
}
// api get all room for hotel 
export const getRooms = async(req ,res) => {
    try {
      const rooms = await Room.find({isAvailable :true}).populate({
        path:'hotel',
        populate:{
          path:'owner',
          select: 'image'
        }
      }).sort({createdAt: -1})
      
      res.json({success:true,room});

    //  if(!rooms) return res.json({success:false, message:" Room Not Available "});
    } catch (error) {
      console.log("come err from room controler thne create room");
    res.json({success:false, message:error.message})
    }
}

// apit ot specific hotel
export const getOwnerRomms = async(req ,res) => {
    try {
      const hotelData = await Hotel.findOne({owner : req.auth.userId})
      const rooms = await Room.find({hotel:hotelData._id.toString()}).populate('hotel');
      res.json({success:true , rooms});
     } catch (error) {
       console.log("come err from room controler thne create room");
    res.json({success:false, message:error.message})
    }
}


// apit ot tooogle availabiltiy of a room
export const toggleRomAvailability = async(req ,res) => {
    try {
      const {roomId} = req.body;
      const roomData = await Room.findById(roomId);
      roomData.isAvailable = !roomData.isAvailable;
      await roomData.save();

      res.json({success:true, message: "Room availability Updated "});
    } catch (error) {
       console.log("come err from roomcontroler thne create room");
    res.json({success:false, message:error.message})
    }
}