import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getListPokemon, getPokemonByName } from '../api/pokenode';
import { IPokemonData } from 'components/PokemonCard/PokemonCard';
import ListPokemonCard from 'components/ListPokemonCard/ListPokemonCard';
import { NamedAPIResource } from 'pokenode-ts';

export async function loader() {
  const listPokemon = await getListPokemon(0, 20);
  return listPokemon.results;
}

export default function Pokedex() {
  const [pokemonAPIResourseArray, setPokemonAPIResourseArray] = useState(
    useLoaderData() as NamedAPIResource[]
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (fetching) {
      getListPokemon(currentPage * limit, limit)
        .then((response) => {
          setPokemonAPIResourseArray([...pokemonAPIResourseArray, ...response.results]);
          setCurrentPage((prev) => prev + 1);
        })
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
      <ListPokemonCard pokemonAPIResourseArray={pokemonAPIResourseArray} />
    </>
  );
}
