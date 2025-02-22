import React from "react"
import BuildControl from "./BuildControl/BuildControl"
import "./BuildControls.css"

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "VeganPatty", type: "veganPatty" }
]

const buildControls = (props) => {
    return (
        <div className="BuildControls">
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(control => (
                <BuildControl
                    key={control.label}
                    label={control.label}
                    //we loop over controls which each ahas a type (see above) and pass that type to our
                    //addIngredientHandler where we need the type
                    added={() => props.ingredientAdded(control.type)}
                    removed={() => props.ingredientRemoved(control.type)}
                    disabled={props.disabled[control.type]} />
            ))}
            <button
                className="OrderButton"
                disabled={!props.purchaseable}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;