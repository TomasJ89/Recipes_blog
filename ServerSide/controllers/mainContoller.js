const userDb = require("../schemas/userSchema")
const recipesDb = require("../schemas/recipeSchema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {generate_id} = require("../plugins/helpers");



module.exports = {
    register: async (req, res) => {
        const {passwordOne, name} = req.body;

        const userExist = await userDb.findOne({username: name})

        if (userExist) {
            return res.send({message: "username already taken", success: false, data: null});
        }

        const salt = await bcrypt.genSalt(10)

        const passHash = await bcrypt.hash(passwordOne, salt)


        const user = new userDb({
            username: name,
            password: passHash,
            image: "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?fm=jpg&w=3000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
        });
        await user.save();
        return res.send({message: "Register successfully", success: true, data: null});
    },
    login: async (req, res) => {
        const {password, name} = req.body;

        const user = await userDb.findOne({username: name})
        if (!user) {
            return res.send({message: "user not found", success: false, data: null});
        }

        const passValid = await bcrypt.compare(password, user.password)
        if (passValid) {

            const newUser = {
                id: user._id,
                username: user.username,
            }

            const token = jwt.sign(newUser, process.env.JWT_SECRET)


            newUser.image = user.image
            newUser.recipes = user.recipes

            return res.send({message: "Login success", success: true, token, data: newUser});
        } else {

            return res.send({message: "Passwords do not match", success: false, data: null});
        }

    },
    addRecipe: async (req, res) => {
        const {name, images: recImages, ingredients, instructions, user} = req.body;
        const userInDB = await userDb.findOne({_id: user.id});

        if (!userInDB) {
            return res.send({message: "user not found", success: false, data: null});
        }

        const ingredientsArray = ingredients.split(',')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0);

        const newRecipe = new recipesDb({
            name,
            images: recImages,
            ingredients: ingredientsArray,
            instructions,
            date: Date.now(),
            author: userInDB.username
        });

        await newRecipe.save();

        let newUser = await userDb.findOneAndUpdate(
            {_id: userInDB._id},
            {$push: {recipes: newRecipe._id}},
            {new: true, projection: {password: 0}}
        );

        return res.send({message: "recipe added", success: true, data: newUser});
    },
    recipes: async (req, res) => {
        const recipes = await recipesDb.find()
        return res.send({message: "recipes fetched", success: true, data: recipes});
    },
    singleRecipe: async (req, res) => {
        const {id} = req.params
        console.log(id)
        const recipe = await recipesDb.findOne({_id: id})
        if (!recipe) {
            res.send({message: "recipe not found", success: false, data: null});
        } else {
            res.send({message: "recipe found", success: true, data: recipe});
        }

    },

    addRating: async (req, res) => {
        const {id, rating, user} = req.body
        console.log(req.body)
        const recipe = await recipesDb.findOneAndUpdate(
            {_id: id},
            {
                $push: {
                    ratings: {
                        rating,
                        ratedFrom: user.username
                    }
                }
            },
            {new: true}
        )
        res.send({message: "recipe rated", success: true, data: recipe});
    },

    addComment: async (req, res) => {
        const {recipeId, comment, user} = req.body
        console.log(req.body)
        const userInDB = await userDb.findOne({_id: user.id})

        if (!userInDB) {
            return res.send({message: "user not found", success: false, data: null});
        }

        const recipe = await recipesDb.findOneAndUpdate(
            {_id: recipeId},
            {
                $push: {
                    comments: {
                        comment,
                        sender: userInDB.username,
                        timestamp:Date.now()
                    }
                }
            },
            {new: true}
        )
        res.send({message: "recipe rated", success: true, data: recipe});
    },

}