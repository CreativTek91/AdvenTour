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
    officeHours:[{
        day:String,
       start:{
        hour:Number,
        min:Number
       },
        end:{
            hour:Number,
            min:Number
       }
       
    }],
})

const Contact=model("Contact",contactSchema);
export default Contact;