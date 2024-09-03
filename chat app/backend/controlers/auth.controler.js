const asyncHandler=require('express-async-handler');
const User=require('../models/user.model');
const {hashpasword,hashcomaprepassword,generatetokenandSetcookie,sanitizeInput,decodeInput}=require("../utility/tools.fun");
const bycrpt= require('bcryptjs');


//@desc signup
//@route
//@access public
const signupController = asyncHandler(async (req, res) => {
    // const { username, password, confirmpassword, email, fullname, gender } = req.body;

 // Sanitize user inputs
 const username = sanitizeInput(req.body.username);
 const password = req.body.password;
 const confirmpassword = req.body.confirmpassword;
//  const email = sanitizeInput(req.body.email)||null;
 const fullname = sanitizeInput(req.body.fullname);
 const gender = req.body.gender;


 // Validate username length (minimum 6 characters)
 if (username.length < 5) {
    res.status(400);
    throw new Error("Username must be at least 6 characters long");
}

// Validate password length (minimum 8 characters)
if (password.length < 4) {
    res.status(400);
    throw new Error("Password must be at least 8 characters long");
}



    if (password !== confirmpassword) {
        res.status(400);
        throw new Error("password and confirm password do not match");
    }
  
    // Check if the user already exists
    // const user = await User.findOne({ $or: [{ username }, { email }] });
    const user = await User.findOne({ username: username });
  
    if (user) {
      return res.status(400).json({ error: "Username or email already exists" });
    }
  
    // Hash password
    const hashedPassword = await hashpasword(password);
  
    // Set profile picture URL based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;
    
    // console.log("hash");
    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      fullname,
      gender,
      profilepic: profilePic
    });
  

    try {
        // Save the user
        await newUser.save();
        
        // Generate JWT token and set cookie
        generatetokenandSetcookie(newUser._id, res);
    
        // Decode the inputs (if necessary)
        const fname = await decodeInput(newUser.fullname);
        const uname = await decodeInput(newUser.username);
    
        // Send the response
        res.status(201).json({
          _id: newUser._id,
          fullname: fname,
          username: uname,
          profilepic: newUser.profilepic,
        });
    
        console.log("New user created");
    
      } catch (error) {
        console.error("Error saving the user:", error);
        res.status(500);
        throw new Error("User not created");
      }



    // console.log(newUser);   
    // // Send response
    // if(newUser){
    //     //jwt token
    //     generatetokenandSetcookie(newUser._id,res);
    //     await newUser.save();
    //     // console.log('1');
    //     const fname=await decodeInput(newUser.fullname);
    //     const uname=await decodeInput(newUser.username);
    //     res.status(201).json({
    //         _id: newUser._id,
    //         fullname:fname,
    //         username:uname,
    //         profilepic: newUser.profilepic,
    //     });
    //     console.log("New user created");
    // }
    //  console.log("some error");
    // res.status(500)
    // throw new Error("user not created");
  });
  
  const loginController = asyncHandler(async (req, res) => {
    // Destructure username and password from the request body
    const { username, password } = req.body;
    console.log(req.body);
    // Find the user by username in the database
    const user = await User.findOne({ username });

    // If the user is not found, return a 404 error
    if (!user) {
        res.status(404);
        throw new Error("Invalid username or password");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await hashcomaprepassword(password, user.password);
    // console.log(isMatch); // Optional: Uncomment for debugging

    // If the passwords don't match, return a 400 error
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid username or password");
    }

    // If the password matches, generate a token and set it as a cookie
    if (isMatch) {
       generatetokenandSetcookie(user._id, res);
    }

    // Return a success response with user details
    return res.status(200).json({
        message: "Logged in successfully",
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        profilepic: user.profilepic,
    });
});

const logoutcontroller=(req,res)=>{
    res.cookie('jwt',"",{
        httpOnly: true,
        expires: new Date(0),
        maxAge:0})
  // Optionally, handle other session cleanup if needed

    // Send a response indicating the user has been logged out
    res.status(200).json({ message: "Logged out successfully" });
    
};



module.exports={loginController,signupController,logoutcontroller}