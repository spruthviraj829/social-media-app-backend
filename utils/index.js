
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

export const hashString =async(useValue)=>{
     const hashedPassword = await bcrypt.hash(useValue , 10);
     return hashedPassword;
}

// comparing the passeords
export const compareString = async (userPassword, password) => {
    const isMatch = await bcrypt.compare(userPassword, password);
    return isMatch;
  };
  
  //JSON WEBTOKEN
export function createJWT(id) {
  console.log("inside the create Jwt")

    return JWT.sign({ userId: id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  }