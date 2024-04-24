// 
import express from "express";
// require("dotenv").config();
import dotenv from  "dotenv"
import path from "path";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

//security package
import helmet from "helmet";

// creating instance of express 
const app = express();


const __dirname = path.resolve(path.dirname(""));
app.use(express.static(path.join(__dirname, "views/build")));
//databse  connection
import dbConnection from "./dbConfig/index.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import router from "./routes/index.js";


//for .enf file
dotenv.config();
const PORT = process.env.PORT || 4000 ;

dbConnection();

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(helmet()); 
app.use(errorMiddleware)

app.use(router);

app.listen(PORT , ()=>{
    console.log(`app is running on port: ${PORT}`);
});