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
  const [shiny, setShiny] = useState(false);

  useEffect(() => {
    getPokemonById(pokemon.id).then((data) => {
      setPokemonData(data);
    });
  }, []);

  // function shinyPicToggle(e: React.MouseEvent<HTMLButtonElement>) {
  //   const target = e.currentTarget as HTMLButtonElement;
  //   target.classList.toggle('active');
  // }

  return (
    <div className={`pokemon-card ${shiny ? 'active' : ''}`}>
      <div className="wrapper">
        <h4 className="pokemon-card__id">#{pokemon.id}</h4>
        <div className="pokemon-card__types-wrapper">
          {pokemon.typeList.map((type) => (
            <TypeSvgGenerator type={type} key={type}></TypeSvgGenerator>
          ))}
        </div>
      </div>
      {pokemonData ? (
        <div className="pokemon-card__img">
          <img className="img" src={pokemonData.sprites.front_default || undefined} />
          <img
            className={`img img_shiny ${shiny ? '' : 'disabled'}`}
            src={pokemonData.sprites.front_shiny || undefined}
          />
        </div>
      ) : (
        <div className="card-loader">
          <div className="circle"></div>
        </div>
      )}
      <h2 className={`pokemon-card__name ${shiny ? 'active' : ''}`}>{pokemon.name}</h2>
      <button
        className={`pokemon-card__shiny-toggle ${shiny ? 'active' : ''}`}
        onClick={() => setShiny(!shiny)}
      >
        <span className="sparkle-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M259.92 262.91L216.4 149.77a9 9 0 00-16.8 0l-43.52 113.14a9 9 0 01-5.17 5.17L37.77 311.6a9 9 0 000 16.8l113.14 43.52a9 9 0 015.17 5.17l43.52 113.14a9 9 0 0016.8 0l43.52-113.14a9 9 0 015.17-5.17l113.14-43.52a9 9 0 000-16.8l-113.14-43.52a9 9 0 01-5.17-5.17zM108 68L88 16 68 68 16 88l52 20 20 52 20-52 52-20-52-20zM426.67 117.33L400 48l-26.67 69.33L304 144l69.33 26.67L400 240l26.67-69.33L496 144l-69.33-26.67z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}
