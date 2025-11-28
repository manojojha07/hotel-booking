import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
  try {
    // Create a svix instance with clerk webhook secret.
    const whook = new Webhook(process.env.CLERK_SECRATE_KEY);

    // Getting headers
   const headers = {
  "svix-id": req.headers["svix-id"],
  "svix-timestamp": req.headers["svix-timestamp"],
  "svix-signature": req.headers["svix-signature"]
};


    // Verifying Headers
    await whook.verify(JSON.stringify(req.body), headers);

    // Getting data from request body
    const { data, type } = req.body;
    
    const userData = {
      _id: data.id,
      email: data.email_addresses[0].email_address,
      username: data.first_name + " " + data.last_name,
      image: data.image_url
    };

    // Switch for different events
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;
    }

    return res.json({ success: true, message: "Webhook Received : " });

  } catch (error) {
    console.log("Error in Clerk webhook:", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export default clerkWebhooks;
