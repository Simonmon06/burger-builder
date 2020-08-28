import React, {Component} from "react";
import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css'
import axiosInstance from "../../../axiosInstance";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component{
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading: false
    }

    orderHandler=(event)=>{
        event.preventDefault();

        this.setState({loading: true});
        const order ={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Simon Gu',
                address: {
                    street: 'Test',
                    zipCode: 'k1213',
                    country: 'canada'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fasttest'
        }
        axiosInstance.post('/orders.json', order)
            .then(response => {
                this.setState({loading:false});
                console.log(response)
                this.props.history.push('/')
            })
            .catch(error=>{
                this.setState({loading:false});
                console.log(error)});
    }

    render(){
        let form =(
            <form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal code "/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
        </form>
        );
        if(this.state.loading){
            form= <Spinner/>
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data </h4>
                {form}
            </div>
        );
    }
}

export default ContactData;