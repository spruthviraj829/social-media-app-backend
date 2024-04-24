import Users from "../models/userModel.js"
import { compareString, createJWT, hashString } from "../utils/index.js";
import { sendVerificationEmail } from "../utils/sendEmail.js";

export const register = async (req, res, next)=>{

    const {firstName , lastName , email , password} = req.body;

    //validate fields 
    if(!(firstName || lastName || email || password)){
        next("Provide Required fields");
        return ;
    }

    try{
         const userExist =await Users.findOne({email});
         if(userExist){
            next("email adress already exist");
            return;
         }

         const hashedPassword = await hashString(password);

         const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
         })

         sendVerificationEmail(user , res);

    }
    catch(err){
        console.log(err);
        res.status(404).json({
            message : err.message
        })
    }
}


//login controller 
export const login = async(req ,res ,next)=>{
     const { email ,password} =req.body;

    try{
        if(!email || !password){
            next("please provide user credentials")
            return;
         }


          // find user by email
    const user = await Users.findOne({ email }).select("+password").populate({
      path: "friends",
      select: "firstName lastName location profileUrl -password",
    });


    if (!user) {
      next("Invalid email or password");
      return;
    }

    if (!user?.verified) {
      next(
        "User email is not verified. Check your email account and verify your email"
      );
      return;
    }

    // compare password
    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    user.password = undefined;



    const token = createJWT(user?._id);


 
    
    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
     }
     catch(error){
        console.log(error)
        res.status(404).json({
            message : error.message,
        })
     }
}