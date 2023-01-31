import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getListPokemon, getPokemonByName } from '../api/pokenode';
import { IPokemonData } from 'components/PokemonCard/PokemonCard';
import ListPokemonCard from 'components/ListPokemonCard/ListPokemonCard';
import { NamedAPIResourceList } from 'pokenode-ts';

export async function loader() {
  const listPokemon = await getListPokemon(0, 20);
  return getDataFromPokemonList(listPokemon);
}

async function getDataFromPokemonList(listPokemon: NamedAPIResourceList) {
  const pokemonDataArray = [] as IPokemonData[];
  for (let i = 0; i < listPokemon.results.length; i++) {
    const name = listPokemon.results[i].name;
    const restData = await getPokemonByName(name);
    const id = restData.id;
    const spriteUrl = restData.sprites.front_default;
    pokemonDataArray.push({ name, id, spriteUrl } as IPokemonData);
  }

  return pokemonDataArray;
}

export default function Pokedex() {
  const [pokemonDataArray, setPokemonDataArray] = useState(useLoaderData() as IPokemonData[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching) {
      getListPokemon(currentPage * limit, limit)
        .then((response) =>
          getDataFromPokemonList(response).then((response) => {
            setPokemonDataArray([...pokemonDataArray, ...response]);
            setCurrentPage((prev) => prev + 1);
          })
        )
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  const scrollHandler = (e: Event) => {
    if (document.body.scrollHeight - (window.scrollY + window.innerHeight) < 100) {
      setFetching(true);
    }
  };

  return (
    <>
      <ListPokemonCard pokemonDataArray={pokemonDataArray} />
    </>
  );
}
