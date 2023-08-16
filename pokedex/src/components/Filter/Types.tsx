import TypeSvgGenerator from 'components/PokemonCard/TypeSvgGenerator';
import { useTypedDispatch, useTypedSelector } from 'hooks/redux';
import { TYPES } from 'interfacesAndData';
import React from 'react';
import { pokedexSlice } from 'store/reducers/pokedexReducer';

export default function Types() {
  const { filterPokemons } = pokedexSlice.actions;
  const { filter } = useTypedSelector((state) => state.pokedex);
  const dispatch = useTypedDispatch();

  return (
    <div className="filter-types">
      <h3>Types</h3>
      <div className="filter-types-list">
        {TYPES.map((type, i) => (
          <span
            onClick={() => {
              const copyArr = filter.types.slice();
              copyArr[i] = !copyArr[i];
              dispatch(filterPokemons({ types: copyArr, genes: filter.genes }));
            }}
            className={`filter-types-list-element ${filter.types[i] ? 'active' : 'inactive'}`}
            key={`${type}-type-filter`}
          >
            {TypeSvgGenerator({ type })}
            <label>{type}</label>
          </span>
        ))}
      </div>
    </div>
  );
}
