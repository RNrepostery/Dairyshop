 const UserModel = require('../Model/user.js')
 const Order = require("../Model/orderModel"); 

 const bcrypt = require('bcryptjs');
 const JWT = require('jsonwebtoken');
 const dotenv = require('dotenv')

 dotenv.config();


   const userRegister = async (req, res) => {
    try {
        const { name, email, password, phone, address, } = req.body;

        if(!name){
            return res.send({message:"name is required"})
        }

        if(!email){
            return res.send({message:"email is required"})
        }

        if(!password){
            return res.send({message:"password is required"})
        }


        if(!phone){
            return res.send({message:"phone is required"})
        }
       
        if(!address){
            return res.send({message:"address is required"})
        }
      
        const exisitinUser = await userModel.findOne({email})

        if(exisitinUser){
            return res.status(200).send({
                success:"false",
                message:"user allready exist"})
        }

         // Hash the password before saving
         const salt = await bcrypt.genSalt(10); // Generate salt
         const hashedPassword = await bcrypt.hash(password, salt); // Hash password


        const user = new UserModel({name, email, phone, address, password: hashedPassword });
        await user.save();
        res.status(201).send({
            success:"true",
            message:"User Registeration Successfully"
        })      
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send({
            success:"true",
            message:"Error in registeration "

        })

        
    }
};

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate inputs
        if (!email || !password) {
            return res.status(400).send({ 
                success: false, 
                message: "Email and password are required" 
            });
        }

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ 
                success: false, 
                message: "Invalid credentials" 
            });
        }

        // Generate JWT Token
        const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // Send success response
        res.status(200).send({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role:user.role,
                


                  // Corrected from "phone"
            },
            token
        });

    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(500).send({
            success: false,
            message: "Error in login"
        });
    }
};

 const forgotPasswordController = async (req, res) => {
    try {
      const { email,  newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
    
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await UserModel.findOne({ email });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Emailr",
        });
      }
      const salt = await bcrypt.genSalt(10); // Generate salt
         const hashedPassword = await bcrypt.hash(newPassword, salt); // Hash password

    
      await UserModel.findByIdAndUpdate(user._id, { password:hashedPassword });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };


const  testController =    async(req, res) => {
    console.log("protected router ");

}


const updateProfileController = async (req, res) => {
    try {
      // Ensure req.body is not null or undefined before destructuring
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "Request body cannot be empty" });
      }
  
      const { name, email, password, address, phone } = req.body;
      const user = await UserModel.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Hash password only if a new one is provided
      let hashedPassword = user.password;
      if (password) {
        if (password.length < 6) {
          return res.status(400).json({ error: "Password must be at least 6 characters long" });
        }
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }
  
      // Update user profile
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          email: email || user.email, // Include email update if needed
          password: hashedPassword,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
  
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        updatedUser,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({
        success: false,
        message: "Error while updating profile",
        error: error.message,
      });
    }
  };


//orders




 const getOrdersController = async (req, res) => {
  try {
    const orders = await Order
      .find({ user: req.user._id })
      .populate("products", "-photo")
      .populate("user", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//orders
 const getAllOrdersController = async (req, res) => {
  try {
    const orders = await Order
      .find({})
      .populate("products", "-photo")
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
 const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).send({
      success: true,
      message: "All Categories List",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};
  

module.exports = { userRegister, userLogin, testController, forgotPasswordController, updateProfileController,getAllOrdersController, orderStatusController, getOrdersController,getAllUsers};


