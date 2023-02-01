import React from 'react';
import PokemonCard, { IPokemon } from 'components/PokemonCard/PokemonCard';

interface IListPokemonCard {
  pokemons: IPokemon[];
}

export default function ListPokemonCard({ pokemons }: IListPokemonCard) {
  return (
    <div className="card-list">
      {pokemons.map((pokemon: IPokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}
