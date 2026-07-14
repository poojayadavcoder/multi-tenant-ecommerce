import User from "../models/User.js";

const vendor_applications=async(req,res)=>{
  try{
    const applications = await User.find({ vendorStatus: "pending" }).select("-password");
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const approve_vendor= async(req,res)=>{
    try{
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.vendorStatus = "approved";
        user.role = "vendor";
        await user.save();
        res.status(200).json({ message: "Vendor application approved" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export { vendor_applications, approve_vendor };