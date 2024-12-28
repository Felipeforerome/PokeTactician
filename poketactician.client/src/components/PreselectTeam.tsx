import { useState } from 'react';
import { Pokemon } from '../types';
import PokemonCard from './PokemonCard';
import { AnimatePresence } from 'framer-motion';
import PokemonSelector from './PokemonSelector';

export function PreselectTeam() {
  const [team, setTeam] = useState<Pokemon[]>([]);

  async function handleAddtoTeam(pokemon: Array<number>) {
    const pokemonMember = await getPokemon(pokemon[0]);

    setTeam([...team, pokemonMember]);
  }

  return (
    <div>
      <div className="h-screen flex flex-col">
        <h2 className="pt-5 pb-20 md:pb-0 sm:pt-20 text-3xl text-center">
          Preselect your team
        </h2>
        <div className="flex-grow flex items-center -mt-[55px] md:-mt-[85px]">
          <div
            className={`grid grid-cols-1 md:grid-cols-${Math.min(
              team.length,
              2,
            )} lg:grid-cols-${Math.min(
              team.length,
              3,
            )} gap-4 overflow-visible justify-items-center`}
          >
            <PokemonSelector addPokemon={handleAddtoTeam} />
            <AnimatePresence>
              {team.map((pokemon, index) => (
                <PokemonCard key={index} {...pokemon} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
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
    const data = await response.json();
    return data as Pokemon;
  }
}
