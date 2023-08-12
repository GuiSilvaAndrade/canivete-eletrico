import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.scss'
import './styles/pages.scss'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//import HomePage from './pages/Default/HomePage';
import ErrorPage from './pages/Default/ErrorPage'

import HomePage from './pages/HomePage';
import PowerTriangle from './pages/CalculosBasicos/PowerTriangle';
import EquivalentResistance from './pages/CalculosBasicos/EquivalentResistance'
import EnergyConsumption from './pages/CalculosBasicos/EnergyConsumption';
import ActivePowerUnit from './pages/CalculosBasicos/ActivePowerUnit';
import LinearInterpolation from './pages/CalculosBasicos/LinearInterpolation'
import ResistanceCalc from './pages/CalculosBasicos/ResistanceCalc';
import VoltageCalc from './pages/CalculosBasicos/VoltageCalc';
import CurrentCalc from './pages/CalculosBasicos/CurrentCalc';
import PowerCalc from './pages/CalculosBasicos/PowerCalc';



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
        path: "/resistencia",
        element: <ResistanceCalc />
      },
      {
        path: "/tensao",
        element: <VoltageCalc />
      },
      {
        path: "/corrente",
        element: <CurrentCalc />
      },
      {
        path: "/potencia",
        element: <PowerCalc />
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
      },
      {
        path: "/interpolacao-linear",
        element: <LinearInterpolation />
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



