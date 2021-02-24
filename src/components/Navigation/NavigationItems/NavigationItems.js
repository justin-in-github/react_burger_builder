import React from "react"
import "./NavigationItems.css"
import NavigationItem from "./NavigationItem/NavigationItem"

const navigationItems = () => {
    return (
        <ul className="NavigationItems">
            <NavigationItem link="/">YourBurger</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
        </ul>
    )

}

export default navigationItems;