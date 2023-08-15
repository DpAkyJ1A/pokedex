import React from 'react';

import kanto from 'assets/img/gold_kanto_medal.png';
import johto from 'assets/img/gold_johto_medal.png';
import hoenn from 'assets/img/gold_hoenn_medal.png';
import sinnoh from 'assets/img/gold_sinnoh_medal.png';
import unova from 'assets/img/gold_unova_medal.png';
import kalos from 'assets/img/gold_kalos_medal.png';
import alola from 'assets/img/gold_alola_medal.png';
import galar from 'assets/img/gold_galar_medal.png';
import hisui from 'assets/img/gold_hisui_medal.png';

import { GENES } from 'components/ListPokemonCard/ListPokemonCard';
import { pokedexSlice } from 'store/reducers/pokedexReducer';
import { useTypedDispatch, useTypedSelector } from 'hooks/redux';

const generationMedals = [kanto, johto, hoenn, sinnoh, unova, kalos, alola, galar, hisui];

export default function Generations() {
  const { filterPokemons } = pokedexSlice.actions;
  const { filter } = useTypedSelector((state) => state.pokedex);
  const dispatch = useTypedDispatch();

  return (
    <div className="filter-genes">
      <h3>Generations</h3>
      <div className="filter-genes-list">
        {GENES.map((gen, i) => (
          <span
            onClick={() => {
              const copyArr = filter.genes.slice();
              copyArr[i] = !copyArr[i];
              dispatch(filterPokemons({ types: filter.types, genes: copyArr }));
            }}
            className={`filter-genes-list-element ${filter.genes[i] ? 'active' : 'inactive'}`}
            key={`${i}-gen-filter`}
          >
            <img src={generationMedals[i]} alt={`${GENES[i].name} gold medal`} />
            <label>{GENES[i].name}</label>
          </span>
        ))}
      </div>
    </div>
  );
}
