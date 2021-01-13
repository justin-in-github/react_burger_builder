import React, {Component} from "react"
import "./Modal.css"
import Backdrop from "../Backdrop/Backdrop"

class Modal extends Component {
    //this makes sure that the modal will only update/rerender when it is shown
    //since it wraps the OrderSummary, OrderSummary is affected by this too (that is actually our main goal)
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show
    }

    componentWillUpdate() {
        console.log("Modal will update")
    }
    render() {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={
                        this.props.show ? "Modal Show" : "Modal Hide"
                    }>
                    {this.props.children}
                </div >
            </React.Fragment>
        )
    }
}

//React.memo ensures that the DOM will only rerender when changes
//were made to the Modal
// export default React.memo(modal);

export default Modal;