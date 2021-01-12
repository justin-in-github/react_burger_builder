import React from "react"
import "./Modal.css"
import Backdrop from "../Backdrop/Backdrop"

const modal = (props) => {
    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.modalClosed} />
            <div
                className={
                    props.show ? "Modal Show" : "Modal Hide"
                }>
                {props.children}
            </div >
        </React.Fragment>
    )
}

export default modal;