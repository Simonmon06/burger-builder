import React, {Component} from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axiosInstance from "../../axiosInstance";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actionTypes';

class BurgerBuilder extends Component{
    constructor(props) {
        super(props);
        this.state={
            purchasable:false,
            purchasing:false,
            loading: false
        }
    }


    componentDidMount() {
        axiosInstance.get('https://react-my-burger-7e4d0.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
    }

    purchaseHandler =()=>{
        this.setState({purchasing:true});
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }
    purchaseContinueHandler=()=>{
        // alert('continue')

        // const queryParams =[];
        // for(let i in this.props.ingredients){
        //     //#225
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]))
        // }
        // queryParams.push('price=' + this.state.totalPrice)
        // const queryString = queryParams.join('&');
        this.props.history.push('/checkout');

    }


    updatePurchaseState=(ingredients)=>{

        const sum= Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey]
        }).reduce((sum,curElement)=>{
            return sum+curElement;
        },0);
        return sum > 0;


    }



    render() {
        const disabledInfo={
            ...this.props.ingredients
        };
        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary =null;



        let burger = <Spinner/>

        if(this.props.ingredients ){


            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved ={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary =<OrderSummary ingredients={this.props.ingredients}
                                        price ={this.props.totalPrice}
                                        purchaseCanceled={this.purchaseCancelHandler}
                                        purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }

}

const mapStateToProps = state=>{
    return{
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps =dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingredientName
        }),
        onIngredientRemoved: (ingredientName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingredientName
        })
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axiosInstance));