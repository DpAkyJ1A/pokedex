import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from 'routes/Root/Root';
import DefaultError from 'routes/DefaultError/DefaultError';
import Pokedex from 'routes/Pokedex';
import About from 'routes/About';
import { Provider } from 'react-redux';
import { setupStore } from 'store';

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

const store = setupStore();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
