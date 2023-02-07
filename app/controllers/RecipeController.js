import { v4 as uuidv4 } from 'uuid';
import User from "../models/User.js";
import moment from "moment";


const addRecipe = (req,res)=>{

    return res.status(200).render('UI/addRecipe')
}



export default {
    addRecipe
}