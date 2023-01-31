import React from 'react';

export interface IPokemonData {
  name: string;
  id: number;
  spriteUrl: string;
}

interface IPokemonCardProps {
  pokemonData: IPokemonData;
}

export default function PokemonCard({ pokemonData }: IPokemonCardProps) {
  return (
    <div className="pokemon-card">
      <h4 className="pokemon-card__id">#{pokemonData.id}</h4>
      <img className="pokemon-card__img" src={pokemonData.spriteUrl} />
      <h2 className="pokemon-card__name">
        {pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}
      </h2>
    </div>
  );
}
