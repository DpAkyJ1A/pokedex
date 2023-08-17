import React from 'react';

import legendary from 'assets/img/mewtwo.png';
import mythical from 'assets/img/mew.png';
import baby from 'assets/img/pichu.png';

import { pokedexSlice } from 'store/reducers/pokedexReducer';
import { useTypedDispatch, useTypedSelector } from 'hooks/redux';

export default function Generations() {
  const { filterPokemons } = pokedexSlice.actions;
  const { filter } = useTypedSelector((state) => state.pokedex);
  const dispatch = useTypedDispatch();

  return (
    <div className="filter-features">
      <h3>Features</h3>
      <div className="filter-features-list">
        <span
          onClick={() =>
            dispatch(
              filterPokemons({
                types: filter.types,
                genes: filter.genes,
                legendary: !filter.legendary,
                mythical: filter.mythical,
                baby: filter.baby,
              })
            )
          }
          className={`filter-features-list-element ${filter.legendary ? 'active' : 'inactive'}`}
        >
          <img src={legendary} alt={`Legendary icon`} />
          <label>Legendary</label>
        </span>
        <span
          onClick={() =>
            dispatch(
              filterPokemons({
                types: filter.types,
                genes: filter.genes,
                legendary: filter.legendary,
                mythical: !filter.mythical,
                baby: filter.baby,
              })
            )
          }
          className={`filter-features-list-element ${filter.mythical ? 'active' : 'inactive'}`}
        >
          <img src={mythical} alt={`Mythical icon`} />
          <label>Mythical</label>
        </span>
        <span
          onClick={() =>
            dispatch(
              filterPokemons({
                types: filter.types,
                genes: filter.genes,
                legendary: filter.legendary,
                mythical: filter.mythical,
                baby: !filter.baby,
              })
            )
          }
          className={`filter-features-list-element ${filter.baby ? 'active' : 'inactive'}`}
        >
          <img src={baby} alt={`Baby icon`} />
          <label>Baby</label>
        </span>
      </div>
    </div>
  );
}
