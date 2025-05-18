import Contact from '../models/Contact.js';

const addContact=async (req,res)=>{
    // const {address,phone,email,oficeHours}=req.body;
    console.log(req.body);
//     try{
//  const newContact = await Contact.create({
//    address:address,
//    phone,
//    email,
//    oficeHours
//    })
// }catch{

//     }
}

const getContact=async (req,res)=>{
    try{
        const contact = await Contact.find();
        res.status(200).json(contact);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}
export {addContact};