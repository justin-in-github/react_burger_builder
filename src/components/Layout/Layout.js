import React, {Component} from "react"
import "./Layout.css"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import Sidedrawer from "../Navigation/Sidedrawer/Sidedrawer"

class Layout extends Component {
    state= {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }   

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true})
    }

    render() {
        return(
            <React.Fragment>
                <Toolbar clicked={this.sideDrawerOpenedHandler}/>
                <Sidedrawer 
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
                <main className="Content">
                    {this.props.children}
                </main>
             </React.Fragment>
        )
    }
    };

export default Layout;