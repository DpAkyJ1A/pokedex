import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import pokemons from 'json-pokemon';
import { arraysIntersection, searchPokemons } from 'hooks/useAdvancedSearch';
import { TYPES } from 'interfacesAndData';
import { filterPokemons } from 'hooks/useFilter';

interface IPokemon {
  id: number;
  name: string;
  typeList: Array<string>;
}

export interface IFilter {
  types: Array<boolean>;
}

export interface PokedexState {
  showedPokemonNumber: number;
  searchQuery: string;
  filter: IFilter;
  searchedPokemonArray: IPokemon[];
  filteredPokemonArray: IPokemon[];
  filteredAndSearchedPokemonArray: IPokemon[];
}

const query = localStorage.getItem('searchQuery') || '';
const filt = { types: Array.from({ length: TYPES.length }, () => false) };

const initialState = {
  showedPokemonNumber: 25,
  searchQuery: query,
  filter: filt,
  searchedPokemonArray: searchPokemons(pokemons, query),
  filteredPokemonArray: filterPokemons(pokemons, filt),
  filteredAndSearchedPokemonArray: filterPokemons(searchPokemons(pokemons, query), filt),
};

export const pokedexSlice = createSlice({
  name: 'pokedex',
  initialState,
  reducers: {
    loadMorePokemons(state) {
      state.showedPokemonNumber += 25;
    },
    resetShowedPokemonNumber(state) {
      state.showedPokemonNumber = initialState.showedPokemonNumber;
    },
    searchPokemons(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.searchedPokemonArray = searchPokemons(pokemons, action.payload);
      state.filteredAndSearchedPokemonArray = arraysIntersection(
        current(state.filteredPokemonArray),
        state.searchedPokemonArray
      );
    },
    filterPokemons(state, action: PayloadAction<IFilter>) {
      state.filter = action.payload;
      state.filteredPokemonArray = filterPokemons(pokemons, action.payload);
      state.filteredAndSearchedPokemonArray = arraysIntersection(
        state.filteredPokemonArray,
        current(state.searchedPokemonArray)
      );
    },
  },
});

export default pokedexSlice.reducer;

// export const pokedexReducer = (state = initialState, action: PokedexAction): PokedexState => {
//   switch (action.type) {
//     case PokedexActionTypes.LOAD_POKEMON_BATCH:
//       return {
//         showedPokemonNumber: state.showedPokemonNumber + 25,
//         searchQuery: state.searchQuery,
//         searchedPokemonArray: state.searchedPokemonArray,
//       };

//     case PokedexActionTypes.SEARCH_BY_QUERY:
//       return {
//         showedPokemonNumber: 25,
//         searchQuery: action.payload,
//         searchedPokemonArray: state.searchedPokemonArray,
//       };

//     default:
//       return state;
//   }
// };
