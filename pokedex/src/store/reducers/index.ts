import { combineReducers } from 'redux';
import pokedexReducer from './pokedexReducer';

export const rootReducer = combineReducers({
  pokedex: pokedexReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
