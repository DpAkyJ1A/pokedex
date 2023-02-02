import React from 'react';
import PokemonCard, { IPokemon } from 'components/PokemonCard/PokemonCard';

interface IListPokemonCard {
  pokemons: IPokemon[];
}

export default function ListPokemonCard({ pokemons }: IListPokemonCard) {
  if (pokemons.length === 0) return <h2 style={{ fontSize: '7rem' }}>{'¯\\_(ツ)_/¯'}</h2>;
  return (
    <div className="card-list">
      {pokemons.map((pokemon: IPokemon) => (
        <PokemonCard pokemon={pokemon} key={pokemon.id} />
      ))}
    </div>
  );
}
