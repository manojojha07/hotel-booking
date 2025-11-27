
import { Webhook } from "svix";
import User from "../models/User.js";




const clerkWebhooks = async (rea ,res) => {
try {
    // Create a svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting headers
    const headers ={ 
        "svix-id" : requestAnimationFrame.headers["svix-id"],
        "svix-timestamp" : requestAnimationFrame.headers["svix-timestamp"],
        "svix-signature" : requestAnimationFrame.headers["svix-signature"],
     }
        // Veryfing Headers
        await whook.verify(JSON.stringify(req,body), headers)

        // getting data from requested body
        const {data, type} = req.body
        
        const userData= {
            _id : data.id,
            email: data.email_addresses[0].email_address,
            username: data.first_name + " " + data.lst_name,
            image: data.image_url
        };

        // switch cases for deffrent Events
        switch (type) {
            case "user.created": {
                await User.create(userData);
                break;
            }
            case "user.updated": {
                await User.findByIdAndUpdate(data.id,userData);
                break;
            }
            case "user.deleted": {
                await User.findByIdAndDelete(data.id);
                break;
            }
        }

        res.json({success: true, message: "webhook Recieved"});
   
} catch (error) {
    console.log("success: fasle Clerek" , error.message);
    rs.json({ success:false, message: error.message});
    
}
}

export default clerkWebhooks;