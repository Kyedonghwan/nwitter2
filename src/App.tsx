import React, { useState } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';
import reset from 'styled-reset';
import Layout from './components/layout';
import CreateAccount from './routes/create-account';
import Home from './routes/Home';
import Login from './routes/login';
import Profile from './routes/Profile';

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      }
    ]
  },
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/createaccount",
    element: <CreateAccount />,
  }
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  body {
    background-color: black;
    color: white;
    font-family: -apple-system
  }
`


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  )
}

export default App
