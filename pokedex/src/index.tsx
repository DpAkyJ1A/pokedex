import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from 'routes/Root/Root';
import DefaultError from 'routes/DefaultError/DefaultError';
import Pokedex, { loader as pokemonListLoader } from 'routes/Pokedex';
import About from 'routes/About';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <DefaultError />,
    children: [
      {
        errorElement: <DefaultError />,
        children: [
          {
            index: true,
            element: <Pokedex />,
            loader: pokemonListLoader,
          },
          {
            path: 'about',
            element: <About />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
