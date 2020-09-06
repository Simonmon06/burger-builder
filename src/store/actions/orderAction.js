import * as actionTypes from './actionTypes'
import axiosInstance from "../../axiosInstance";
export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}


export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axiosInstance.post('/orders.json?auth='+ token, orderData)
            .then(response => {
                console.log(response.data)
                dispatch(purchaseBurgerSuccess(response.data.name,orderData))
            })
            .catch(error=>{
                console.log(error)
                dispatch(purchaseBurgerFailed(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error:error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' +userId + '"';
        axiosInstance.get('/orders.json'+ queryParams)
            .then(response=> {
                console.log(response.data);

                const fetchedOrders =[];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key
                    });
                }

                console.log(fetchedOrders)
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error=> {
                dispatch(fetchOrdersFailed(error))
            })
    }
}