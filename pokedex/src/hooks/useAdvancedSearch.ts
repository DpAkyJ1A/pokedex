import { useMemo } from 'react';
import { IPokemon } from 'components/PokemonCard/PokemonCard';

const AND = '&&';
const OR = '||';

const TYPES = [
  'normal',
  'fire',
  'water',
  'grass',
  'flying',
  'fighting',
  'poison',
  'electric',
  'ground',
  'rock',
  'psychic',
  'ice',
  'bug',
  'ghost',
  'steel',
  'dragon',
  'dark',
  'fairy',
];

export const useAdvancedSearch = (pokemons: IPokemon[], query: string) => {
  const searchedPokemons = useMemo(() => {
    let searchedPokemons: IPokemon[] = [];
    const queryStack: Array<string> = query.replace('/ +/g', ' ').trim().toLowerCase().split(' ');

    if (!isValid(queryStack)) return [];

    deleteLastQueryIfUnnecessary(queryStack);
    searchedPokemons = search(pokemons, queryStack[0]);

    for (let i = 1; i < queryStack.length; i += 2) {
      const firstQuery = searchedPokemons;
      const secondQuery = search(pokemons, queryStack[i + 1]);

      if (queryStack[i] === AND) {
        searchedPokemons = arraysIntersection(firstQuery, secondQuery);
      } else if (queryStack[i] === OR) {
        searchedPokemons = arraysUnion(firstQuery, secondQuery);
      }
    }

    return searchedPokemons;
  }, [query]);

  return searchedPokemons;
};

const arraysUnion = (arr1: IPokemon[], arr2: IPokemon[]) => {
  return [...new Set([...arr1, ...arr2])].sort((a, b) => a.id - b.id);
};

const arraysIntersection = (arr1: IPokemon[], arr2: IPokemon[]) => {
  return arr1.filter((x) => arr2.includes(x));
};

const deleteLastQueryIfUnnecessary = (queryStack: Array<string>) => {
  if (queryStack.length % 2 === 0 && queryStack.length > 1) {
    queryStack.pop();
  }
};

const isValid = (queryStack: Array<string>) => {
  // example of correct query:
  // char && 4 && fire || water

  for (let i = 0; i < queryStack.length; i++) {
    if (i % 2 === 0) {
      if (queryStack[i] === AND || queryStack[i] === OR) {
        return false;
      }
    } else {
      if (queryStack[i] !== AND && queryStack[i] !== OR) {
        return false;
      }
    }
  }
  return true;
};

const search = (pokemons: IPokemon[], query: string) => {
  const isNumber = !isNaN(+query);

  if (isNumber && query) {
    return searchById(pokemons, query);
  } else if (TYPES.includes(query)) {
    return searchByType(pokemons, query);
  } else {
    return searchByName(pokemons, query);
  }
};

const searchByType = (pokemons: IPokemon[], query: string) => {
  return pokemons.filter((pokemon: IPokemon) => {
    return pokemon.typeList.some((type) => {
      return type.toLowerCase() === query;
    });
  });
};

const searchById = (pokemons: IPokemon[], query: string) => {
  return pokemons.filter((pokemon: IPokemon) => {
    return pokemon.id === +query;
  });
};

const searchByName = (pokemons: IPokemon[], query: string) => {
  return pokemons.filter((pokemon: IPokemon) => {
    return pokemon.name.toLowerCase().startsWith(query);
  });
};
