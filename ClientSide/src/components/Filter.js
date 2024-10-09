import React, { useRef } from 'react';
import mainStore from "../store/mainStore";

const Filter = () => {
    const { allRecipes, setFilteredRecipes, setFilter } = mainStore();

    const refs = {
        ratingFrom: useRef(),
        ratingTo: useRef(),
        ingredient: useRef(),
    };

    const getAverageRating = (ratings) => {
        if (!ratings || ratings.length === 0) return 0;
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
        return totalRating / ratings.length;
    };

    function filterItems() {
        let recipes = [...allRecipes];
        console.log(recipes);

        const params = {
            ratingFrom: parseFloat(refs.ratingFrom.current.value) || 0,
            ratingTo: parseFloat(refs.ratingTo.current.value) || 5,
            ingredient: refs.ingredient.current.value.trim().toLowerCase(),
        };

        if (params.ratingFrom > 0 || params.ratingTo < 5) {
            recipes = recipes.filter(recipe => {
                const averageRating = getAverageRating(recipe.ratings);
                return averageRating >= params.ratingFrom && averageRating <= params.ratingTo;
            });
        }

        if (params.ingredient) {
            recipes = recipes.filter(recipe =>
                recipe.ingredients.some(ingredient =>
                    ingredient.toLowerCase().includes(params.ingredient)
                )
            );
        }

        setFilter(true);
        setFilteredRecipes(recipes);
        console.log(recipes)
    }

    function resetFilter() {
        setFilter(false);
        setFilteredRecipes(allRecipes);
        refs.ratingFrom.current.value = "";
        refs.ratingTo.current.value = "";
        refs.ingredient.current.value = "";
    }

    return (
        <div className="border p-2 w-100 bgColor">
            <h5>Filter</h5>
            <div className="d-flex mb-3 gap-2">
                <div className="w-25">
                    <div>
                        Rating from: <input className="w-50 mb-2" ref={refs.ratingFrom} type="number" min="0" max="5"
                                            placeholder="rating from 0" />
                    </div>
                    <div>
                        Rating to: <input className="w-50" ref={refs.ratingTo} type="number" min="0" max="5"
                                          placeholder="rating to 5" />
                    </div>
                </div>
                <div>
                    <div>
                        Filter by ingredient
                    </div>
                    <input ref={refs.ingredient} type="text" placeholder="ingredient" />
                </div>
            </div>
            <button className="btn btn-dark mx-1" onClick={filterItems}>Filter</button>
            <button className="btn btn-dark" onClick={resetFilter}>Reset Filter</button>
        </div>
    );
};

export default Filter;