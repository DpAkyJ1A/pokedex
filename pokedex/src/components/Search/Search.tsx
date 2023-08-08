import { useTypedDispatch, useTypedSelector } from 'hooks/redux';
import React from 'react';
import { pokedexSlice } from 'store/reducers/pokedexReducer';

export default function Search() {
  const { searchPokemons } = pokedexSlice.actions;
  const { searchQuery } = useTypedSelector((state) => state.pokedex);
  const dispatch = useTypedDispatch();

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(searchPokemons(e.target.value))
        }
      />
    </div>
  );
}
