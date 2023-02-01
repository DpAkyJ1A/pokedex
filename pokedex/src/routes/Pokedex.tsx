import React, { useEffect, useMemo, useState } from 'react';
import { getListPokemon } from '../api/pokenode';
import ListPokemonCard from 'components/ListPokemonCard/ListPokemonCard';
import { NamedAPIResource } from 'pokenode-ts';
import Search from 'components/Search/Search';

export default function Pokedex() {
  const [pokemonIdArray, setPokemonIdArray] = useState([] as Array<number>);
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState('');
  const [searchedPokemonIdArray, setSearchedPokemonIdArray] = useState(pokemonIdArray);

  useMemo(() => {
    if (query === '') {
      setSearchedPokemonIdArray(pokemonIdArray);
    }
    if (isNaN(+query) !== true) {
      setSearchedPokemonIdArray([pokemonIdArray[+query]]);
    } else {
      setSearchedPokemonIdArray([]);
    }
  }, [pokemonIdArray, query]);

  useEffect(() => {
    if (fetching) {
      const newIdPack = [];
      for (let i = currentPage * limit + 1; i <= currentPage * limit + limit; i++) {
        newIdPack.push(i);
      }
      setPokemonIdArray([...pokemonIdArray, ...newIdPack]);
      setCurrentPage(currentPage + 1);
      setFetching(false);
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
      <ListPokemonCard idList={pokemonIdArray} />
    </>
  );
}
