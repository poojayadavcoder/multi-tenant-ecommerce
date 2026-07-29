import User from "../models/User";
import Order from "../models/Order";

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