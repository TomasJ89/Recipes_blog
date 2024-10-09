
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import http from "../plugins/http";
import ImgCarousel from "../components/ImgCarousel";
import StarRatings from 'react-star-ratings';
import mainStore from "../store/mainStore";
import convert_date from "../plugins/timestamp";

const SingleRecipePage = () => {
    const { token, loggedIn } = mainStore();
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [images, setImages] = useState([]);
    const [rating, setRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);
    const textRef = useRef();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const res = await http.get(`http://localhost:2000/recipe/${id}`);
                if (res.success) {
                    setRecipe(res.data);
                    setImages(res.data.images);
                    const averageRating = getAverageRating(res.data.ratings);
                    setRating(averageRating);
                    setHasRated(res.data.ratings.some(r => r.ratedFrom === loggedIn));
                }
            } catch (error) {
                console.error("Error fetching recipe:", error);
            }
        };

        fetchRecipe();
    }, [id, loggedIn]);

    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const totalRating = ratings.map(r => r.rating).reduce((acc, curr) => acc + curr, 0);
        return totalRating / ratings.length;
    };

    const changeRating = async (newRating) => {
        if (hasRated) return;

        try {
            const data = { rating: newRating, id: recipe._id };
            const res = await http.postAuth("http://localhost:2000/addRating", data, token);
            if (res.success) {
                setRecipe(res.data);
                const averageRating = getAverageRating(res.data.ratings);
                setRating(averageRating);
                setHasRated(true); // Mark as rated
            }
        } catch (error) {
            console.error("Error adding rating:", error);
        }
    };

    const comment = async () => {
        if (textRef.current.value) {
            try {
                const data = { comment: textRef.current.value, recipeId: recipe._id };
                const res = await http.postAuth("http://localhost:2000/comments", data, token);
                if (res.success) {
                    setRecipe(res.data);
                    textRef.current.value = "";
                }
            } catch (error) {
                console.error("Error adding comment:", error);
            }
        }
    };

    return (
        <div className="p-2 border w-50 bgColor">
            {recipe && (
                <>
                    <ImgCarousel images={images} />
                    <h3>{recipe.name}</h3>
                    <StarRatings
                        rating={rating}
                        starRatedColor="rgb(109, 122, 130)"
                        starEmptyColor="rgb(203, 211, 227)"
                        starHoverColor="yellow"
                        starDimension="15px"
                        starSpacing="5px"
                        changeRating={!hasRated && loggedIn ? changeRating : undefined}
                        numberOfStars={5}
                    />
                    <div className="ms-1 fw-light counterText">Recipe rating: ({rating === 0 ? "0" : rating.toFixed(2)})</div>
                    <div className="my-2">
                        <h5>Ingredients:</h5>
                        <ol>
                            {recipe.ingredients.map((x, i) => <li key={i}>{x}</li>)}
                        </ol>
                    </div>
                    <div className="my-2">
                        <h5>Instructions:</h5>
                        <p>{recipe.instructions}</p>
                    </div>
                    <span className="d-flex justify-content-end counterText">Created: {convert_date(recipe.date)}</span>
                    <span className="d-flex justify-content-end counterText">Author: {recipe.author}</span>
                </>
            )}
            <div className="p-2 border mt-2 bgColor">
                <h4>Comments:</h4>
                {recipe?.comments?.length > 0 ? (
                    recipe.comments.map((x, index) => (
                        <div className="border p-2 mb-2" key={index}>
                            {x.sender}: <b>{x.comment}</b>
                            <p className="counterText">{convert_date(x.timestamp)}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet</p>
                )}
                {loggedIn && (
                    <div className="d-flex flex-column gap-2">
                        <textarea ref={textRef} placeholder="Write a comment" />
                        <button className="btn btn-primary ms-1" onClick={comment}>Comment</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleRecipePage;