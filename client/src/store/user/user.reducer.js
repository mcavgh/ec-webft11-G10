import { POST_USER_ACCESS, POST_ADMIN, GET_USER_BYID,GET_ID_BYEMAIL, POST_USER, DELETE_USER, PUT_USER, GET_USERS } from './user.action';

const initialState = {
  users: [],
  user: undefined,
  userId: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {

    
    case DELETE_USER:
    case  POST_USER_ACCESS:
    case POST_ADMIN:
    case GET_USER_BYID:
      return {
        ...state,
        user: action.payload,
      };
    case GET_ID_BYEMAIL:
      return {
        ...state,
        userId: action.payload,
      };
    case DELETE_USER:
      return{
        ...state,
        userId:{}
      }
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



