import TypeSvgGenerator from 'components/PokemonCard/TypeSvgGenerator';
import { Pokemon } from 'pokenode-ts';
import React from 'react';
import { getGeneration } from 'utils/getGeneration';

interface IProps {
  pokemon: Pokemon;
}

export default function BaseInfo({ pokemon }: IProps) {
  return (
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
  );
}
