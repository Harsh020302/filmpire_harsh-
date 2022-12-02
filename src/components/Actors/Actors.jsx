import React,{useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { useGetActorDetailsQuery } from '../../services/TMDB';
import { Box,Button,Grid,CircularProgress,Typography } from '@mui/material';
import {ArrowBack } from '@mui/icons-material';
import useStyles from './style.jsx';
import MovieList from '../MovieList/MovieList';
import { useGetMoviesByActorIdQuery } from '../../services/TMDB';
import Pagination from '../Pagination/Pagination.jsx';

const Actors = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [page,setPage] = useState(1);
    const { data , isFetching , error } = useGetActorDetailsQuery({id});
    const { data : actorMovieData , isFetching : isFetchingActorMovies} = useGetMoviesByActorIdQuery({id,page});
    const classes = useStyles();
    
    console.log("Actor data:",data);
    if(isFetching){
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress size="8rem" />
        </Box>
      );
    }
    if(error){
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Link to="/">Something went wrong - Go back.</Link>
        </Box>
      );
    }
  return (
    <Grid container spacing={2} >
      <Grid item sm={12} xl={4} align='center' style={{display: 'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
        <img src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`} className={classes.image}  />
        
      </Grid>
      <Grid item sm={12} xl={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'} }>
        <Typography variant='h2' gutterBottom>
          {data?.name}
        </Typography>
        <Typography variant='h5' gutterBottom>
          Born : {new Date(data?.birthday).toDateString()}
        </Typography>
        <Typography variant='body1' align="justify" gutterBottom>
          {data?.biography|| 'Sorry, no biography yet...'}
        </Typography>
        <Box style={{display: 'flex',flexDirection:'row',justifyContent: 'space-between',marginTop: '10px'}} >
          <Button variant="contained" target="_blank"  href={`https://www.imdb.com/name/${data?.imdb_id}/`}>
            Imdb
          </Button>
          <Button variant="outlined" startIcon={<ArrowBack/> } onClick={() => navigate(-1)}>
            Back
          </Button>
        </Box>
      </Grid>
      <Box style={{marginTop:'20px',display:"flex",flexDirection:'column',alignItems:'center'}}>
      <Typography variant="h2" gutterBottom align="center">Movies</Typography>
        {actorMovieData && <MovieList movies={actorMovieData} numberOfMovies={12} />}
        <Pagination currentPage={page} setPage={setPage} totalPages={actorMovieData?.total_pages} />
      </Box>
    </Grid>
  )
}

export default Actors