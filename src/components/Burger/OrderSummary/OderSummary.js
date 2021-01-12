import React from "react"
import Button from "../../UI/Button/Button"

const oderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span>: {props.ingredients[igKey]}
            </li>
        })
    return (
        <React.Fragment>
            <h3>Your OrderButton</h3>
            <p>A delicious burger with the following ingredients</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>

            <Button btnType="Danger Button" clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success Button" clicked={props.purchaseContinued}>CHECK OUT</Button>
        </React.Fragment>
    )
}

export default oderSummary;