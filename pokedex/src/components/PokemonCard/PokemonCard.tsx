import React, { useState, useEffect } from 'react';
import { NamedAPIResource } from 'pokenode-ts';
import { getPokemonByName } from 'api/pokenode';

export interface IPokemonData {
  name: string;
  id: number;
  spriteUrl: string;
}

interface IPokemonCardProps {
  pokemonAPIResourse: NamedAPIResource;
}

async function getDataFromNamedAPIResourse(pokemonAPIResourse: NamedAPIResource) {
  const name = pokemonAPIResourse.name;
  const restData = await getPokemonByName(name);
  const id = restData.id;
  const spriteUrl = restData.sprites.front_default;
  return { name, id, spriteUrl } as IPokemonData;
}

export default function PokemonCard({ pokemonAPIResourse }: IPokemonCardProps) {
  const [pokemonData, setPokemonData] = useState(null as null | IPokemonData);
  getDataFromNamedAPIResourse(pokemonAPIResourse).then((data) => setPokemonData(data));

  return (
    <div className="pokemon-card">
      {pokemonData ? (
        <>
          <h4 className="pokemon-card__id">#{pokemonData.id}</h4>
          <img className="pokemon-card__img" src={pokemonData.spriteUrl} />
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
