import React from 'react';
import {useNavigate} from "react-router-dom";
import mainStore from "../store/mainStore";

const Toolbar = () => {
    const nav = useNavigate();
    const {loggedIn, setLoggedIn, user, setFilter} = mainStore();

    // console.log(user.favorites.length)

    function logout() {
        setLoggedIn(null);
        nav('/');
    }

    return (
        <div className={"d-flex justify-content-between p-2 text-center border bgColor"}>
            <div className={"d-flex gap-2"}>
                <button className={"btn btn-outline-dark"} onClick={() => {
                    nav("/recipes");
                    setFilter(false);
                }}>All recipes
                </button>
                {loggedIn &&
                    <>
                        <button className={"btn btn-outline-dark"} onClick={() => {
                            nav("/createRecipe");
                        }}>Add recipe
                        </button>
                    </>
                }
            </div>

            <div className={"d-flex gap-2"}>
                {!loggedIn && <button className={"btn btn-outline-dark"} onClick={() => {
                    nav("/register");
                }}>Register</button>}
                {!loggedIn && <button className={"btn btn-outline-dark"} onClick={() => {
                    nav("/");
                }}>Login</button>}
                {loggedIn && <div className="d-flex align-items-center">logged in as:
                    <b className="px-2 pointer"
                       onClick={() => nav("/userProfile")}
                    >{loggedIn}</b></div>}
                {loggedIn && <button className={"btn btn-outline-dark"} onClick={logout}>Logout</button>}
            </div>
        </div>
    );
};

export default Toolbar;