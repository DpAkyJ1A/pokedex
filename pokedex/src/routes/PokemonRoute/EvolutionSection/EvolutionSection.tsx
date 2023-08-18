import { getEvolutionChainByPokemonId, getPokemonByName } from 'api/pokenode';
import PokemonCard from 'components/PokemonCard/PokemonCard';
import { EvolutionChain, NamedAPIResource, Pokemon } from 'pokenode-ts';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

interface IProps {
  id: number;
}

const createEvolutionChainArray = async (id: number) => {
  const evoChain: Pokemon[][] = [];
  let evoData = ((await getEvolutionChainByPokemonId(id)) as EvolutionChain).chain;

  const evoLevel: Pokemon[] = [];
  const pok = await getPokemonByName(evoData.species.name);
  evoLevel.push(pok);

  evoChain.push(evoLevel);

  while (!!evoData && evoData.hasOwnProperty('evolves_to') && evoData.evolves_to.length > 0) {
    const numberOfEvolutions = evoData.evolves_to.length;
    const evoLevel: Pokemon[] = [];

    for (let i = 0; i < numberOfEvolutions; i++) {
      const pok = await getPokemonByName(evoData.evolves_to[i].species.name);
      evoLevel.push(pok);
    }

    evoChain.push(evoLevel);

    evoData = evoData['evolves_to'][0];
  }

  return evoChain;
};

export default function EvolutionSection(props: IProps) {
  const [evolutionChain, setEvolutionChain] = useState(null as Pokemon[][] | null);

  useEffect(() => {
    const init = async () => {
      const evoChain = await createEvolutionChainArray(props.id);
      setEvolutionChain(evoChain);

      console.log(evoChain);
    };

    init();
  }, []);

  return (
    <section className="evolution-chain-section">
      <h3>Evolution Chain</h3>
      {evolutionChain?.length === 1 && <h5>This Pokémon does not evolve</h5>}
      <div className="evolution-chain">
        {evolutionChain?.map((lvl, i) => (
          <>
            <div className="evolution-level" key={`evolution-level ${i}`}>
              {lvl.map((pok, j) => (
                <div className="evolution-level-pokemon" key={`evolution-level-pokemon ${i} ${j}`}>
                  <PokemonCard
                    pokemon={{
                      id: pok.id,
                      name: pok.name,
                      typeList: pok.types.map(
                        (el) => el.type.name[0].toUpperCase() + el.type.name.slice(1)
                      ),
                    }}
                  />
                </div>
              ))}
            </div>
            {i < evolutionChain.length - 1 && (
              <svg
                className="evolution-arrow"
                fill="none"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M184 112l144 144-144 144"
                />
              </svg>
            )}
          </>
        ))}
      </div>
    </section>
  );
}
