const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const recipeSchema = new Schema ({
    name : {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
        required: true,
        default: []
    },
    instructions: {
        type: String,
        required: true,

    },
    date: {
        type: Number,
        required: true,
    },
    author: {
        type:String,
        required: true,
    },
    comments: {
        type: [{
            comment: {
                type: String,
                required: true,
            },
            timestamp: {
                type:Number,
                required:true,
            },
            sender: {
                type: String,
                required: true,
            },
        }],
        required: true
    },
    ratings: {
        type: Array,
        required: true,
        default: []
    },
    images: {
        type: Array,
        required: true,
        default: []
    },

});



const recipe = mongoose.model("recipes", recipeSchema);

module.exports = recipe;