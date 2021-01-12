import React from "react"
import "./Layout.css"

const layout = (props) => {
    return(
        <React.Fragment>
            <div>Toolbar, SideDrawer, Backdrop
            <main className="Content">
                {props.children}
            </main>
            </div>
         </React.Fragment>
    )
    
};

export default layout;