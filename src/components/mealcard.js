import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MealCard(props) {

  const meal = props.meal
  //console.log(meal["basal"])
  //console.log(meal["name"])
  return (
    <Card sx={{ minWidth: 175 }}>
      <CardContent>
        <Typography variant="h7" component="div">
          {meal.name}
        </Typography>
        <Typography variant="body2">
          {meal.ingredients}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}