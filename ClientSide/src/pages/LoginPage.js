import React, {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import mainStore from "../store/mainStore";
import http from "../plugins/http";


const LoginPage = () => {
    const nameRef = useRef();
    const passRef = useRef();
    const nav = useNavigate();
    const {error, setError, setLoggedIn,setToken,setUser} = mainStore();

    async function login() {
        setError("");
        const user = {
            name: nameRef.current.value,
            password: passRef.current.value
        };

        const res = await http.post("http://localhost:2000/login", user);
        console.log(res)

        if (res.success) {
            setLoggedIn(res.data.username);
            setToken(res.token)
            setUser(res.data)
            nav('/recipes');
            setError("")
        } else {

            setError(res.message);
        }
    }

    return (
        <div className="d-flex flex-column align-items-center mt-5 gap-2 w-100">
            <div className={"d-flex flex-column p-2 gap-2 border w-25"}>
                <input ref={nameRef} type="text" placeholder="username"/>
                <input ref={passRef} type="password" placeholder="password"/>
                <p className="error">{error}</p>
                <button className="btn btn-primary" onClick={login}>Login</button>
            </div>
            <div className="d-flex flex-column w-100 justify-content-center mt-2 align-items-center">
                <h5>PLEASE LOGIN TO ADD AND RATE RECIPES </h5>
                <div>(if you dont have account <a href="/register">register here</a>)</div>
            </div>
        </div>

    );
};

export default LoginPage;