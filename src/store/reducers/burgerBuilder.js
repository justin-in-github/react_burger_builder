import * as actionTypes from "../actions/actionTypes"

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    veganPatty: 1.0
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                //this takes a specific ingredient (passed by action) and increases it in state by 1
                [action.ingredientName]: state.ingredients[action.ingredientName] + 1
            },
            //takes the old price (initially 4) and adds on..
            totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
        }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]

            }
        //this is for initializing the ingredients and resets errors
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false
            }
        //this gives an error when no data fetched from firebase
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}

export default reducer;