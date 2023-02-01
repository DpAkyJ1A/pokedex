import React, { useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { getPokemonById } from 'api/pokenode';

export interface IPokemon {
  id: number;
  name: string;
  typeList: Array<string>;
}

interface IPokemonCardProps {
  pokemon: IPokemon;
}

export default function PokemonCard({ pokemon }: IPokemonCardProps) {
  const [pokemonData, setPokemonData] = useState(null as null | Pokemon);
  getPokemonById(pokemon.id).then((data) => setPokemonData(data));

  return (
    <div className="pokemon-card">
      <h4 className="pokemon-card__id">#{pokemon.id}</h4>
      {pokemonData ? (
        <img className="pokemon-card__img" src={pokemonData.sprites.front_default || undefined} />
      ) : (
        <div className="card-loader">
          <div className="circle"></div>
        </div>
      )}
      <h2 className="pokemon-card__name">{pokemon.name}</h2>
    </div>
  );
}
