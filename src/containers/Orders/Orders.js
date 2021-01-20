import axios from "../../axios-orders"
import React, { Component } from "react"
import Order from "../../components/Order/Order"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }


    componentDidMount() {
        axios.get("/orders.json")
            .then(res => {
                //fetch data from firebase and spread them in while also adding id
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading: false });
            });
        console.log(this.state.orders)
        console.log(this.state.orders)
    }

    render() {
        return (
            <div>
                {/* <Order /> */}
                {this.state.orders.map(order => (
                    <Order key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
            </div>

        )
    }
}

//NOTE: NETWORK ERROR NOT WORKING, BC OF NEWER REACT VERSION?! 
export default withErrorHandler(Orders, axios);