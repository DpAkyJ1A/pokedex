import { getEvolutionChainByPokemonId, getPokemonById } from 'api/pokenode';
import React, { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { useParams } from 'react-router-dom';
import PokeballLoader from 'components/PokeballLoader/PokeballLoader';
import DefaultError from 'routes/DefaultError/DefaultError';
import EvolutionSection from './EvolutionSection/EvolutionSection';
import HeaderSection from './HeaderSection/HeaderSection';
import SpritesSection from './SpritesSection/SpritesSection';
import StatsSection from './StatsSection/StatsSection';
import BaseInfo from './BaseInfo/BaseInfo';

export default function PokemonRoute() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pokemon, setPokemon] = useState(undefined as Pokemon | undefined);

  const [isShiny, setIsShiny] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (params.id) {
        try {
          const id = +params.id;
          const pok = await getPokemonById(id);
          setIsLoading(false);
          setPokemon(pok);
          setIsShiny(
            localStorage.getItem(`${pok.name[0].toUpperCase() + pok.name.slice(1)} shiny`) ===
              'true'
          );
          const evo = await getEvolutionChainByPokemonId(pok.id);
        } catch {
          setIsLoading(false);
          setIsError(true);
        }
      }
    };
    load();
  }, [params]);

  if (isLoading) {
    return (
      <div className="pokemon-route-loader">
        <PokeballLoader />
      </div>
    );
  }

  if (!isError && pokemon) {
    return (
      <div className="pokemon-route">
        <HeaderSection pokemon={pokemon} />
        <SpritesSection
          pokemon={pokemon}
          isShiny={isShiny}
          setIsShiny={setIsShiny}
          isFemale={isFemale}
          setIsFemale={setIsFemale}
        />
        <StatsSection pokemon={pokemon} />
        <BaseInfo pokemon={pokemon} />
        <EvolutionSection id={pokemon.id} />
      </div>
    );
  } else {
    return <DefaultError />;
  }
}
