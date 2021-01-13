import React, {Component} from "react"
import Button from "../../UI/Button/Button"

class OderSummary extends Component {
    componentWillUpdate(){
        console.log("OrderSummary will update")
    }
    render () {

        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
            <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredients[igKey]}
            </li> )
        })
        return ( 

            <React.Fragment>
            <h3>Your OrderButton</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: {this.props.price.toFixed(2)}</p>
            <p>Continue to Checkout?</p>

            <Button btnType="Danger Button" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success Button" clicked={this.props.purchaseContinued}>CHECK OUT</Button>
        </React.Fragment>)

    }
}

export default OderSummary;