import React from "react"
import "./Logo.css"

//we need to import the img bc webpack will do things with it, so that we cant just set its path as a src on the img
import burgerLogo from "../../assets/images/burger-logo.png"

const logo = (props) => {
    return(
        //taking the props from Toolbar.js height: "80%"
        //explanation: in Logo.css we set height to 100% (as a reference)
        //now, in the Toolbar we want it be at 80%
        //in the Sidedrawer, we want it to be 11%
        //therefore, the logo will have different sizes in different places
        //while we here just take the props.height (80% or 11%)
        <div className="Logo" style={{height: props.height}}>
            <img src={burgerLogo} alt="MY BURGER" />
        </div>
    )
}

export default logo;