//THIS IS CALLED "ACTION CREATORS"
//THESE ARE MAINLY USED TO HANDLE ASYNC FNS, SINCE REDUX IS NOT ABLE TO
//THEY ARE USED IN mapDispatchToProps eg.:
//onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName))

import axios from "../../axios-orders"
import * as actionTypes from "./actionTypes"

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}


//THE NEXT TWO FUNCTIONS ARE WHAT WE WANT TO HANDLE IN OUR ACTUAL THUNK-MIDDLEWARE-FUNCTION "initIngredients"
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    //this is available due to redux-thunk. Now we can use async code
    return dispatch => {
        axios.get("https://react-burger-builder-c3dcc-default-rtdb.europe-west1.firebasedatabase.app/Ingredients.json")
        .then (response => {
            dispatch(setIngredients(response.data))
        })
        .catch (error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}