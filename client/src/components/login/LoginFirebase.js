import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app, {
  facebookAuthProvider,
  googleAuthProvider,
} from "../../firebase/index.js";
import { AuthContext } from "../AuthContext";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { postUser, getUsersByEmailId } from "../../store/user/user.action";
import LogIn from "./LogIn";
import axios from "axios";
import { getProductsInCart } from '../../store/cart/cart.actions';

const Login = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const handleLogin = (email, password) => {
    try {
      app
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          console.log(user)
          history.push("/");
        })
    } catch (error) {
      alert(error);
    }
  };


  const handleFaceAuth = () => {
    app
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        const { displayName, email,uuid,photoURL } = user
        axios.get(`/users/email/${email}`).then((user) => {
          if (user.data === "el usuario no existe") {
            dispatch(postUser(displayName, email))
          } else {
            dispatch({ type: "GET_ID_BYEMAIL", payload: user.data });
            dispatch(getProductsInCart(user.data.id))
          }
        });
        
        history.push("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <LogIn faceAuth={handleFaceAuth} auth={handleLogin}  />
    </>
  );
};

export default withRouter(Login);
