import React, { Component } from "react"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Burger from "../../components/Burger/Burger"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OderSummary"

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    veganPatty: 1.0
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
            veganPatty: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })

    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseContinueHandler = () => {
        alert("You will be directed to Check Out!")
    }
    updatePurchaseState(updatedIngredients) {
        //const sum gives us a number... if return is 0 we want the "ODER NOW"-Button to be disabled
        //run this after addIngredientHandler/removeIngredientHandler
        //Object.keys turns the JS Object into an array of string (eg. ["bacon", "cheese", ...])
        const sum = Object.keys(updatedIngredients)
            .map(igKey => {
                return updatedIngredients[igKey] // eg. returns 0 / 1 / 2 / ...
            })
            //starting number is 0
            //element is what we returned above (number...)
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //sets the state to true if > 0
        this.setState({ purchaseable: sum > 0 })

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            //the right side returns true or false (true if <= 0), which we store in disabledInfo
            //if it holds true it means this ingredients button should be disabled
            disabledInfo[key] = disabledInfo[key] <= 0 //salad: true, meat: false, ...
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler} 
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler} />
            </React.Fragment>
        )
    }
}

export default BurgerBuilder;