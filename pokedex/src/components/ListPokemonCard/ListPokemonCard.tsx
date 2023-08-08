import React, { useEffect, useState } from 'react';
import PokemonCard, { IPokemon } from 'components/PokemonCard/PokemonCard';
import { useTypedSelector } from 'hooks/redux';

export interface IGene {
  romanNum: string;
  name: string;
  idOfFirstPokemon: number;
  idOfLastPokemon: number;
  pokemons: IPokemon[] | null;
}

export const GENES: IGene[] = [
  {
    romanNum: 'I',
    name: 'Kanto',
    idOfFirstPokemon: 1,
    idOfLastPokemon: 151,
    pokemons: null,
  },
  {
    romanNum: 'II',
    name: 'Johto',
    idOfFirstPokemon: 152,
    idOfLastPokemon: 251,
    pokemons: null,
  },
  {
    romanNum: 'III',
    name: 'Hoenn',
    idOfFirstPokemon: 252,
    idOfLastPokemon: 386,
    pokemons: null,
  },
  {
    romanNum: 'IV',
    name: 'Sinnoh',
    idOfFirstPokemon: 387,
    idOfLastPokemon: 493,
    pokemons: null,
  },
  {
    romanNum: 'V',
    name: 'Unova',
    idOfFirstPokemon: 494,
    idOfLastPokemon: 649,
    pokemons: null,
  },
  {
    romanNum: 'VI',
    name: 'Kalos',
    idOfFirstPokemon: 650,
    idOfLastPokemon: 721,
    pokemons: null,
  },
  {
    romanNum: 'VII',
    name: 'Alola',
    idOfFirstPokemon: 722,
    idOfLastPokemon: 809,
    pokemons: null,
  },
  {
    romanNum: 'VIII',
    name: 'Galar',
    idOfFirstPokemon: 810,
    idOfLastPokemon: 905,
    pokemons: null,
  },
  {
    romanNum: 'IX',
    name: 'Paldea',
    idOfFirstPokemon: 906,
    idOfLastPokemon: 1008,
    pokemons: null,
  },
];

export default function ListPokemonCard() {
  const { filteredAndSearchedPokemonArray, showedPokemonNumber } = useTypedSelector(
    (state) => state.pokedex
  );

  const [genes, setGenes] = useState(GENES as IGene[]);

  let cardCounter = 0;

  useEffect(() => {
    const genesCopy = JSON.parse(JSON.stringify(genes));
    for (let i = 0; i < genesCopy.length; i++) {
      genesCopy[i].pokemons = filteredAndSearchedPokemonArray.filter((pokemon: IPokemon) => {
        return (
          pokemon.id >= genesCopy[i].idOfFirstPokemon && pokemon.id <= genesCopy[i].idOfLastPokemon
        );
      });
      if (genesCopy[i].pokemons?.length === 0) genesCopy[i].pokemons = null;
    }
    setGenes(genesCopy);
  }, [filteredAndSearchedPokemonArray, showedPokemonNumber]);

  if (filteredAndSearchedPokemonArray.length === 0)
    return <h2 style={{ fontSize: '7rem' }}>{'¯\\_(ツ)_/¯'}</h2>;

  return (
    <div className="card-list">
      {genes.map(
        (gen: IGene) =>
          gen.pokemons &&
          cardCounter <= showedPokemonNumber && (
            <div className="gen" key={gen.name}>
              <div className="gen__title">
                <h2>{gen.romanNum}</h2>
                <h3>{gen.name}</h3>
                <h5 style={{ marginLeft: '1rem' }}>Found: {gen.pokemons.length}</h5>
              </div>
              <div className="gen__cards-wrapper">
                {gen.pokemons?.map(
                  (pokemon: IPokemon) =>
                    ++cardCounter <= showedPokemonNumber && (
                      <PokemonCard pokemon={pokemon} key={pokemon.id} />
                    )
                )}
              </div>
            </div>
          )
      )}
    </div>
  );
}
