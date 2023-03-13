import axios from 'axios'

export async function createMeal(meal) {

    try{
        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/add-meal', 
            meal,
            {
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return response;
    }
    catch(error) {
        console.log(error)
        return null;
    }

}

export async function getAllMeals() {

    try{
        const response = await axios.get(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/get-all-meals', 
            {
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return response;
    }
    catch(error) {
        console.log(error)
        return null;
    }

}

export async function getDateMeal(date) {

    try{
        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/get-date-meal',
            date, 
            {
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return response;
    }
    catch(error) {
        console.log(error)
        return null;
    }

}


export async function getMeal(meal) {

    try{
        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/get-meal',
            meal, 
            {
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        return response;
    }
    catch(error) {
        console.log(error)
        return null;
    }

}