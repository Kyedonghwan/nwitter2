import React, { useState } from "react";
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

const Error = styled.span`
  font-weight: 600;
  color: tomato;
`;

export default function CreateAccount() {
  const [isLoading, setLoading] =useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] =useState("");
  const [password, setPassword] = useState("");
  const [error, getError] = useState("");
  const navigate = useNavigate();

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;
    if(name === "name"){
      setName(value);
    }else if(name === "email"){
      setEmail(value);
    }else {
      setPassword(value);
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(isLoading || name === "" || email === "" || password === "") return;
    try {
      setLoading(true);
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credentials.user, {
        displayName: name
      });
      navigate("/");
    } catch(e) {
    } finally {
      setLoading(false);
    }
  };

  return <Wrapper>
    <Title>join 𝕏</Title>
    <Form onSubmit={onSubmit}>
      <Input name="name" placeholder="name" type="text" required value={name} onChange={onChange}/>
      <Input name="email" placeholder="email" type="email" required value={email} onChange={onChange}/>
      <Input name="password" placeholder="password" type="password" required value={password} onChange={onChange}/>
      <Input type="submit" value={isLoading ? "Loading" : "Create Account"} />
    </Form>
    <Error>{error}</Error>
  </Wrapper>
}