import React from 'react';
import PokemonCard from 'components/PokemonCard/PokemonCard';
import { NamedAPIResource } from 'pokenode-ts';

interface IListPokemonCard {
  pokemonAPIResourseArray: NamedAPIResource[];
}

export default function ListPokemonCard({ pokemonAPIResourseArray }: IListPokemonCard) {
  return (
    <div className="card-list">
      {pokemonAPIResourseArray.map((pokemonAPIResourse: NamedAPIResource) => (
        <PokemonCard pokemonAPIResourse={pokemonAPIResourse} key={pokemonAPIResourse.name} />
      ))}
    </div>
  );
}
