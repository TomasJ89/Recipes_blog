const express = require("express")
const Router = express.Router()


const {
    register,
    login,
    addRecipe,
    singleRecipe,
    recipes,
    addRating,
    addComment,

} = require("../controllers/mainContoller")

const {
    registerValidate,
    loginValidate,
    addRecipeValidate,
    ratingValidate,
    commentValidate

} = require("../midleware/validators")

const authMiddle = require("../midleware/auth")

Router.post("/register", registerValidate, register)
Router.post("/login", loginValidate, login)
Router.post("/addRecipe", authMiddle, addRecipeValidate, addRecipe)
Router.get("/recipes", recipes)
Router.get("/recipe/:id", singleRecipe)
Router.post("/addRating", authMiddle, ratingValidate, addRating)
Router.post("/comments", authMiddle, commentValidate, addComment)


module.exports = Router