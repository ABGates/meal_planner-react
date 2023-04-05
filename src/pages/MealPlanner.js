import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useState} from "react";

import Planner from '../components/planner';
import NavBar from '../components/navbar';
import { getRecs } from '../services/MealService';
import RecPlanner from '../components/rec_planner';

const theme = createTheme();
export default function MealPlanner() {
    const [week, setWeek] = useState(0)
    const [meal_recs, setMeal_recs] = useState([])
    const [recs_changed, setRecs_changed] = useState(false)

    const handleGetRecs = () => {
      getRecs().then(response=>{
        setMeal_recs(response.data[1])
      }).finally(      
        setRecs_changed(true))
    }

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>
      
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={()=>setWeek(-1)}>Last Week</Button>
        <Button onClick={()=>setWeek(0)}>Current Week</Button>
        <Button onClick={()=>setWeek(1)}>Next Week</Button>
      </ButtonGroup>
      
      <Planner week={week}/>

      <Button onClick={() =>handleGetRecs()}>Get Meal Recommendation</Button>
      <RecPlanner recs = {meal_recs} recs_changed = {recs_changed} setRecs_changed = {setRecs_changed}/>

    </ThemeProvider>
    )
}
