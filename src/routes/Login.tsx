import React, { useState } from "react";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { Error, Form, Input, Switcher, Title, Wrapper } from "../components/auth-common";

export default function CreateAccount() {
  const [isLoading, setLoading] =useState(false);
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    if(name === "email"){
      setEmail(value);
    }else {
      setPassword(value);
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if(isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch(e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return <Wrapper>
    <Title>Login 𝕏</Title>
    <Form onSubmit={onSubmit}>
      <Input name="email" placeholder="email" type="email" required value={email} onChange={onChange}/>
      <Input name="password" placeholder="password" type="password" required value={password} onChange={onChange}/>
      <Input type="submit" value={isLoading ? "Loading" : "Create Account"} />
    </Form>
    <Error>{error}</Error>
    <Switcher>
      Don't have an account?{" "}
      <Link to="/createaccount">Create Account &rarr;</Link>
    </Switcher>
  </Wrapper>
}