import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId

    }

}


export const authFailed = (error) => {
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}
export const logout =() =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expireationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(logout());
        },expireationTime * 1000)

    }
}
export const auth = (email,password,isSignup) =>{
    return dispatch =>{

        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAMNKu7ZeZa8gfPd3XOm7wX6ta4NfHlMeI';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAMNKu7ZeZa8gfPd3XOm7wX6ta4NfHlMeI'
        }
        axios.post(url,authData)
            .then(response =>{
                console.log(response);
                dispatch(authSuccess(response.data.idToken,response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error=>{
                console.log(error);
                dispatch(authFailed(error.response.data.error))
            })
    }
}