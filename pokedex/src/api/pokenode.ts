import { PokemonClient, NamedAPIResourceList, Pokemon } from 'pokenode-ts';

const api = new PokemonClient();

export async function getListPokemon(offset = 0, limit = 20): Promise<NamedAPIResourceList> {
  return await api.listPokemons(offset, limit);
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  return await api.getPokemonById(id);
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  return await api.getPokemonByName(name);
}
