import mongoose from "mongoose";

console.log(process.env.MONGO_URI);

const DbConnected = async() => {
try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log(" 🔥 Connected SuccessFully ! ");
} catch (error) {
    console.log(" ❌ Can't connected to mongoDB ! ");   
}
}

export default DbConnected;