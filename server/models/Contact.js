import { Schema,model } from "mongoose";

const contactSchema = new Schema({
    address:{
        country:String,
        city:String,
        street:String,
        number:Number,
        zip:Number,
    },
    phone:Number,
    email:String,
    oficeHours:[{
        day:String,
        hoursStart:String,
        hoursEnd:String
    }],

})

const Contact=model("Contact",contactSchema);
export default Contact;