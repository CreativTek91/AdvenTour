import express from 'express';
import { addContact } from '../controllers/contactController.js'


const contactRouter=express.Router();
contactRouter.post("/",addContact);


export default contactRouter;