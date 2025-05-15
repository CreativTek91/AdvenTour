import Contact from '../models/Contact.js';

const addContact=async (req,res)=>{
    const {address,phone,email,oficeHours}=req.body;
    try{
 const newContact = await Contact.create({
   address:address,
   phone,
   email,
   oficeHours
   })
}catch{

    }
}


export {addContact};