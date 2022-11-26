import { configureStore } from "@reduxjs/toolkit";
import { tmdbApi } from "../services/TMDB.js";
import genreOrCategoryReducer from "../components/features/CurrentGenreOrCategory.jsx"

export default configureStore({
    reducer: {
        [tmdbApi.reducerPath] : tmdbApi.reducer,
        currentGenreOrCategory: genreOrCategoryReducer,
    },
});