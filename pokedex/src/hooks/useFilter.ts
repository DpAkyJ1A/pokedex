import { IPokemon } from 'components/PokemonCard/PokemonCard';
import { useMemo } from 'react';
import { IFilter } from 'store/reducers/pokedexReducer';
import { TYPES } from 'interfacesAndData';
import { getGeneration } from 'utils/getGeneration';
import { GENES } from 'components/ListPokemonCard/ListPokemonCard';

export const useFilterPokemons = (pokemons: IPokemon[], filter: IFilter) => {
  const filteredPokemons = useMemo(() => {
    return filterPokemons(pokemons, filter);
  }, [filter]);

  return filteredPokemons;
};

// return pokemon[] with at least one filtered type
// export const filterPokemons = (pokemons: IPokemon[], filter: IFilter) => {
//   if (!filter.types.includes(true)) return pokemons;

//   const filteredPokemons = pokemons.filter((pokemon) => {
//     return filter.types.some((typeBool, i) => {
//       return typeBool && pokemon.typeList.includes(TYPES[i]);
//     });
//   });

//   return filteredPokemons;
// };

// return pokemon[] with all filtered types
export const filterPokemons = (pokemons: IPokemon[], filter: IFilter) => {
  const filteredByTypePokemons = filterByType(pokemons, filter);
  const filteredByGenerationPokemons = filterByGeneration(filteredByTypePokemons, filter);
  return filteredByGenerationPokemons;
};

const filterByType = (pokemons: IPokemon[], filter: IFilter) => {
  if (!filter.types.includes(true)) return pokemons;

  let filteredPokemons = pokemons.slice() as IPokemon[];

  filter.types.map((typeBool, i) => {
    if (typeBool) {
      filteredPokemons = filteredPokemons.filter((pokemon) => pokemon.typeList.includes(TYPES[i]));
    }
  });

  return filteredPokemons;
};

const filterByGeneration = (pokemons: IPokemon[], filter: IFilter) => {
  if (!filter.genes.includes(true)) return pokemons;

  let filteredPokemons = pokemons.slice() as IPokemon[];

  filter.genes.map((genBool, i) => {
    if (genBool) {
      filteredPokemons = filteredPokemons.filter(
        (pokemon) => getGeneration(pokemon.id) === GENES[i]
      );
    }
  });

  return filteredPokemons;
};
