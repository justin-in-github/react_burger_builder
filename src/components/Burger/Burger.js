import React from "react"
import "./Burger.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const burger = (props) => {
  /*   //Object.keys turns Object into an array [salad, bacon, cheese, meat]
    const transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        //now, for every key inside the array return a new array with length of ingredients amount
        //and map over the array a second time. igKey = ingredient eg. salad
        // "_" means we dont care about the element, just the array.length
        return [...Array(props.ingredients[igKey])].map((_, i) => {
           return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }); */

    //way simpler logic than above...
    let transformedIngredients = [];
    for (let ingredient in props.ingredients) {
        let quantity = props.ingredients[ingredient];
        //quantity is 2 when "cheese: 2"
        for (let i = 0; i < quantity; i++) {
            transformedIngredients.push(
            <BurgerIngredient key={ingredient + i} type={ingredient} />
        );
        }
    }
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Add favourite ingredients below!</p>
    }
    return (
        <div className="Burger">
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    ) 
}

export default burger;