import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useState, useEffect} from "react";

import NavBar from '../components/navbar';
import MealCard from '../components/mealcard';
import { getAllMeals } from '../services/MealService';

const theme = createTheme();
export default function MealCollection() {

    const [meals, setMeals] = useState([]); 
    
    useEffect(() => {
      getAllMeals().then(response => {
        console.log(response.data)
        console.log(typeof(response.data))
        setMeals(response.data)
      })
    }, []);

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>

      <Box sx={{ width: '90%', mx: 'auto', mt: '8%'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {meals.map((index) => (
          <Grid key={index} item xs={2} mr={10}>
            <MealCard/>
          </Grid>
        ))}
      </Grid>
    </Box>


    </ThemeProvider>
    )
}
