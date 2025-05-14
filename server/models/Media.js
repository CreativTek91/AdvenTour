import { Schema,model} from "mongoose";

const mediaSchema=  new Schema({
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    },
    type:{
        type:String,
        enum:["image","video"],
        required:true,
    }
},{timestamps:true});

 const Media = model("Media",mediaSchema);
export default Media;