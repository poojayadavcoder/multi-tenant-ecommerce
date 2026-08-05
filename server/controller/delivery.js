import User from "../models/User.js";
import Order from "../models/Order.js";

export const applyForDeliveryPartner = async (req, res) => {
 try {
  const userId = req.user.id
  const {vehicle_type, vehicle_number, license_number} = req.body

  const user =await User.findById(userId)

  if(!user){
    return res.status(404).json("User not found")
  }

   if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "delivery") {
      return res.status(400).json({
        success: false,
        message: "User is already registered as a delivery partner",
      });
    }

  user.role = "delivery"
  user.isAvailable = true

  if (vehicle_type) user.vehicleType = vehicle_type;
  if (vehicle_number) user.vehicleNumber = vehicle_number;
  if (license_number) user.licenseNumber = license_number;

  await user.save()

  return res.status(200).json({
    success:true,
    message : "Sucessfully applied for delivery person",
    user :{
      id : user.id,
      name : user.name,
      email :user.email,
      role :user.role ,
      is_available :user.is_available
    }
  })
}
  catch (error) {
    return res.status(500).json({ 
      message: "Server error applying for delivery role", 
      error: error.message 
    });
  }
}

export const getDeliveryPartners = async (req, res) => {
  try {
    const drivers = await User.find({
      role: "delivery",
      isAvailable: true,
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 10000,
        },
      },
    }).select("name email phone location");
    res.status(200).json({ success: true, drivers });
  } catch (error) {
    console.error("Error fetching delivery partners:", error);
    res
      .status(500)
      .json({ success: false, message: "Could not fetch delivery partners" });
  }
};

export const assignDeliveryPartner = async (req, res) => {
  try {
    const { orderId, deliveryPartnerId } = req.body;

    if (!orderId || !deliveryPartnerId) {
      return res.status(400).json({ success: false, message: "Order ID and Delivery Partner ID are required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        deliveryPartnerId,
        status: "Ready_for_Pickup",
      },
      { new: true }
    );

    res.status(200).json({ 
      success: true, 
      message: "Delivery partner assigned successfully!", 
      order: updatedOrder 
    });
  } catch (error) {
    console.error("Error assigning delivery partner:", error);
    res.status(500).json({ success: false, message: "Failed to assign delivery partner" });
  }
};