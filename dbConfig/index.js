import mongoose from "mongoose";

const dbConnection = async() =>{
    try {
           const connection = await mongoose.connect(process.env.MONGODB_URL , {
            useNewUrlParser : true ,
            useUnifiedTopology : true,
           }).then(console.log("databse connected sucessfully"))
    }catch(error){
           console.log("DB connect error: " , error ); 
    }
}
export default dbConnection;