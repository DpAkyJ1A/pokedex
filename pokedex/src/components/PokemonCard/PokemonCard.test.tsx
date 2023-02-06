import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import PokemonCard from './PokemonCard';
import pokemons from 'json-pokemon';

describe('TEST POKEMON CARD', () => {
  test('exist', () => {
    const pokemon = pokemons[0];
    render(<PokemonCard pokemon={pokemon} />);

    const name = screen.getByText(/Bulbasaur/i);
    const id = screen.getByText(/#1/);
    const shinyToggle = screen.getByRole('button');

    expect(name).toBeInTheDocument();
    expect(id).toBeInTheDocument();
    
    expect(shinyToggle).toMatchSnapshot();
  });

  test('not exist', () => {
    const pokemon = pokemons[0];
    render(<PokemonCard pokemon={pokemon} />);

    const wrongName = screen.queryByText(/Charmander/i);
    const wrongId = screen.queryByText(/#3/);
    const input = screen.queryByRole('input');

    expect(wrongName).toBeNull();
    expect(wrongId).toBeNull();
    
    expect(input).toBeNull();
  });

  test('async exist', async () => {
    const pokemon = pokemons[0];
    render(<PokemonCard pokemon={pokemon} />);

    const pokemonPictures = await screen.findAllByRole('img');
    
    expect(pokemonPictures[0]).toBeInTheDocument();
    expect(pokemonPictures[1]).toBeInTheDocument();
  });

  test('shiny toggle click', () => {
    const pokemon = pokemons[0];
    render(<PokemonCard pokemon={pokemon} />);

    const shinyToggle = screen.getByRole('button');
    expect(screen.getByRole('button')).not.toHaveClass('active');
    fireEvent.click(shinyToggle);
    expect(screen.getByRole('button')).toHaveClass('active');
    fireEvent.click(shinyToggle);
    expect(screen.getByRole('button')).not.toHaveClass('active');
  });
})