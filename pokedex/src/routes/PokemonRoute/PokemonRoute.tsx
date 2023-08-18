import { getEvolutionChainByPokemonId, getPokemonById, getPokemonSpeciesById } from 'api/pokenode';
import React, { useEffect, useState } from 'react';
import { Pokemon } from 'pokenode-ts';
import { useParams } from 'react-router-dom';
import TypeSvgGenerator from 'components/PokemonCard/TypeSvgGenerator';
import PokeballLoader from 'components/PokeballLoader/PokeballLoader';
import DefaultError from 'routes/DefaultError/DefaultError';
import { getGeneration } from 'utils/getGeneration';
import EvolutionSection from './EvolutionSection/EvolutionSection';

interface IMAXMIN_STATS {
  [key: string]: number;
}

const MAX_STATS: IMAXMIN_STATS = {
  hp: 255,
  attack: 181,
  defense: 230,
  'special-attack': 173,
  'special-defense': 230,
  speed: 200,
};

const MIN_STATS: IMAXMIN_STATS = {
  hp: 1,
  attack: 5,
  defense: 5,
  'special-attack': 10,
  'special-defense': 20,
  speed: 5,
};

export default function PokemonRoute() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [pokemon, setPokemon] = useState(undefined as Pokemon | undefined);

  const [isShiny, setIsShiny] = useState(false);
  const [isFemale, setIsFemale] = useState(false);

  const scaledMin = 1;
  const scaledMax = 15;

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
          console.log(pok);
          const evo = await getEvolutionChainByPokemonId(pok.id);
          console.log(evo);
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

  if (pokemon) {
    return (
      <div className="pokemon-route">
        <section className="pokemon-route-header">
          <h2 className="pokemon-route-header__name">
            {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <h2 className="pokemon-route-header__id">#{pokemon.id}</h2>
        </section>
        <section className="sprites-section-wrapper">
          <div
            className={`sprites-wrapper default-sprites ${!isShiny && !isFemale ? 'active' : ''}`}
          >
            <img className="sprite" src={pokemon.sprites.front_default || ''} />
            <img className="sprite" src={pokemon.sprites.back_default || ''} />
          </div>
          <div className={`sprites-wrapper shiny-sprites ${isShiny && !isFemale ? 'active' : ''}`}>
            <img className="sprite" src={pokemon.sprites.front_shiny || ''} />
            <img className="sprite" src={pokemon.sprites.back_shiny || ''} />
          </div>
          <div className={`sprites-wrapper female-sprites ${!isShiny && isFemale ? 'active' : ''}`}>
            <img
              className="sprite"
              src={pokemon.sprites.front_female || pokemon.sprites.front_default || ''}
            />
            <img
              className="sprite"
              src={pokemon.sprites.back_female || pokemon.sprites.back_default || ''}
            />
          </div>
          <div
            className={`sprites-wrapper female-shiny-sprites ${
              isShiny && isFemale ? 'active' : ''
            }`}
          >
            <img
              className="sprite"
              src={pokemon.sprites.front_shiny_female || pokemon.sprites.front_shiny || ''}
            />
            <img
              className="sprite"
              src={pokemon.sprites.back_shiny_female || pokemon.sprites.back_shiny || ''}
            />
          </div>
          <div className="sprites-controls">
            <div className="shiny-control">
              <h4>Shiny</h4>
              <label className="shiny-switch">
                <input
                  type="checkbox"
                  checked={isShiny ? true : false}
                  onChange={() => setIsShiny(!isShiny)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="gender-control">
              <h4>Gender</h4>
              <label className="gender-switch">
                <input type="checkbox" onChange={() => setIsFemale(!isFemale)} />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </section>
        <section className="stats-section">
          <h3>Stats</h3>
          <div className="stats-wrapper">
            {pokemon.stats.map((stat) => (
              <div className="stat" key={stat.stat.name}>
                <div className="stat-indicator">
                  {Array.from({ length: scaledMax }, (_, index) => (
                    <span
                      className={`${
                        Math.round(
                          ((stat.base_stat - MIN_STATS[stat.stat.name]) * (scaledMax - scaledMin)) /
                            (MAX_STATS[stat.stat.name] - MIN_STATS[stat.stat.name]) +
                            scaledMin
                        ) >=
                        index + 1
                          ? 'active'
                          : ''
                      }`}
                      key={`${stat.stat.name} ${index}`}
                    />
                  ))}
                </div>
                <h6>{stat.stat.name.replace(/-/g, ' ')}</h6>
              </div>
            ))}
          </div>
          <h5>
            {`Total power = ${pokemon.stats[0].base_stat} + ${pokemon.stats[1].base_stat} +
            ${pokemon.stats[2].base_stat} + ${pokemon.stats[3].base_stat} +
            ${pokemon.stats[4].base_stat} + ${pokemon.stats[5].base_stat} = `}
            <span>{pokemon.stats.reduce((acc, cur) => acc + cur.base_stat, 0)}</span>
          </h5>
        </section>
        <section className="base-info">
          <div className="base-info-column">
            <div className="info-cell">
              <h4 className="info-header">Types</h4>
              <div style={{ display: 'flex', gap: '1rem' }}>
                {pokemon.types.map((type, i) => (
                  <span className="svg-cont" key={`${pokemon.name}-type-${i}`}>
                    {TypeSvgGenerator({
                      type: type.type.name[0].toUpperCase() + type.type.name.slice(1),
                    })}
                  </span>
                ))}
              </div>
            </div>
            <div className="info-cell">
              <h4 className="info-header">Height</h4>
              <p className="info-data">{`${pokemon.height / 10} m`}</p>
            </div>
            <div className="info-cell">
              <h4 className="info-header">Weight</h4>
              <p className="info-data">{`${pokemon.weight / 10} kg`}</p>
            </div>
            <div className="info-cell">
              <h4 className="info-header">Base exp</h4>
              <p className="info-data">{`${pokemon.base_experience}`}</p>
            </div>
          </div>
          <div className="base-info-column">
            <div className="info-cell">
              <h4 className="info-header">Generation</h4>
              <p className="info-data">
                {getGeneration(pokemon.id)?.romanNum} {getGeneration(pokemon.id)?.name}
              </p>
            </div>
            <div className="info-cell">
              <h4 className="info-header">Abilities</h4>
              {pokemon.abilities.map((ability, i) => (
                <p
                  className={`info-data info-data-abilities ${ability.is_hidden && 'color-light'}`}
                  key={ability.ability.name}
                >
                  {ability.ability.name[0].toUpperCase() + ability.ability.name.slice(1)}
                </p>
              ))}
            </div>
          </div>
        </section>
        <EvolutionSection id={pokemon.id} />
      </div>
    );
  } else {
    return <DefaultError />;
  }
}
