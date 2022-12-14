import React from 'react';
import { useState,useEffect } from 'react';
import { Box,CircularProgress, useMediaQuery , Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB.js';
import {MovieList} from '..';
import Pagination from '../Pagination/Pagination.jsx';

const Movies = () => {
  const lg = useMediaQuery((theme)=>(theme.breakpoints.only('lg')));
  const numberOfMovies = lg ? 16 : 18;
  const [page,setPage] = useState(1);
  const { genreIdOrCategoryName,searchQuery } = useSelector((state)=>state.currentGenreOrCategory);
  const {data,error,isFetching} = useGetMoviesQuery({genreIdOrCategoryName,page,searchQuery});
  if(isFetching){
    return(
      <Box display='flex' justifyContent='center' >
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if(!data.results.length){
    return(
      <Box display="flex" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please searh for something else.
        </Typography>
      </Box>
    );
  }

  if(error){
    return (
      <span> an error occured </span>
    );
  }

  return (
    <div>
    {/* <h2>LOadion</h2> */}
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  )
}

export default Movies