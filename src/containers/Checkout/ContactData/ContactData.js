import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import "./ContactData.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"

import Input from '../../../components/UI/Input/Input';
import {connect} from "react-redux"

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                valid: true,
                validation: {}
            }
        },
        formIsValid: false,
        loading: false
    }

    //on submit, take the single inputs and store its data/input-values in formData (we changed state with inputChangedHandler), then push it to the DB
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            //holds user input
            orderData: formData
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    //when typing in inputs, copy the state (spread twice since its nested objects)
    //and then take input-value and setState

    inputChangedHandler = (event, inputIdentifier) => {
        //this gives us {name: {…}, street: {…}, ...}
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        //this gives (eg. for field "name"): {elementType: "input", elementConfig: {…}, value: "justi"}
        //inputIdentifier = "name", "street", ...
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        //next 2 lines for validation
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        //take the key eg "name" and set its .value (above)
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({ orderForm: updatedOrderForm });

        //check whole form-validation to then enable/disable the button
        //note: make sure to pass this state to the button comp aswell
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            //for "name", "street", .. check if .valid is true
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
    }

    //form-validation: check if single input fields are valid
    checkValidity(value, rules) {
        let isValid = true;

        //isValid return true/false
        //true if value.trim does not equal an empty string eg. empty input field
        //also add && isValid to allow these if-checks in a row (maybe we could nest them?)
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
    }

    render() {
        //arr we get: [id: name, config: this.state.orderForm.name]
        //[id: street, config: this.state.orderForm.street]
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        //create Input dynaically for every object we have in state.orderForm (in case type matches)
        //and pass props to <Input>
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button disabled={!this.state.formIsValid} btnType="Success Button">ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(ContactData);

