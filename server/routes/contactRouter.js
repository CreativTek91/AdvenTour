import express from 'express';
import { addContact,getContact,updateContact,updatePartContact,deleteContact} from '../controllers/contactController.js'


const contactRouter=express.Router();
contactRouter.post("/",addContact);
contactRouter.put('/:id',updateContact); // Assuming this is for updating contact
contactRouter.patch('/:id',updatePartContact); // Assuming this is for updating part of contact
contactRouter.get("/",getContact); 
contactRouter.delete('/:id',deleteContact); // Assuming this is for deleting contact

export default contactRouter;