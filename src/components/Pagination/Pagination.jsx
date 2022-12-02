import React from 'react';
import { Typography,Button } from '@mui/material';
import useStyles from './style.js';
const Pagination = ({setPage,currentPage,totalPages}) => {
    const classes = useStyles();
    const handlePrev = () =>{
        if (currentPage !== 1) { setPage((prevPage) => prevPage - 1); }
    }
    const handleNext = () =>{
        if (currentPage !== totalPages) { setPage((prevPage) => prevPage + 1); }
    }
  return (
    <div className={classes.container}>
        <Button variant='contained' onClick={handlePrev} className={classes.button} color="primary" type="button">
            Prev
        </Button>
        <Typography variant="h4" className={classes.pageNumber}>{currentPage}</Typography>
        <Button variant='contained' onClick={handleNext} className={classes.button} color="primary" type="button">
            Next
        </Button>
    </div>
  )
}

export default Pagination
