import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import './styles/pages.scss'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/Default/HomePage';
import ErrorPage from './pages/Default/ErrorPage'

import TrianguloDePotencias from './pages/CalculosBasicos/TrianguloDePotencias';
import LeiDeOhm from './pages/CalculosBasicos/LeiDeOhm';
import ResistenciaEquivalente from './pages/CalculosBasicos/ResistenciaEquivalente'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/triangulo-de-potencias",
        element: <TrianguloDePotencias />
      },
      {
        path: "/lei-de-ohm",
        element: <LeiDeOhm />
      },
      {
        path: "/resistencia-equivalente",
        element: <ResistenciaEquivalente />
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



