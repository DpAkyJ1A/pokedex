import React, { useEffect, useState } from 'react';
import ListPokemonCard from 'components/ListPokemonCard/ListPokemonCard';
import Search from 'components/Search/Search';
import pokemons from 'json-pokemon';
import { useAdvancedSearch } from 'hooks/useAdvancedSearch';
import { useTypedDispatch, useTypedSelector } from 'hooks/redux';
import { pokedexSlice } from 'store/reducers/pokedexReducer';
import Filter from 'components/Filter/Filter';

export default function Pokedex() {
  const { loadMorePokemons, resetShowedPokemonNumber } = pokedexSlice.actions;
  const { showedPokemonNumber, searchQuery, filteredAndSearchedPokemonArray } = useTypedSelector(
    (state) => state.pokedex
  );
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(resetShowedPokemonNumber());
  }, [filteredAndSearchedPokemonArray]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return function () {
      document.removeEventListener('scroll', scrollHandler);
    };
  });

  useEffect(() => {
    scrollHandler(new Event('scroll'));
  }, []);

  const scrollHandler = (e: Event) => {
    if (document.body.scrollHeight - (window.scrollY + window.innerHeight) < 300) {
      dispatch(loadMorePokemons());
    }
  };

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  return (
    <>
      <h2>Total found: {filteredAndSearchedPokemonArray.length}</h2>
      <Search />
      <Filter />
      <ListPokemonCard />
    </>
  );
}
