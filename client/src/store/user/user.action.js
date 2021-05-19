import axios from 'axios'
import { postOrders } from '../order/order.action';

export const GET_CART = "GET_CART";
export const GET_USER_BYID = "GET_USER_BYID"
export const GET_USERS = "GET_USERS"
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";
export const DELETE_USER = "DELETE_USER";
export const SELECT_USER = "SELECT_USER";
export const CREATE_USER = "CREATE_USER";
export const GET_ID_BYEMAIL = "GET_ID_BYEMAIL";

export const postUser = (displayName, email) => {
    return (dispatch, getState) => {
        console.log("entra")
        const nameArray = displayName.split(" ")
        axios.post(`/users/register`, { name: nameArray[0], surname: nameArray[1], email, password: "1234" }).then((res) => {
            console.log(res)
            dispatch({ type: POST_USER, payload: res });
        })
    }
}
export const getUsersByEmail = (email) => {
    return function (dispatch, getState) {
        const price = getState().cart.total;
        const quantity = getState().cart.cartQuantity;
        axios.get(`/users/email/${email}`).then((user) => {
            dispatch(postOrders({
                userId: user.data.id,
                price,
                quantity
            }))
            dispatch({ type: GET_USER_BYID, payload: user });
        });
    };
};
export const getUsersByEmailId = (email) => {
    return function (dispatch) {
        axios.get(`/users/email/${email}`).then((userId) => {
            dispatch({ type: GET_ID_BYEMAIL, payload: userId.data });            
        });
    };
};

export const getUsersById = (id) => {
    return function (dispatch) {
        axios.get(`/users/${id}`).then((payload) => {
            console.log("esto es el user de id de action", payload)
            dispatch({ type: GET_USER_BYID, payload: payload.data });
        });
    };
};

export const getUsers = () => {
    return function (dispatch) {
        axios.get(`/users/users`).then((payload) => {
            dispatch({ type: GET_USERS, payload: payload.data });
        });
    };
};

