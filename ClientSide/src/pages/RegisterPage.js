import React, {useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import http from "../plugins/http";
import mainStore from "../store/mainStore";


const RegisterPage = () => {
    const {error,setError} = mainStore()
    const nameRef = useRef()
    const passRef = useRef()
    const passTwoRef = useRef()
    const nav = useNavigate()

    async function register() {
        const user = {
            name: nameRef.current.value,
            passwordOne: passRef.current.value,
            passwordTwo: passTwoRef.current.value
        }

        const res = await http.post("http://localhost:2000/register", user)
        console.log(res)
        if (res.success) {
            console.log(res)
            nav('/');
            setError("")
        } else {
            setError(res.message)
            console.log(res.message)

        }

    }

    return (
        <div className={"d-flex flex-column gap-1 w-25 p-3 border"}>
            <input ref={nameRef} type="text" placeholder="username"/>
            <input ref={passRef} type="password" placeholder="password one"/>
            <input ref={passTwoRef} type="password" placeholder="password two"/>
            <p className="error">{error}</p>
            <button className="btn btn-primary" onClick={register}>Register</button>
        </div>
    );
};

export default RegisterPage;