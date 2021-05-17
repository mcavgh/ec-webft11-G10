import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app, { facebookAuthProvider,googleAuthProvider } from "../../firebase/index.js";
import { AuthContext } from "../AuthContext";
import { useHistory } from "react-router-dom";
import LogIn from './LogIn';
const Login = () => {
  let history = useHistory();

  const handleLogin =  async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      console.log(email, password)
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    }

  

  const handleFaceAuth = () => {
    app
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
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
    <LogIn
    faceAuth={handleFaceAuth}
    auth={handleLogin}
    />
</>
  );
};

export default withRouter(Login);
