import { useState } from 'react';
import { Pokemon } from '../types';
import PokemonCard from './PokemonCard';
import { AnimatePresence } from 'framer-motion';
import PokemonSelector from './PokemonSelector';

export function PreselectTeam() {
  const [team, setTeam] = useState<Pokemon[]>([]);
  let gridClass = `grid grid-cols-1 ${
    team.length > 0 ? 'md:grid-cols-2' : 'md:grid-cols-1'
  } ${
    team.length > 0 ? 'xl:grid-cols-3' : 'xl:grid-cols-1'
  } gap-4 overflow-visible justify-items-center`;
  async function handleAddtoTeam(pokemonParam: any) {
    const pokemon = pokemonParam[0];
    let pokemonMember = await getPokemon(pokemon[0]);
    pokemonMember.moves = [];
    for (let i = 1; i < pokemon.length; i++) {
      const pokemonMove = await getMove(pokemon[i]);
      pokemonMember.moves = [...pokemonMember.moves, pokemonMove];
    }
    setTeam([...team, pokemonMember]);
  }

  return (
    <div>
      <div className="h-screen flex flex-col">
        <h2 className="pt-5 pb-20 md:pb-0 sm:pt-20 text-3xl text-center">
          Preselect your team
        </h2>
        <div className="flex-grow flex items-center -mt-[55px] md:-mt-[85px]">
          <div className={gridClass}>
            <AnimatePresence>
              {team.map((pokemon, index) => (
                <PokemonCard key={index} {...pokemon} />
              ))}
              {team.length < 6 ? (
                <PokemonSelector addPokemon={handleAddtoTeam} />
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p className="text-center mt-4">
        {window.innerWidth >= 1280
          ? 'You are at the xl breakpoint'
          : window.innerWidth >= 1024
          ? 'You are at the lg breakpoint'
          : window.innerWidth >= 768
          ? 'You are at the md breakpoint'
          : window.innerWidth >= 640
          ? 'You are at the sm breakpoint'
          : 'You are at the base breakpoint'}
      </p>
      {/* <div>
        {team.map((pokemon) => (
          <div key={pokemon.id} onClick={() => handleClick(pokemon)}>
            {pokemon.name}
          </div>
        ))}
      </div> */}
    </div>
  );

  async function getPokemon(id: number) {
    const response = await fetch(`/api/pokemons/${id}`);
    let data = await response.json();
    return data;
  }
  async function getMove(id: number) {
    const response = await fetch(`/api/moves/${id}`);
    const data = await response.json();
    return data;
  }
}
