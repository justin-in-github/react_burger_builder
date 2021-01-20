import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route } from "react-router-dom"
import ContactData from "./ContactData/ContactData"


class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }
    componentWillMount() {
        //extract the querystring we just set up in BurgerBuilder.js
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {}
        let price = 0;
        for (let param of query.entries()) {
            //check if there is "price" in the querystring
            if (param[0] === "price") {
                price = param[1]
            } else {
                // this will equal ["salad", "1"]
                ingredients[param[0]] = +param[1]
            }

        }
        this.setState({ ingredients: ingredients, totalPrice: price })

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                {/* //routing for ContactData formular */}
                {/* //to be able to pass the ingredients props, we use render instead of component */}
                {/* //NOTE: DUE TO THIS THE ROUTER METHODS PATH HISTORY ETC ARE NOT AVAILABLE ON CONTACTDATA, SO WE USE PROPS WITH {...PROPS} */}
                <Route path={this.props.match.path + "/contact-data"} render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} />
            </div>

        )
    }
}

export default Checkout;