import React from 'react';
import { CssBaseline} from '@mui/material';
import { Route , Routes } from 'react-router-dom';
import { ThemeProvider } from '@mui/styles';
import useStyles from './styles';

import { Actors , MovieInformation , Movies , NavBar , Profile } from './';

const App = () => {
  const classes = useStyles();
  console.log(classes.content)
  return(
    <div className={classes.root}>
      <CssBaseline/>
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolkit} />
        <Routes>
          <Route exact path='/' element={<Movies/>}/>
          <Route exact path='/approved' element={<Movies/>}/>
          <Route exact path='/movie/:id' element={<MovieInformation/>} />
          <Route exact path='/actors/:id' element={<Actors/>} />
          <Route exact path='/profile/:id' element={<Profile/>} />
        </Routes>
      </main>

    </div>
  )
  
}

export default App;