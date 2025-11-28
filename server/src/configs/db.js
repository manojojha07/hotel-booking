import mongoose from "mongoose";



 const dbConnect = async() => {
   try {
     if(!process.env.MONGO_URI){
        console.log("Enviroment verible Can't Come ! ");
    }
    mongoose.connection.on("connected", () => {
    console.log("🔥 MongoDB Connected Successfully!");
});

    await mongoose.connect(process.env.MONGO_URI);

   } catch (error) {
    console.log(" ❌ Error to Connnecting ! ");
    console.log("Error : ",error.message);
    
   }
 }

 export default dbConnect;