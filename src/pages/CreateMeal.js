import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import {useState} from "react";

import NavBar from '../components/navbar.js';
import {createMeal} from '../services/MealService.js'

const theme = createTheme();
export default function CreateMeal() {

    const [numericField, inputNumericField] = useState({
      error:false,
      label:"Calories"
    });

    const [veg, setVeg] = React.useState('');
    const [taste, setTaste] = React.useState('');
    const [comp, setComp] = React.useState('');

    const [ingredCount, setIngredCount] = React.useState([1]);

    const handleVeg = (event) => {
      setVeg(event.target.value);
    };

    const handleTaste = (event) => {
      setTaste(event.target.value);
    };

    const handleComp = (event) => {
      setComp(event.target.value);
    };

    const parseBool = (s) => {
      if ( s === "No"){
        return false;
      }
      return true;
    } 

    const handleSubmit = (event) => {
      event.preventDefault();
  
      const data = new FormData(event.currentTarget);
      const ingredient_data = event.currentTarget.querySelector('.ingredient_list');
      const ingredient_list = ingredient_data.querySelectorAll('input');

      let ingredients = []
      ingredient_list.forEach((field) => {
        ingredients.push(field.value);
      });

      const meal = {
        "base": data.get('base'),
        "name": data.get('name'),
        "calories": parseInt(data.get('calories')),
        "complexity": comp,
        "ingredients": ingredients,
        "macros": {
          "carbs": parseInt(data.get('carbs')),
          "fats": parseInt(data.get('fat')),
          "proteins": parseInt(data.get('protein'))
        },
        "taste": parseInt(taste),
        //refactor this it should use the menu item
        "vegetarian": parseBool(veg)
      }
  
      createMeal(meal)
  
    }

    return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar/>

      {/*top level container*/}
      <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    {/*title*/}
                    <Typography component="h1" variant="h5">
                        Create Meal
                    </Typography>
                   {/*form box*/}
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        {/*top level grid*/}
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="base"
                                    label= "Base Ingredient"
                                    name="base"
                                />
                            </Grid>
                            {/* ingredients */} 
                            <Grid item xs={12} className="ingredient_list">
                              <Typography align="left">
                                Ingredients:
                              </Typography>
                              <Grid container>
                                {ingredCount.map((count) => (
                                  <Grid item xs = {4} key={count}>
                                    <TextField
                                          fullWidth
                                          id={"ingredients_".concat(count)}
                                          label="Ingredient"
                                          name="ingredients"
                                      />
                                  </Grid>
                                ))}
                              </Grid>
                              <Button
                                onClick = {() => {
                                  let temp = [ ...ingredCount ];
                                  temp.push(ingredCount[ingredCount.length-1]+1);
                                  setIngredCount(temp);
                                }}
                                variant="outlined"
                                sx={{ mt: 1, mb: 1, mr:1 }}
                                >
                                Add
                              </Button>
                              <Button
                                onClick = {() => {
                                  let temp = [ ...ingredCount ];
                                  if (temp.length > 1) {
                                    temp.pop();
                                    setIngredCount(temp);
                                  }
                                }}
                                variant="outlined"
                                sx={{ mt: 1, mb: 1 }}
                                >
                                Remove
                              </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    error = {numericField.error}
                                    required
                                    fullWidth
                                    name="calories"
                                    label= "Calories"
                                    id="calories"
                                />
                            </Grid>
                            {/* macros */}
                            <Grid item xs={12}>
                              <Grid container>
                                <Grid item xs={4}>
                                  <TextField
                                      error = {numericField.error}
                                      required
                                      fullWidth
                                      name="protein"
                                      label= "Protein"
                                      id="protein"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                      error = {numericField.error}
                                      required
                                      fullWidth
                                      name="carbs"
                                      label= "Carbs"
                                      id="carbs"
                                  />
                                </Grid>
                                <Grid item xs={4}>
                                  <TextField
                                      error = {numericField.error}
                                      required
                                      fullWidth
                                      name="fat"
                                      label= "Fats"
                                      id="fat"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            {/* vegetarian select*/}
                            <Grid item xs={4}>
                              <FormControl fullWidth>
                                <InputLabel>Vegetarian</InputLabel>
                                <Select
                                  id="veg"
                                  value={veg}
                                  onChange={handleVeg}
                                >
                                  <MenuItem value={false}>No</MenuItem>
                                  <MenuItem value={true}>Yes</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            {/* taste select*/}
                            <Grid item xs={3}>
                              <FormControl fullWidth>
                                <InputLabel>Taste</InputLabel>
                                <Select
                                  id="taste"
                                  value={taste}
                                  onChange={handleTaste}
                                >
                                  <MenuItem value={1}>1</MenuItem>
                                  <MenuItem value={2}>2</MenuItem>
                                  <MenuItem value={3}>3</MenuItem>
                                  <MenuItem value={4}>4</MenuItem>
                                  <MenuItem value={5}>5</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            {/* complexity select*/}
                            <Grid item xs={5}>
                              <FormControl fullWidth>
                                <InputLabel>Cooking Difficulty</InputLabel>
                                <Select
                                  id="complexity"
                                  value={comp}
                                  onChange={handleComp}
                                >
                                  <MenuItem value={"easy"}>Easy</MenuItem>
                                  <MenuItem value={"normal"}>Normal</MenuItem>
                                  <MenuItem value={"hard"}>Hard</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
    </ThemeProvider>
    )
}
