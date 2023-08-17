import { PokemonClient, NamedAPIResourceList, Pokemon, EvolutionClient } from 'pokenode-ts';

const pokemonApi = new PokemonClient();
const evolutionApi = new EvolutionClient();

export async function getListPokemon(offset = 0, limit = 20): Promise<NamedAPIResourceList> {
  return await pokemonApi.listPokemons(offset, limit);
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  return await pokemonApi.getPokemonById(id);
}

export async function getPokemonByName(name: string): Promise<Pokemon> {
  return await pokemonApi.getPokemonByName(name);
}

export async function getEvolutionChainByPokemonId(id: number) {
  const pokemonSpecies = await getPokemonSpeciesById(id);

  const url = pokemonSpecies.evolution_chain.url;
  const regex = /(\d+)\/$/;
  const match = url.match(regex);

  const evolutionId: number | null = match && +match[1];

  if (!evolutionId) return new Error('Evolution ID is null');

  return await getEvolutionChainById(evolutionId);
}

export async function getPokemonSpeciesById(id: number) {
  return await pokemonApi.getPokemonSpeciesById(id);
}

export async function getEvolutionChainById(id: number) {
  return await evolutionApi.getEvolutionChainById(id);
}
