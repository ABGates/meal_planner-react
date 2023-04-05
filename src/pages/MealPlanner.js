import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import {useState} from "react";

import Planner from '../components/planner';
import NavBar from '../components/navbar';
import { getRecs } from '../services/MealService';

const theme = createTheme();
export default function MealPlanner() {
    const [week, setWeek] = useState(0)

    const handleGetRecs = () => {
      getRecs().then(response=>{
        console.log(response.data[1])
      })
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

      <Button onClick={() =>handleGetRecs()}>Get Meal Recommendations</Button>

    </ThemeProvider>
    )
}
