import React from 'react';
import mainStore from "../store/mainStore";
import {useNavigate} from "react-router-dom";

const UserProfilePage = () => {
    const {user} = mainStore()
    const nav = useNavigate()

    return (
        <div className="userCard p-2 border">
            <img src={user.image} alt=""/>
            <h5>{user.username}</h5>
            <div className="pointer" onClick={()=> nav("/userRecipes")} >My recipes ({user.recipes.length})</div>
        </div>
    );
};

export default UserProfilePage;