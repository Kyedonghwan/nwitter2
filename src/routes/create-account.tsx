import React, { useState } from "react";
import styled from 'styled-components';

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
  const [error, getError] = useState(false);

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

  const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {

    } catch(e) {
    } finally {
      setLoading(false);
    }
  };

  return <Wrapper>
    <Title>Log into 𝕏</Title>
    <Form onSubmit={onSubmit}>
      <Input name="name" placeholder="name" type="text" required value={name} onChange={onChange}/>
      <Input name="email" placeholder="email" type="email" required value={email} onChange={onChange}/>
      <Input name="password" placeholder="password" type="password" required value={password} onChange={onChange}/>
      <Input type="submit" value={isLoading ? "Loading" : "Create Account"} />
    </Form>
    {error !== "" ? <Error>Error</Error> : null}
  </Wrapper>
}