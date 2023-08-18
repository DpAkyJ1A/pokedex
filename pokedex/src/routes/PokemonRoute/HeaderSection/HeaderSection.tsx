import { Pokemon } from 'pokenode-ts';
import React from 'react';

interface IProps {
  pokemon: Pokemon;
}

export default function HeaderSection({ pokemon }: IProps) {
  return (
    <section className="pokemon-route-header">
      <h2 className="pokemon-route-header__name">
        {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
      </h2>
      <h2 className="pokemon-route-header__id">#{pokemon.id}</h2>
    </section>
  );
}
