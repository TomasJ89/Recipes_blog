import React, {useState,useEffect} from 'react';
import mainStore from "../store/mainStore";
import SingleRecipe from "../components/SingleRecipe";


const UserRecipesPage = () => {
    const {allRecipes,user} = mainStore()
    const [userRecipes,setUserRecipes] = useState([])

    console.log(user)
    console.log(userRecipes)

    useEffect(() => {
        const filteredRecipes = allRecipes.filter(recipe => user.recipes.includes(recipe._id));
        console.log(filteredRecipes)
        setUserRecipes(filteredRecipes);
    }, [allRecipes, user.recipes]);


    return (
        <div className= "d-flex p-2 justify-content-center flex-wrap gap-2 w-100">
            {userRecipes?.length > 0 ?
                userRecipes.map((x=> <SingleRecipe recipe={x} key={x._id}/>)
            ) :
                <h4>You dont have recipes yet</h4>
            }
        </div>
    );
};

export default UserRecipesPage;