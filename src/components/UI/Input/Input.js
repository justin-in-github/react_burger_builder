import React from 'react';

// import classes from './Input.css';
import './Input.css';

const input = (props) => {
    let inputElement = null;

    //create this for validation-check-styling
    const inputClasses = ["InputElement"];
    //add Invalid class to the input if requirements not met
    //the 2nd check is for the dropdown menu
    //the 3rd check is to check whether it was touched or not to not start with red input fields
    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push("Invalid")
    }
    console.log(props.touched)


    //validationError msg below Input
    let validationError = null;
    if (props.invalid && props.touched) {
        validationError = <p>Please enter a valid value!</p>;
        // validationError = <p>Please enter a valid {props.valueType}</p>;
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className="InputElement"
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className="InputElement"
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;