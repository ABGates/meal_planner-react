import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { getAllMeals } from '../services/MealService';
import { addDateMeal } from '../services/MealService';
export default function PlanMealDialog(props) {

    const [meals, setMeals] = React.useState([]); 

    React.useEffect(() => {
        getAllMeals().then(response => {
            setMeals(response.data)
        })
    }, []);



    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSumbit = (date, title, basal) => {
        let datemeal = {
            "plan_date":date,
            "basal": basal,
            "title": title
           }
        
        addDateMeal(datemeal);
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
    if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
        descriptionElement.focus();
        }
    }
    }, [open]);

    return (
    <div>
        <Button onClick={handleClickOpen()}>Edit</Button>
        <Dialog
        open={open}
        onClose={handleClose}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        >
        <DialogTitle id="scroll-dialog-title">Meals</DialogTitle>
        <DialogContent >
            <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            >
            {meals.map((meal, index) => (
                <Button key={index} sx={{ border: 1 }} onClick={() => handleSumbit(props.date, meal.title, meal.basal )} >{meal.title}</Button>
            ))}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
        </Dialog>
    </div>
    );
}