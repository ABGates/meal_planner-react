import React from 'react';
import Planner from '../components/planner';
import NavBar from '../components/navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const theme = createTheme();
export default function MealPlanner() {
    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>
      
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button>Last Week</Button>
        <Button>Current Week</Button>
        <Button>Next Week</Button>
      </ButtonGroup>
      
      <Planner/>

    </ThemeProvider>
    )
}
