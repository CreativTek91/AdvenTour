import { Schema,model } from "mongoose";

const buchungSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tripId:{
        type:Schema.Types.ObjectId,
        ref:"Trip",
        required:true
    },
    bookingDate:{
        type:Date,
        default:Date.now
    },
    status:{
        type:String,
        enum:["pending","confirmed","cancelled"],
        default:"pending"
    }
});
const Buchung=model("Buchung",buchungSchema);
export default Buchung;