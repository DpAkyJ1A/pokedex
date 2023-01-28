import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
// import './Root.scss';

export default function Root() {
  const headerTabs = [
    {
      name: 'Pokedex',
      url: '/',
    },
    {
      name: 'About',
      url: 'about',
    },
  ];

  return (
    <>
      <header id="header">
        <nav>
          <ul>
            {headerTabs.map((tab) => (
              <li key={tab.name}>
                <NavLink
                  to={tab.url}
                  className={({ isActive, isPending }) =>
                    isActive ? 'active' : isPending ? 'pending' : ''
                  }
                >
                  {tab.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main">
        <Outlet />
      </main>
    </>
  );
}
