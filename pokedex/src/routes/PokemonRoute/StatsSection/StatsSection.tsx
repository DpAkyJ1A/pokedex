import { Pokemon } from 'pokenode-ts';
import React from 'react';

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

const scaledMin = 1;
const scaledMax = 15;

interface IProps {
  pokemon: Pokemon;
}

export default function StatsSection({ pokemon }: IProps) {
  return (
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
  );
}
