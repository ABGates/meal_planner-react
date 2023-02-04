import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";

export default function NavBar() {

  const navigate = useNavigate();

  const navPlanner = (event) => {
    navigate('/', {state : {}})
  };

  const navMeals = (event) => {
    navigate('/meals', {state : {}})
  };

  const popMeals = (event) => {};


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>          
          <Button
            id="nav-planner"
            onClick={navPlanner}
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            <Typography variant="h6" component="div" >
              Planner
            </Typography>
          </Button>
          <Button
            id="nav-planner"
            onClick={navMeals}
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            <Typography variant="h6" component="div" >
              Meals
            </Typography>
          </Button>
          <Button
            id="nav-planner"
            onClick={popMeals}
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            <Typography variant="h6" component="div">
              Create Meal
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}