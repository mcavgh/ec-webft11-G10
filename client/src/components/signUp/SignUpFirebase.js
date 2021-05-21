import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";

const SignUp = ({ history }) => {
  const handleSignUp =(email,password)=> useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);
 

  return (
      <>
        <LogIn
          handleSignUp={handleSignUp}
        />
      </>
  );
};

export default withRouter(SignUp);
