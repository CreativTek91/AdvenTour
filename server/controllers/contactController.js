// import Contact from '../models/Contact.js';

// const addContact=async (req,res)=>{
//     // const {address,phone,email,oficeHours}=req.body;
//     console.log(req.body);
// //     try{
// //  const newContact = await Contact.create({
// //    address:address,
// //    phone,
// //    email,
// //    oficeHours
// //    })
// // }catch{

// //     }
// }

// const getContact=async (req,res)=>{
//     try{
//         const contact = await Contact.find();
//         res.status(200).json(contact);
//     }catch(err){
//         res.status(500).json({message: err.message});
//     }
// }
// export {addContact};

import Contact from "../models/Contact.js";
import ErrorHandler from "../exceptions/errorHandlung.js";
const addContact = async (req, res) => {
  const { email, phone, country, city, street, number, zip, officeHours } =
    req.body;
  console.dir(req.body, { depth: null });
  try {
    const newContact = await Contact.create({
      address: {
        country,
        city,
        street,
        number: Number(number),
        zip: Number(zip),
      },
      phone,
      email,
      officeHours,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

const getContact = async (req, res) => {
  try {
    const contact = await Contact.find();
    res.status(200).json(contact);
  } catch (err) {
    res.status(404).json(ErrorHandler.NotFoundError());
  }
};
const updateContact = async (req, res) => {
  const { id } = req.params;
  const { email, phone, country, city, street, number, zip, officeHours } =
    req.body;
  console.dir(req.body, { depth: null });
  const opt = { runValidators: true, new: true };
  try {
    const updatedContact = await Contact.replaceOne(
      { _id: id },
      {
        email,
        address: {
          country,
          city,
          street,
          number: Number(number),
          zip: Number(zip),
        },
        phone,
        officeHours,
      },
      opt
    );
    if (updatedContact.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Contact not found or no changes made" });
    }
    res.status(200).json(updatedContact);
  } catch (er) {
    console.error(er);
    res.status(500).json({ message: er.message });
  }
};
const updatePartContact = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { email, phone, country, city, street, number, zip, officeHours } =
    req.body;
  console.dir(req.body, { depth: null });
  const opt = { runValidators: true, new: true };
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      { _id: id },
      {
        email,
        address: {
          country,
          city,
          street,
          number: Number(number),
          zip: Number(zip),
        },
        phone,
        officeHours,
      },
      opt
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (er) {
    console.error(er);
    res.status(500).json({ message: er.message });
  }
};
const deleteContact = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({
      message: "Contact deleted successfully",
      contact: deletedContact,
    });
  } catch (er) {
    console.error(er);
    res.status(500).json({ message: er.message });
  }
};
export {
  addContact,
  getContact,
  updateContact,
  updatePartContact,
  deleteContact,
};
