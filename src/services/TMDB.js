import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { buildQueries } from '@testing-library/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
//https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1
const page = 1;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi' ,
    baseQuery: fetchBaseQuery( { baseUrl: 'https://api.themoviedb.org/3'}),
    endpoints: (builder)=>({

        //* Get Movies by [genre]
        getGenres: builder.query({
            query: ()=> `/genre/movie/list?api_key=${tmdbApiKey}`
        }),

        //* Get Movies by [Type]
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page , searchQuery}) => {

                if(searchQuery){
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
                }

                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string' ){
                    return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
                    
                }

                if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number'){
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
                    
                }
                
                return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`
            },
        }),

        //* Get MovieInfo by [Id]
        getMovieInfo: builder.query({
            query : (id) => {
                return `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`;
            }
        }),

        //* Get Movie Recommendations
        getRecommendations: builder.query({
            query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
        }),

        //* Get Actor Details by [Id]
        getActorDetails: builder.query({
            query: ({id}) => `https://api.themoviedb.org/3/person/${id}?api_key=${tmdbApiKey}`,
        }),

        // Get Movies by Actor
        getMoviesByActorId: builder.query({
            query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
        }),
    }),
})

export const {
    useGetGenresQuery,useGetMoviesQuery,useGetMovieInfoQuery,useGetRecommendationsQuery,useGetActorDetailsQuery,useGetMoviesByActorIdQuery
} = tmdbApi;