import { GENES } from 'components/ListPokemonCard/ListPokemonCard';

export const getGeneration = (id: number) => {
  return GENES.find((generation) => {
    return generation.idOfFirstPokemon <= id && generation.idOfLastPokemon >= id;
  });
};
