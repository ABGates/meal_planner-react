import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useState, useEffect} from "react";
import { format, startOfWeek, addDays, subDays } from 'date-fns'
import Button from '@mui/material/Button';

import MealCard from './mealcard';
import { getDateMeal, pushGroceryList } from '../services/MealService';
import PlanMealDialog from './plan_meal_dialog';

export async function formatWeekPlan(dates, days) {
  let plan = [];
  for (let i = 0; i < dates.length; i++) {
    let day = [days[i], dates[i]];
    
    try {
      const response = await getDateMeal(dates[i]);
      day.push(response.data);
      plan.push(day);
    } 
    catch (error) {
      plan.push(day)
      console.log("Error in getWeekMeal", error);
    }
  }
  
  return plan;
}

export default function Planner(props) {

  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  const today = new Date()
  let weekStart
  switch(props.week) {
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

  const dates = [
    weekStart,
    addDays(weekStart,1),
    addDays(weekStart,2),
    addDays(weekStart,3),
    addDays(weekStart,4),
    addDays(weekStart,5),
    addDays(weekStart,6)
  ].map((date) => {
    return format(date, 'yyyy-MM-dd');
  });

  useEffect(() => {
    const fetchWeekPlan = async () => {
      const weekPlan = await formatWeekPlan(dates, days);
      setPlan(weekPlan);
      setLoading(false);
    };
    fetchWeekPlan();
  }, []);

  const handleSendGroceryList = () => {
    let groc_list = []
    for (let i = 0; i < plan.length; i++ ){
      if (plan[i][2] !== undefined && plan[i][2] !== null){
        groc_list.push(plan[i][2]["ingredients"])
      }
    }
    pushGroceryList(groc_list);
  }

  if (loading || !plan){
    return (<Typography>Loading ... </Typography>)
  }

  //console.log("plan", plan)

  return (
    <Box sx={{ width: '98%', mx: 'auto', mt: '5%'}}>
      <Grid container columnSpacing={{ xs: 1}}>
        {plan.map((day, index) => (
          <Grid key={index} item xs={1} mr={0} sx={{ minWidth:210, border:1, borderRadius: '16px' }}>
            <Typography>
              {day[0]} 
            </Typography>
            { day[2] ? <MealCard meal={day[2]}/> : <Typography>Add Meal to Plan!</Typography> }
            <PlanMealDialog date={day[1]} />
          </Grid>
        ))}
      </Grid>

      <Button onClick={()=>handleSendGroceryList()}>Send Grocery List</Button>
    </Box>
  );
}