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
    res
      .status(201)
      .json({ message: "New contact created successfully1 ", newContact });
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
  const contactId  = req.params?.id;
  if (!contactId)
    return res.status(400).json({ message: "Contact ID is missing." });
  console.log(contactId);
  const { email, phone, country, city, street, number, zip, officeHours } =
    req.body;
  console.dir(req.body, { depth: null });
  const opt = { runValidators: true, new: true };
  const updateFields = {};
  if (email) updateFields.email = email;
  if (phone) updateFields.phone = phone;
  if (country) updateFields.address = { ...updateFields.address, country };
  if (city) updateFields.address = { ...updateFields.address, city };
  if (street) updateFields.address = { ...updateFields.address, street };
  if (number) updateFields.address = { ...updateFields.address, number: Number(number) };
  if (zip) updateFields.address = { ...updateFields.address, zip: Number(zip) };
  if (officeHours) updateFields.officeHours = officeHours;
  if (Object.keys(updateFields).length === 0) {
    return res.status(400).json({ message: "No fields to update" });
  }
  console.log(updateFields);
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId ,
      {
       $set: updateFields,
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
