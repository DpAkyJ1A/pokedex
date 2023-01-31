import React from 'react';
import PokemonCard, { IPokemonData } from 'components/PokemonCard/PokemonCard';

interface IListPokemonCard {
  pokemonDataArray: IPokemonData[];
}

export default function ListPokemonCard({ pokemonDataArray }: IListPokemonCard) {
  return (
    <div className="card-list">
      {pokemonDataArray.map((pokemonData: IPokemonData) => (
        <PokemonCard pokemonData={pokemonData} key={pokemonData.id} />
      ))}
    </div>
  );
}
