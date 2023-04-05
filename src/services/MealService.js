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
        console.log("Error in add-meal", error)
        return null;
    }

}
export async function addDateMeal(datemeal) {

    try{
        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/add-date-meal', 
            datemeal,
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
        console.log("Error in add-date-meal", error)
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
        console.log("Error in getAllMeals", error)
        return null;
    }

}

export async function getDateMeal(date) {
    let date_payload = {"plan_date": date}
    try{
        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/get-date-meal',
            date_payload, 
            {
                headers: {
                    "access-control-allow-origin" : "*",
                    "Content-type": "application/json; charset=UTF-8"
                }
            }
        );
        console.log("success")
        return response;
    }
    catch(error) {
        console.log("Error in getDateMeal", error)
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
        console.log("Error in getMeal", error)
        return null;
    }

}

export async function pushGroceryList(grocery_list) {
    try{
        const payload = {
            "headers":"9y]`H5hAggx=xQF",
            "grocery_list":grocery_list
        }

        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/push-grocery-list',
            payload, 
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
        console.log("Error in push grocery list", error)
        return null;
    }

}

export async function getRecs(meal) {
    try{
        const response = await axios.post(
            'https://7wszt61cwd.execute-api.us-east-1.amazonaws.com/default/get-recs',
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
        console.log("Error in getRecs", error)
        return null;
    }

}