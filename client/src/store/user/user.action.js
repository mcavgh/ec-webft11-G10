import axios from "axios";

export const GET_CART = "GET_CART";
export const GET_USER_BYID = "GET_USER_BYID";
export const GET_USERS = "GET_USERS";
export const POST_USER = "POST_USER";
export const PUT_USER = "PUT_USER";
export const DELETE_USER = "DELETE_USER";
export const SELECT_USER = "SELECT_USER";
export const CREATE_USER = "CREATE_USER";
export const GET_ID_BYEMAIL = "GET_ID_BYEMAIL";
export const POST_ADMIN = "POST_ADMIN";

export const postUser = (displayName, email) => {
    return (dispatch, getState) => {
        console.log("entra")
        const nameArray = displayName.split(" ")
        axios.post(`/users/register`, { name: nameArray[0], surname: nameArray[1]}).then((res) => {
            dispatch({ type: GET_ID_BYEMAIL, payload: res.data });
        })
    }
}

export const postAdmin = (data) => {
    return (dispatch, getState) => {
        axios.post(`/users/register`,{data,access:"Admim"} ).then((res) => {
            dispatch({ type: POST_ADMIN, payload: res.data });
        })
    }
}

export const getUsersByEmailId = (email) => {
  return function (dispatch) {
    axios.get(`/users/email/${email}`).then((user) => {
      dispatch({ type: GET_ID_BYEMAIL, payload: user.data });
    });
  };
};

export const getUsersById = (id) => {
  return function (dispatch) {
    axios.get(`/users/${id}`).then((payload) => {
      console.log("esto es el user de id de action", payload);
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
