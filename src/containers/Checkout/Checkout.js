import React,{Component} from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Redirect, Route} from 'react-router-dom';
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux';
class Checkout extends Component{




    checkoutCancelledHandler =()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler=()=>{
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary =<Redirect to="/"/>
        if(this.props.ingredients){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" />  : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}

                    />
                    <Route path={this.props.match.path + '/contact-data'}
                           component={ContactData}/>
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps =state=>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}



export default connect(mapStateToProps)(Checkout);