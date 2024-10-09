import React, {useEffect} from 'react';
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import SingleRecipe from "../components/SingleRecipe";
import Filter from "../components/Filter";

const RecipesPage = () => {
    const {allRecipes,setAllRecipes,loggedIn,filter,filteredRecipes} = mainStore()


    useEffect(() => {
        http.get("http://localhost:2000/recipes")
            .then(res => {
                if (res.success) {
                    setAllRecipes(res.data);
                }
            })
    }, []);

    return (
        <div className="w-100 ">
            {loggedIn && <Filter />}
            <h3 className="text-center mt-4">{!filter ? "All Recipes" : "Filtered Recipes"}</h3>
            <div className= "d-flex p-2 flex-wrap gap-2">
                {filter ? (
                    filteredRecipes.map((x) => <SingleRecipe recipe={x} key={x._id} />)
                ) : (
                    !allRecipes ? <h1>Loading...</h1> : allRecipes.map(x => <SingleRecipe recipe={x} key={x._id}/>)
                )}

                {filteredRecipes.length === 0 && filter && <h1>Not found anything... try again</h1>}
            </div>

        </div>
    );
};

export default RecipesPage;