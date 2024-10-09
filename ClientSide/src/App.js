
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Toolbar from "./components/Toolbar";
import RecipesPage from "./pages/RecipesPage";
import CreateRecipePage from "./pages/CreateRecipePage";
import UserProfilePage from "./pages/userProfilePage";
import SingleRecipePage from "./pages/SingleRecipePage";
import UserRecipesPage from "./pages/UserRecipesPage";



function App() {

    return (
        <div className={"p-5 d-flex flex-column gap-2"}>
            <BrowserRouter>
                <Toolbar/>
                <div className="d-flex justify-content-center">
                    <Routes>
                        <Route element={<RecipesPage/>} path="/recipes"/>
                        <Route element={<RegisterPage/>} path="/register"/>
                        <Route element={<LoginPage/>} path="/"/>
                        <Route element={<CreateRecipePage/>} path="/createRecipe"/>
                        <Route element={<UserProfilePage/>} path="/userProfile"/>
                        <Route element={<SingleRecipePage/>} path="/recipe/:id"/>
                        <Route element={<UserRecipesPage/>} path="/userRecipes"/>
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;