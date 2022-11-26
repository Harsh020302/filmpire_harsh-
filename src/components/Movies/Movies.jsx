import React from 'react';
import { useState,useEffect } from 'react';
import { Box,CircularProgress, useMediaQuery , Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useGetMoviesQuery } from '../../services/TMDB.js';
import {MovieList} from '..';

const Movies = () => {
  console.log('Movies');
  const [page,setPage] = useState(1);
  const genreIdOrCategoryName = useSelector((state)=>state.currentGenreOrCategory);
  const {data,error,isFetching} = useGetMoviesQuery({genreIdOrCategoryName,page});
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
      <MovieList movies={data} />
    </div>
  )
}

export default Movies