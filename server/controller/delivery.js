import User from "../models/User";

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
    res.status(500).json({ success: false, message: "Could not fetch delivery partners" });
  }
};

export const assignDeliveryPartner = async(req,res)=>{
    try {
       const {orderId , }
    }
    catch(error){
     console.error("Error asigning delivery partners:", error);
     res.status(500).json({ success: false, message: "Could not asign delivery partners" });
    }
}
