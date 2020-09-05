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
import * as actions from "../../store/actions/index";

class BurgerBuilder extends Component{
      state= {
          purchasable: false,
      }



    componentDidMount () {
        console.log(this.props);
        this.props.onInitIngredients();
    }


    purchaseHandler =()=>{
          if(this.props.isAuthenticated){
              this.setState({purchasing:true});
          }else {
              this.props.onSetAuthRedirectPath('/checkout')
              this.props.history.push('/auth');
          }
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
        console.log("purchaseContinueHandler called !!")
        this.props.onInitPurchase();
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



        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

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
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            )
            orderSummary =<OrderSummary ingredients={this.props.ingredients}
                                        price ={this.props.totalPrice}
                                        purchaseCanceled={this.purchaseCancelHandler}
                                        purchaseContinued={this.purchaseContinueHandler}
            />
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !==null
    }
}

const mapDispatchToProps =dispatch => {
    return{
        onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axiosInstance));