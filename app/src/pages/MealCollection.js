import React from 'react';
import Planner from '../components/planner';
import NavBar from '../components/navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme();
export default function MealCollection() {
    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>

    </ThemeProvider>
    )
}
