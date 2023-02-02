import React, { useEffect, useState } from 'react';
import ListPokemonCard from 'components/ListPokemonCard/ListPokemonCard';
import Search from 'components/Search/Search';
import pokemons from 'json-pokemon';
import { useAdvancedSearch } from 'hooks/useAdvancedSearch';

export default function Pokedex() {
  const [showedPokemonNumber, setShowedPokemonNumber] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [query, setQuery] = useState('');
  const searchedPokemonArray = useAdvancedSearch(pokemons, query);

  useEffect(() => {
    setShowedPokemonNumber(25);
  }, [searchedPokemonArray]);

  useEffect(() => {
    if (fetching) {
      setShowedPokemonNumber(showedPokemonNumber + 25);
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
      <h2>Total found: {searchedPokemonArray.length}</h2>
      <ListPokemonCard pokemons={searchedPokemonArray.slice(0, showedPokemonNumber)} />
    </>
  );
}
