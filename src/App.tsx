import React, { useEffect, useState } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { RouterProvider } from '../node_modules/react-router-dom/dist/index';
import reset from 'styled-reset';
import Layout from './components/layout';
import CreateAccount from './routes/create-account';
import Home from './routes/Home';
import Login from './routes/login';
import Profile from './routes/Profile';
import LoadingScreen from './components/loading-screen';
import { auth } from './firebase';
import styled from 'styled-components';
import ProtectedRoute from './components/protected-route';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute>
          <Home />
        </ProtectedRoute>,
      },
      {
        path: "/profile",
        element: <ProtectedRoute>
          <Profile />
        </ProtectedRoute>,
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
  const [isLoading, setLoading] = useState(true);
  const init = async() => {
    //wait for firebase
    await auth.authStateReady();
    setLoading(false);
  }

  useEffect(() => {
    init();
  },[]);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  )
}

export default App
