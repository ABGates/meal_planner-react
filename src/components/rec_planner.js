import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {useState, useEffect} from "react";

import MealCard from './mealcard';
import { getMeal } from '../services/MealService';

export default function RecPlanner(props) {

  const [meals, setMeals] = useState([]); 

  if (props.recs != null && props.recs_changed){
    for (let i = 0; i<props.recs.length; i++){
      getMeal({"basal":props.recs[i][0],"title":props.recs[i][1]}).then(response => {
        let meals_new = [...meals]
        meals_new.push(response.data)
        setMeals(meals_new)
        props.setRecs_changed(false)
      })
    }
  }

  return (

    <Box sx={{ width: '90%', mx: 'auto', mt: '8%'}}>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
      {meals.map((meal, index) => (
        <Grid key={index} item xs={2} mr={10}>
          <MealCard meal={meal}/>
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}