import React, { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { getPokemonById } from 'api/pokenode';
import TypeSvgGenerator from './TypeSvgGenerator';

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
  useEffect(() => {
    getPokemonById(pokemon.id).then((data) => {
      setPokemonData(data);
      console.log(data);
    });
  }, []);

  return (
    <div className="pokemon-card">
      <div className="wrapper">
        <h4 className="pokemon-card__id">#{pokemon.id}</h4>
        <div className="pokemon-card__types-wrapper">
          {pokemon.typeList.map((type) => (
            <TypeSvgGenerator type={type} key={type}></TypeSvgGenerator>
          ))}
        </div>
      </div>
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
