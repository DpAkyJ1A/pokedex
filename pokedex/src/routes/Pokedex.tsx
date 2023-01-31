import React, { useEffect, useMemo, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { getListPokemon } from '../api/pokenode';
import ListPokemonCard from 'components/ListPokemonCard/ListPokemonCard';
import { NamedAPIResource } from 'pokenode-ts';
import Search from 'components/Search/Search';

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
  const [query, setQuery] = useState('');
  const [searchedPokemonAPIResourseArray, setSearchedPokemonAPIResourseArray] =
    useState(pokemonAPIResourseArray);

  useMemo(() => {
    setSearchedPokemonAPIResourseArray(
      pokemonAPIResourseArray.filter((pokemonAPIResourse) =>
        pokemonAPIResourse.name.startsWith(query.toLowerCase())
      )
    );
  }, [pokemonAPIResourseArray, query]);

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
      <Search query={query} setQuery={setQuery} />
      <ListPokemonCard pokemonAPIResourseArray={searchedPokemonAPIResourseArray} />
    </>
  );
}
