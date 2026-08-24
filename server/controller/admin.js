import User from "../models/User.js";

const user_applications=async(req,res)=>{
  try{
    const applications = await User.find({ status: "pending" }).select("-password");
    return res.status(200).json(applications);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const approve_user= async(req,res)=>{
    try{
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.status = "approved";
        if(user.role !== "delivery"){
          user.role = "vendor"
        }
        await user.save();
        res.status(200).json({ message: "user application approved" });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

export { user_applications, approve_user };