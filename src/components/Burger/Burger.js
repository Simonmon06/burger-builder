import React from "react";
import {withRouter} from 'react-router-dom';
import classes from './Burger.module.css'
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) =>{
    //Object.keys(object) return a array of all the keys of the input parameter object
    //igKey is the each element of the input array
    //Array(): Array(3) gives you an  array with size of 3 [, , ,]
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey =>{
            return [...Array(props.ingredients[igKey])].map(( _, i ) =>{
                return <BurgerIngredient key={igKey+ i} type={igKey}/>;
            });
            }
        ).reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue)
        }, [])


    //reduce(total,current)
    console.log(transformedIngredients);
    if(transformedIngredients.length ===0){
        transformedIngredients =<p> Please start adding ingredients</p>
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}
export default withRouter(Burger);