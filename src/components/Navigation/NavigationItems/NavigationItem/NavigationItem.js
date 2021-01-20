import React from "react"
import "./NavigationItem.css"
import { NavLink } from "react-router-dom"

const navigationItem = (props) => {
    return (

        <li className="NavigationItem">
            <NavLink
                to={props.link}
                //for active link setup see vid 229
                activeClassName="active"
                exact>{props.children}</NavLink>
        </li>
    )
}

export default navigationItem;