import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route } from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import {connect} from "react-redux"

class Checkout extends Component {
 
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
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                />
                {/* //routing for ContactData formular */}
                {/* //to be able to pass the ingredients props, we use render instead of component */}
                {/* //NOTE: DUE TO THIS THE ROUTER METHODS PATH HISTORY ETC ARE NOT AVAILABLE ON CONTACTDATA, SO WE USE PROPS WITH {...PROPS} */}
                <Route 
                path={this.props.match.path + "/contact-data"} 
                component={ContactData}/>           
            </div>

        )
    }
}

//fetch the state from reducer... no need to define mapDispatchtoProps here
const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);