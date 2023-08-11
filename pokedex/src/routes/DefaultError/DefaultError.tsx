import React from 'react';
import { useRouteError } from 'react-router-dom';
import psyduck from 'assets/img/psyduck.png';
import { Link } from 'react-router-dom';

export default function DefaultError() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <div className="error-info">
        <h2>Page not found!</h2>
        <h3>
          You can return to <Link to={'/'}>Pokedex</Link>
        </h3>
      </div>
      <img src={psyduck} alt="confused pokemon" />
    </div>
  );
}
