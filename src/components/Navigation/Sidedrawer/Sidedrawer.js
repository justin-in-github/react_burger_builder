import React from "react"
import Logo from "../../Logo/Logo"
import NavigationItems from "../NavigationItems/NavigationItems"
import "./Sidedrawer.css"
import Backdrop from "../../UI/Backdrop/Backdrop"
import { checkPropTypes } from "prop-types"

const sidedrawer = (props) => {
    let attachedClasses = ["SideDrawer", "Close"]
    if (props.open) {
        attachedClasses = ["SideDrawer", "Open"]
    }
    return (
    <React.Fragment>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(" ").replace(/"/g,"")}>
            console.log(attachedClasses)
            <Logo height="11%"/>
            <nav>
                <NavigationItems/>  
            </nav>
        </div>
    </React.Fragment>
    )
}

export default sidedrawer;