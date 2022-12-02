import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB.js";
import genreOrCategoryReducer from "../components/features/CurrentGenreOrCategory.jsx"
import useReducer from "../components/features/auth.js";
export default configureStore({
    reducer: {
        [tmdbApi.reducerPath] : tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
        user: useReducer
    },
});