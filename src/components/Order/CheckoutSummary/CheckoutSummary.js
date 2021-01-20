import React from "react"
import "./CheckoutSummary.css"
import Burger from "../../Burger/Burger"
import Button from "../../UI/Button/Button"

const checkoutSummary = (props) => {
    return (
        <div className="CheckoutSummary">
            <h1>You will love it! Enjoy!</h1>
            <div style={{width: "100%", margin: "auto"}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger Button" clicked>CANCEL</Button>
            <Button btnType="Success Button" clicked>CHECK OUT</Button>
        </div>
    )
}

export default checkoutSummary;