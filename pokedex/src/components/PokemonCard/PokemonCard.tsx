import React, { useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { getPokemonById } from 'api/pokenode';

interface IPokemonCardProps {
  id: number;
}

export default function PokemonCard({ id }: IPokemonCardProps) {
  const [pokemonData, setPokemonData] = useState(null as null | Pokemon);
  getPokemonById(id).then((data) => setPokemonData(data));

  return (
    <div className="pokemon-card">
      <h4 className="pokemon-card__id">#{id}</h4>
      {pokemonData ? (
        <>
          <img className="pokemon-card__img" src={pokemonData.sprites.front_default || undefined} />
          <h2 className="pokemon-card__name">
            {pokemonData.name[0].toUpperCase() + pokemonData.name.slice(1)}
          </h2>
        </>
      ) : (
        <div className="card-loader">
          <div className="circle"></div>
        </div>
      )}
    </div>
  );
}
