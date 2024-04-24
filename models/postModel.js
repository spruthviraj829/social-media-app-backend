import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId : {type : Schema.Types.ObjectId , ref:"Users"},
        description : {type: String , required: true},
        image : {type :String},
        comments : [{type : Schema.Types.ObjectId , ref:"Comments"}],
        likes : [{type :String}],
    },
    {timestamps  :true}
);

const Posts = mongoose.model("Posts", postSchema);

export default Posts;