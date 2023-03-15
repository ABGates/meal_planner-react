import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useState, useEffect} from "react";
import { parseISO, format, startOfWeek, addDays, subDays } from 'date-fns'

import MealCard from './mealcard';
import { getDateMeal } from '../services/MealService';

export default function Planner(week) {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const today = new Date()
  //const [weekStart, setWeekStart] = useState(); 
  let weekStart
  switch(week) {
    case -1:
      weekStart = (subDays( startOfWeek(today, {weekStartsOn: 1}), 7));
      break;
    case 1:
      weekStart = (addDays( startOfWeek(today, {weekStartsOn: 1}), 7));
      break;
    default:
      weekStart = startOfWeek(today, {weekStartsOn: 1});
      break;
  }

  //weekStart = format(parseISO(weekStart), 'yyyy/MM/dd')
  //console.log(typeof(weekStart))
  //console.log("weekStart " + weekStart)
  const dates = [
    weekStart,
    addDays(weekStart,1),
    addDays(weekStart,2),
    addDays(weekStart,3),
    addDays(weekStart,4),
    addDays(weekStart,5),
    addDays(weekStart,6)
  ].map((date, index) => {
    return format(date, 'yyyy-MM-dd');
  });

  //console.log("flag1")
  console.log("dates", dates)
  //console.log("formatted: " + format(dates[1], 'yyyy/MM/dd'))

  //build list of lists (day,date,meal)
  const plan = []
  for (let i = 0; i < dates.length; i++) {

    let day = [days[i], dates[i]]

    getDateMeal(dates[i]).then(response => {
      //console.log("f2 ",response.data)
      //console.log("f3 " + typeof(response.data))
      day.push(response.data)
    }).then(plan.push(day))
  } 

  console.log("plan: ", plan)

  return (
    <Box sx={{ width: '98%', mx: 'auto', mt: '5%'}}>
      <Grid container columnSpacing={{ xs: 1}}>
        {plan.map((day, index) => (
          <Grid key={index} item xs={1} mr={0} sx={{ minWidth:210, border:1, borderRadius: '16px' }}>
            <Typography>
              {day[0]} 
            </Typography>
            { day[2] ? <MealCard meal={day[2]}/> : <Typography>Add Meal to Plan!</Typography> }
            <Button>Edit</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}