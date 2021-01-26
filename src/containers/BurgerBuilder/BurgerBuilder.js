import React, { Component } from "react"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Burger from "../../components/Burger/Burger"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"
import {connect} from "react-redux"
import * as actionTypes from "../../store/actions"

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props)
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })

    }
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout")
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
        return sum > 0 

    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            //the right side returns true or false (true if <= 0), which we store in disabledInfo
            //if it holds true it means this ingredients button should be disabled
            disabledInfo[key] = disabledInfo[key] <= 0 //salad: true, meat: false, ...
        }

        //adding a spinner to checkout...
        //first, create Spinner.js and .css, then add new state "loading: false", then show orderSummary or, if state.loading = true, change orderSummary component with Spinner component
        //in purchaseContinueHandler add setState to true, and change back to false after getting axios response, then set state.purchasing to false, to that the modal closes
        let orderSummary = <OrderSummary
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price} />

        if (this.state.loading) {
            orderSummary = <Spinner />

        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchaseable={this.updatePurchaseState(this.props.ings)}
                    ordered={this.purchaseHandler} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));