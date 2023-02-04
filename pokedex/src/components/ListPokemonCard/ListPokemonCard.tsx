import React, { useEffect, useState } from 'react';
import PokemonCard, { IPokemon } from 'components/PokemonCard/PokemonCard';

export interface IGene {
  romanNum: string;
  name: string;
  idOfFirstPokemon: number;
  idOfLastPokemon: number;
  pokemons: IPokemon[] | null;
}

interface IListPokemonCard {
  pokemons: IPokemon[];
}

export default function ListPokemonCard({ pokemons }: IListPokemonCard) {
  const [GENES] = useState([
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
  ] as IGene[]);

  useEffect(() => {
    for (let i = 0; i < GENES.length; i++) {
      GENES[i].pokemons = pokemons.filter((pokemon: IPokemon) => {
        return pokemon.id >= GENES[i].idOfFirstPokemon && pokemon.id <= GENES[i].idOfLastPokemon;
      });
      if (GENES[i].pokemons?.length === 0) GENES[i].pokemons = null;
    }
  }, [pokemons]);

  if (pokemons.length === 0) return <h2 style={{ fontSize: '7rem' }}>{'¯\\_(ツ)_/¯'}</h2>;
  return (
    <div className="card-list">
      {GENES.map((GEN: IGene) =>
        GEN.pokemons ? (
          <div className="gen" key={GEN.name}>
            <div className="gen__title">
              <h2>{GEN.romanNum}</h2>
              <h3>{GEN.name}</h3>
              <h5 style={{ marginLeft: '1rem' }}>Found: {GEN.pokemons.length}</h5>
            </div>
            <div className="gen__cards-wrapper">
              {GEN.pokemons?.map((pokemon: IPokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.id} />
              ))}
            </div>
          </div>
        ) : (
          <></>
        )
      )}
    </div>
  );
}
