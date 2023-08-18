import { Pokemon } from 'pokenode-ts';
import React from 'react';

interface IProps {
  pokemon: Pokemon;
  isShiny: boolean;
  setIsShiny: React.Dispatch<React.SetStateAction<boolean>>;
  isFemale: boolean;
  setIsFemale: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpritesSection(props: IProps) {
  return (
    <section className="sprites-section-wrapper">
      <div
        className={`sprites-wrapper default-sprites ${
          !props.isShiny && !props.isFemale ? 'active' : ''
        }`}
      >
        <img className="sprite" src={props.pokemon.sprites.front_default || ''} />
        {props.pokemon.sprites.back_default ? (
          <img className="sprite" src={props.pokemon.sprites.back_default} />
        ) : (
          <div className="sprite">
            <h3>Pokemon back default sprite</h3>
          </div>
        )}
      </div>
      <div
        className={`sprites-wrapper shiny-sprites ${
          props.isShiny && !props.isFemale ? 'active' : ''
        }`}
      >
        <img className="sprite" src={props.pokemon.sprites.front_shiny || ''} />
        {props.pokemon.sprites.back_shiny ? (
          <img className="sprite" src={props.pokemon.sprites.back_shiny} />
        ) : (
          <div className="sprite">
            <h3>Pokemon back shiny sprite</h3>
          </div>
        )}
      </div>
      <div
        className={`sprites-wrapper female-sprites ${
          !props.isShiny && props.isFemale ? 'active' : ''
        }`}
      >
        <img
          className="sprite"
          src={props.pokemon.sprites.front_female || props.pokemon.sprites.front_default || ''}
        />
        {props.pokemon.sprites.back_female || props.pokemon.sprites.back_default ? (
          <img
            className="sprite"
            src={props.pokemon.sprites.back_female || props.pokemon.sprites.back_default || ''}
          />
        ) : (
          <div className="sprite">
            <h3>Pokemon back female sprite</h3>
          </div>
        )}
      </div>
      <div
        className={`sprites-wrapper female-shiny-sprites ${
          props.isShiny && props.isFemale ? 'active' : ''
        }`}
      >
        <img
          className="sprite"
          src={props.pokemon.sprites.front_shiny_female || props.pokemon.sprites.front_shiny || ''}
        />
        {props.pokemon.sprites.back_shiny_female || props.pokemon.sprites.back_shiny ? (
          <img
            className="sprite"
            src={props.pokemon.sprites.back_shiny_female || props.pokemon.sprites.back_shiny || ''}
          />
        ) : (
          <div className="sprite">
            <h3>Pokemon back shiny female sprite</h3>
          </div>
        )}
      </div>
      <div className="sprites-controls">
        <div className="shiny-control">
          <h4>Shiny</h4>
          <label className="shiny-switch">
            <input
              type="checkbox"
              checked={props.isShiny ? true : false}
              onChange={() => props.setIsShiny(!props.isShiny)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="gender-control">
          <h4>Gender</h4>
          <label className="gender-switch">
            <input type="checkbox" onChange={() => props.setIsFemale(!props.isFemale)} />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </section>
  );
}
