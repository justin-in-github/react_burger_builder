import * as actionTypes from "./actions"
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
        veganPatty: 0
    },
    totalPrice: 4
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
        default:
            return state;
    }
}

export default reducer;