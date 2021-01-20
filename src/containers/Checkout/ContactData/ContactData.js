import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import "./ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        adress: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients)
        this.setState({ loading: true })
        // alert("You will be directed to Check Out!")
        //any nodename of your choice + .json is firebase specific
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Justin",
                adress: "Teststreet",
                zipCode: "212312",
                country: "Germany"
            },
            email: "test@test.com",
            deliveryMethod: "fastest"
        }

        axios.post("/orders.json", order)
            .then(response => {
                this.setState({ loading: false })
                this.props.history.push("/")
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }

    render() {
        let form = (
            <form>
                <input className="Input" type="text" name="name" placeholder="Your name"></input>
                <input className="Input" type="text" name="email" placeholder="Your email"></input>
                <input className="Input" type="text" name="street" placeholder="Your street"></input>
                <input className="Input" type="text" name="postal" placeholder="Your postal"></input>
                <Button clicked={this.orderHandler} btnType="Success Button">ORDER</Button>
            </form>
        )
        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;