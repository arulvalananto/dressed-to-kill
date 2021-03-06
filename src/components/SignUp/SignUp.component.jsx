import React, { useState } from "react";

import { auth, createUserProfileDocument } from "../../firebase";
import Button from "../Button/Button.component";
import FormInput from "../FormInput/FormInput.component";

import { SignupContainer, SignupTitle } from "./SignUp.styles";

const SignUp = () => {
  const initialState = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [credentials, setCredentials] = useState(initialState);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = credentials;

    if (password !== confirmPassword) {
      alert("Password does not match");
      return;
    }
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });
      setCredentials(initialState);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <SignupContainer>
      <SignupTitle>I do not have an account</SignupTitle>
      <span>Sign up with email and password</span>
      <form onSubmit={submitHandler} className="sign-up-form">
        <FormInput
          type="text"
          name="displayName"
          value={credentials.displayName}
          onChange={changeHandler}
          label="Full Name"
        />
        <FormInput
          type="email"
          name="email"
          value={credentials.email}
          onChange={changeHandler}
          label="Email Address"
        />
        <FormInput
          type="password"
          name="password"
          value={credentials.password}
          onChange={changeHandler}
          label="Password"
        />
        <FormInput
          type="password"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={changeHandler}
          label="Confirm Password"
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </SignupContainer>
  );
};

export default SignUp;
