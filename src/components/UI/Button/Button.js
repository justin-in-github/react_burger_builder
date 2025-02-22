import React from "react"
import "./Button.css"

const button = (props) => {
    return (
        //props.children allows us to use our own button inside (as .children) to apply the styling we set here
        <button
            className={props.btnType}
            disabled={props.disabled}
            onClick={props.clicked}>{props.children}</button>

    )

}

export default button;