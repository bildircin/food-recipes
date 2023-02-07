import express from 'express'
const router = express.Router()
import authJwt from '../middleware/AuthJwt.js'
import recipeController from '../controllers/RecipeController.js'

router.get("/tarif-ekle", recipeController.addRecipe)




export default router;