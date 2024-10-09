import React, { useState } from 'react';
import StarRatings from 'react-star-ratings';
import {useNavigate} from "react-router-dom";

const SingleRecipe = ({ recipe }) => {
    console.log(recipe)
    const nav = useNavigate()
    const getAverageRating = (ratings) => {
        if (ratings.length === 0) return 0;
        const totalRating = ratings.map(r => r.rating).reduce((acc, curr) => acc + curr, 0);
        return totalRating / ratings.length;
    };
    const averageRating = getAverageRating(recipe.ratings);
    return (
        <div className="p-2 border d-flex flex-column recipeCard bgColor gap-2"
             onClick={()=>nav(`/recipe/${recipe._id}`)}>
            <img src={recipe.images[0]} alt={recipe.name} />
            <h5>{recipe.name}</h5>
            <div className="d-flex justify-content-center align-items-center ">
                <StarRatings
                    rating={averageRating}
                    starDimension="15px"          // Size of stars
                    starSpacing="5px"             // Spacing between stars
                    numberOfStars={5}
                />
                <div className="ms-1 counterText ">({averageRating === 0? "0": averageRating.toFixed(2)}) </div>

            </div>
            <div>Comments ({recipe.comments.length})</div>

        </div>
    );
};

export default SingleRecipe;