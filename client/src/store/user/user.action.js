import axios from 'axios';

export const GET_CART = 'GET_CART';
export const GET_USER_BYID = 'GET_USER_BYID';
export const GET_USERS = 'GET_USERS';
export const POST_USER = 'POST_USER';
export const PUT_USER = 'PUT_USER';
export const DELETE_USER = 'DELETE_USER';
export const SELECT_USER = 'SELECT_USER';
export const CREATE_USER = 'CREATE_USER';
export const GET_ID_BYEMAIL = 'GET_ID_BYEMAIL';
export const POST_ADMIN = 'POST_ADMIN';
export const POST_USER_ACCESS = 'POST_USER_ACCESS';
export const POST_USER_DATA = 'GET_USER_DATA';

export const postUserData = userData => {
    return dispatch => {
        dispatch({ type: POST_USER_DATA, payload: userData });
    };
};

export const postUser = (displayName, email) => {
    return (dispatch, getState) => {
        console.log('entra');
        const nameArray = displayName.split(' ');
        axios
            .post(`/users/register`, {
                name: nameArray[0],
                surname: nameArray[1],
                email: email,
            })
            .then(res => {
                dispatch({ type: GET_ID_BYEMAIL, payload: res.data });
            });
    };
};

export const postAdmin = id => {
    console.log(id);
    return dispatch => {
        axios.put(`/users/${id}/usuario/admin`).then(res => {
            dispatch({ type: POST_ADMIN });
            dispatch(getUsers());
        });
    };
};

export const postUserAccess = id => {
    console.log(id);
    return dispatch => {
        axios.put(`/users/${id}/usuario/user`).then(res => {
            dispatch({ type: POST_USER_ACCESS });
            dispatch(getUsers());
        });
    };
};

export const DestroyUsuario = id => {
    console.log(id);
    return dispatch => {
        axios.delete(`/users/${id}`).then(res => {
            dispatch({ type: DELETE_USER });
            dispatch(getUsers());
        });
    };
};

export const getUsersByEmailId = email => {
    return function (dispatch) {
        axios.get(`/users/email/${email}`).then(user => {
            dispatch({ type: GET_ID_BYEMAIL, payload: user.data });
        });
    };
};

export const getUsersById = id => {
    return function (dispatch) {
        axios.get(`/users/${id}`).then(payload => {
            console.log('esto es el user de id de action', payload);
            dispatch({ type: GET_USER_BYID, payload: payload.data });
        });
    };
};

export const getUsers = () => {
    return function (dispatch) {
        axios.get(`/users/users`).then(payload => {
            dispatch({ type: GET_USERS, payload: payload.data });
        });
    };
};
