import * as React from 'react';
import Grid from '@mui/material/Grid';
import MealCard from './mealcard';

export default function DayMeals() {
  return (
    <Grid container rowSpacing={1} >
      <Grid item xs={12}>
        <MealCard/>
      </Grid>
      <Grid item xs={12}>
        <MealCard/>
      </Grid>
      <Grid item xs={12}>
        <MealCard/>
      </Grid>
    </Grid>
  );
}