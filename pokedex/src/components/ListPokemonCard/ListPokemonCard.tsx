import React from 'react';
import PokemonCard from 'components/PokemonCard/PokemonCard';

interface IListPokemonCard {
  idList: number[];
}

export default function ListPokemonCard({ idList }: IListPokemonCard) {
  return (
    <div className="card-list">
      {idList.map((id: number) => (
        <PokemonCard id={id} key={id} />
      ))}
    </div>
  );
}
