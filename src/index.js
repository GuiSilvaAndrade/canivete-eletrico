import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import PowerTriangle from './pages/PowerTriangle';
import ErrorPage from './pages/ErrorPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/triangulo-de-potencias",
        element: <PowerTriangle />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



