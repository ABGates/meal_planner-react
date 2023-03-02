import React from 'react';
import NavBar from '../components/navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import MealCard from '../components/mealcard';

const theme = createTheme();
export default function MealCollection() {
    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>

      <Box sx={{ width: '90%', mx: 'auto', mt: '8%'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
          <Grid item xs={2} mr={10}>
            <MealCard/>
          </Grid>
      </Grid>
    </Box>


    </ThemeProvider>
    )
}
