import { GENES } from 'components/ListPokemonCard/ListPokemonCard';
import { useTypedDispatch, useTypedSelector } from 'hooks/redux';
import { TYPES } from 'interfacesAndData';
import React, { useState } from 'react';
import { pokedexSlice } from 'store/reducers/pokedexReducer';

export default function Search() {
  const { searchPokemons } = pokedexSlice.actions;
  const { searchQuery } = useTypedSelector((state) => state.pokedex);
  const dispatch = useTypedDispatch();

  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isInfoClosing, setIsInfoClosing] = useState(false);

  const show = () => {
    setIsInfoOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const hide = () => {
    setIsInfoClosing(true);
    document.body.style.overflow = 'unset';
    setTimeout(() => {
      setIsInfoOpen(false);
      setIsInfoClosing(false);
    }, 300);
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(searchPokemons(e.target.value))
          }
        />
        <span className="search-info" onClick={show}>
          ?
        </span>
      </div>
      <div
        className={`info-pop-up ${isInfoOpen ? 'open' : ''} ${isInfoClosing ? 'close' : ''}`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.currentTarget === e.target) hide();
        }}
      >
        <div className="info-pop-up-content">
          <h2>Pokémon search</h2>
          <p>
            This is a pretty powerful instrument, that allows user to create a filtered view of
            Pokémon.
          </p>
          <p>You can combine search with filter to satisfy most of your desires :)</p>
          <p>Case and spaces do not matter.</p>
          <h3>Search by name</h3>
          <p>Returns Pokémon whose name starts with query.</p>
          <h3>Search by id</h3>
          <p>Returns Pokémon whose id is equal to entered id.</p>
          <h3>Search by type</h3>
          <p>Returns Pokémon whose has the entered type.</p>
          <p>
            There are {TYPES.length} types: {TYPES.join(', ')}.
          </p>
          <h3>Search by generation</h3>
          <p>Returns all Pokémons from entered region.</p>
          <p>
            There are {GENES.length} generations: {GENES.map((gen) => gen.name).join(', ')}.
          </p>
          <h3>Combining search</h3>
          <p>Allows to search by a few feature at the same time.</p>
          <p>&quot;,&quot; symbol mean &quot;or&quot;</p>
          <p>&quot;&&quot; symbol mean &quot;and&quot;</p>
          <p>So query &quot;grass&johto&quot; returns 10 grass Pokémons from Johto region.</p>
          <p>And query &quot;cha&kanto,bl&normal&quot; returns Chansey and Blissey.</p>
        </div>
      </div>
    </>
  );
}
