import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MealCard(props) {

  console.log(props.meal)
  return (
    <Card sx={{ minWidth: 175 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary">
          {props.day}
        </Typography>
        <Typography variant="h7" component="div">
          "Meal Goes Here - Pull from DB"
        </Typography>
        <Typography variant="body2">
          "other info - indgredients, etc"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Edit</Button>
      </CardActions>
    </Card>
  );
}