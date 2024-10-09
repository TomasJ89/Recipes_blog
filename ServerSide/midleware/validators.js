module.exports = {

    registerValidate: (req, res, next) => {
        const user = req.body;
        console.log(req.body)
        if (!user.name) {
            return res.send({message: "No username key", success: false, data: null});
        }
        if (!user.passwordOne) {
            return res.send({message: "No passwordOne key", success: false, data: null});
        }
        if (!user.passwordTwo) {
            return res.send({message: "No passwordTwo key", success: false, data: null});
        }

        if (user.name.length < 3 || user.name.length > 20)
            return res.send({message: "Username must be between 3 and 20 characters long", success: false, data: null});

        if (user.passwordOne !== user.passwordTwo || user.passwordOne.length < 3 || user.passwordOne.length > 20)
            return res.send({
                message: "Passwords do not match or password must be between 3 and 20 characters long",
                success: false,
                data: null
            });



        next()
    },
    loginValidate: (req, res, next) => {
        const {name, password} = req.body;

        if (!name) {
            return res.send({message: "No username key", success: false, data: null});
        }
        if (!password) {
            return res.send({message: "No password key", success: false, data: null});
        }

        if (name.length < 3 || name.length > 20)
            return res.send({message: "Username must be between 3 and 20 characters long", success: false, data: null});


        if ( password.length < 3 || password.length > 20)
            return res.send({
                message: "Passwords do not match or password must be between 3 and 20 characters long",
                success: false,
                data: null
            });

        next()

    },
    addRecipeValidate: (req,res,next) => {

        const {name,images,ingredients,instructions} = req.body;
        if (!name) {
            return res.send({message: "No recipe title key", success: false, data: null});
        }
        if (!images) {
            return res.send({message: "No recipe images key", success: false, data: null});
        }
        if (!ingredients) {
            return res.send({message: "No ingredients key", success: false, data: null});
        }
        if (!instructions) {
            return res.send({message: "No instructions key", success: false, data: null});
        }
        if (name.length < 3 || name.length > 200)
            return res.send({message: "Recipe title must between 3 and 200 characters long", success: false, data: null});
        if (images.length  < 3 || images.length > 5) {
            return res.send({message: "Images must between 3 and 5 ", success: false, data: null});
        }

        for (let image of images) {
            if (!image.includes("http")) {
                return res.send({ message: "Image URL must contain http", success: false, data: null });
            }
        }



        next()
    },
    ratingValidate: (req,res,next) => {
        const {rating,id} = req.body;
        if (!rating) {
            return res.send({message: "No rating key", success: false, data: null});
        }
        if (!id) {
            return res.send({message: "No recipe id key", success: false, data: null});
        }
        if ( 0 >= rating || rating > 5) {
            return res.send({message: "Rating must between 0 and 5 ", success: false, data: null});
        }

        next()
    },
    commentValidate :(req,res,next) => {
        const {recipeId,comment} = req.body;
        if (!recipeId || !comment) {
            return res.send({message: "No recipeId or comment key", success: false, data: null});
        }

        if (comment > 150) {
            return res.send({message: "Comment must between 0 and 150 characters ", success: false, data: null});
        }

        next()
    },



}