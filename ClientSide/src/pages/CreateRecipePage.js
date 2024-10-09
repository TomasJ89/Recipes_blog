import React, {useRef, useState} from 'react';
import mainStore from "../store/mainStore";
import http from "../plugins/http";
import {useNavigate} from "react-router-dom";


const CreateRecipePage = () => {
    const {setError,error,token,setUser} = mainStore()
    const [imageUrls, setImageUrls] = useState([]);
    const { nameRef, imageRef, ingredientsRef, instructionsRef } = {
        nameRef: useRef(null),
        imageRef: useRef(null),
        ingredientsRef: useRef(null),
        instructionsRef: useRef(null)
    };

    const nav = useNavigate()


    function addUrl() {
        if (imageRef.current.value && imageUrls.length < 5) {
            let newUrl = imageRef.current.value
            setImageUrls([...imageUrls,newUrl])
            imageRef.current.value = ""
        } else {
            setError("No URL address or you added all 5 image")
        }
    }
    async function add() {

        const recipe = {
            name: nameRef.current.value,
            images: imageUrls,
            ingredients: ingredientsRef.current.value,
            instructions: instructionsRef.current.value,
        }
        const res = await http.postAuth("http://localhost:2000/addRecipe",recipe,token)
        console.log(res)
        if (res.success) {
            setError("")
            setUser(res.data)
            nav("/recipes")
        } else {
            setError(res.message)
        }

    }

    return (
        <div className={"d-flex flex-column p-2 gap-2 border flex02 overflow-hidden"}>
            <input ref={nameRef} type="text" placeholder="Recipe title"/>
            <input ref={imageRef} type="text" placeholder="Image URL"/>
            <ul>
                {imageUrls.map((x,i)=><li key={i} >{x}</li>)}
            </ul>
            <button onClick={addUrl}>Add Img URL</button>
            <textarea ref={ingredientsRef} placeholder="Ingredients..."/>
            <textarea ref={instructionsRef} placeholder="Instructions..."/>
            <p className="error">{error}</p>
            <button className="btn btn-primary" onClick={add}>Create Recipe</button>
        </div>
    );
};

export default CreateRecipePage;