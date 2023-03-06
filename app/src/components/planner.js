import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography  from '@mui/material/Typography';
import MealCard from './mealcard';
import DayMeals from './'

export default function Planner() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  return (
    <Box sx={{ width: '98%', mx: 'auto', mt: '5%'}}>
      <Grid container columnSpacing={{ xs: 1}}>
        {days.map((day, index) => (
          <Grid key={index} item xs={1} mr={0} sx={{ minWidth:210, border:1, borderRadius: '16px' }}>
            <Typography>
              {day}
            </Typography>
            <DayMeals/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );

  /*return (
    <Box sx={{ width: '90%', mx: 'auto', mt: '8%'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {days.map((day, index) => (
          <Grid key={index} item xs={1} mr={10}>
            <MealCard day={day} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );*/
}