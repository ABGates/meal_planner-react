import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";
import { startOfWeek, addDays, subDays } from 'date-fns'

import MealCard from './mealcard';
import { getDateMeal } from '../services/MealService';

export default function Planner(week) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const today = new Date()
  const [weekStart, setWeekStart] = useState(); 
  
  switch(week) {
    case -1:
      setWeekStart( subDays( startOfWeek(today, {weekStartsOn: 1}), 7 ) );
      break;
    case 1:
      setWeekStart( addDays( startOfWeek(today, {weekStartsOn: 1}), 7 ) );
      break;
    default:
      setWeekStart(startOfWeek(today, {weekStartsOn: 1}));
  }

  const dates = [
    weekStart,
    addDays(weekStart,1),
    addDays(weekStart,2),
    addDays(weekStart,3),
    addDays(weekStart,4),
    addDays(weekStart,5),
    addDays(weekStart,6)
  ]

  const meals = []
  for (let i = 0; i < dates.length; i++) {
    getDateMeal(dates[i]).then(response => {
      //console.log(response.data)
      //console.log(typeof(response.data))
      meals.push(response.data)
    })
  } 

  //build list of lists (day,date,meal)
  const plan = []
  for (let i = 0; i < dates.length; i++) {
    let day = [days[i], dates[i], meals[i]]
    plan.push(day)
  }

  return (
    <Box sx={{ width: '98%', mx: 'auto', mt: '5%'}}>
      <Grid container columnSpacing={{ xs: 1}}>
        {plan.map((day, index) => (
          <Grid key={index} item xs={1} mr={0} sx={{ minWidth:210, border:1, borderRadius: '16px' }}>
            <Typography>
              {day[0]} " " {day[1]}
            </Typography>
            <MealCard meal={day[2]}/>
            <Button>Edit</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}