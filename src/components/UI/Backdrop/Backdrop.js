import { checkPropTypes } from "prop-types";
import React from "react"
import "./Backdrop.css"

const backdrop = (props) => {
    return (
        //null just means nothing gets rendered
        props.show ? <div
            className="Backdrop"
            onClick={props.clicked}></div> : null
    )


}

export default backdrop;    