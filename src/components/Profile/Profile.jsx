import React, {useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography,Button,Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';


const Profile = () => {
  const { user } = useSelector((state)=>(state.user));
  const favoriteMovies = [];
  const logout = () =>{
    localStorage.clear();
    window.location.href = '/';
  }
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>My Profile</Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length
        ? <Typography variant="h5">Add favourite or watchlist same movies to see them here!</Typography>
        : (
          <Box>
            favoriteMovies
          </Box>
        )}
    </Box>
  )
}

export default Profile