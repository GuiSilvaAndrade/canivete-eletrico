import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import './styles/pages.scss'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from './pages/Default/HomePage';
import ErrorPage from './pages/Default/ErrorPage'

import PowerTriangle from './pages/CalculosBasicos/PowerTriangle';
import OhmsLaw from './pages/CalculosBasicos/OhmsLaw';
import EquivalentResistance from './pages/CalculosBasicos/EquivalentResistance'
import EnergyConsumption from './pages/CalculosBasicos/EnergyConsumption';
import ActivePowerUnit from './pages/CalculosBasicos/ActivePowerUnit';



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
        element: <PowerTriangle />
      },
      {
        path: "/lei-de-ohm",
        element: <OhmsLaw />
      },
      {
        path: "/resistencia-equivalente",
        element: <EquivalentResistance />
      },
      {
        path: "/consumo-de-energia",
        element: <EnergyConsumption />
      },
      {
        path: "/unidade-de-potencia-ativa",
        element: <ActivePowerUnit />
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



