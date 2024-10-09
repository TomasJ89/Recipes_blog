import {create} from "zustand";
const useStore = create((set,get) => ({
    user:null,
    error:"",
    loggedIn:null,
    token:"",
    allRecipes: [],
    filter:false,
    filteredRecipes:[],
    setFilteredRecipes: val => set ( {filteredRecipes:val}),
    setFilter: val => set ({filter:val}),
    setToken: val => set ({token:val}),
    setError: val => set ({error:val}),
    setUser: val => set ({user:val}),
    setAllRecipes: val => set({allRecipes:val}),
    setLoggedIn: val => set({loggedIn:val}),


}))

export default useStore