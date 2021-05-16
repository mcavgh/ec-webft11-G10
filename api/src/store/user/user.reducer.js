import { GET_USER_BYID, POST_USER, DELETE_USER, PUT_USER, GET_USERS } from './user.action';

const initialState = {
  users: [],
  user: undefined,

};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    
    
    case GET_USER_BYID:
      return {
        ...state,
        user: action.payload,
      };
    case POST_USER:
    case DELETE_USER:
    case PUT_USER:
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}


export default userReducer;



