import { AnimatePresence } from 'motion/react';
import { Pokemon } from '../types';
import PokemonCard from './PokemonCard';
import PokemonSelector from './PokemonSelector';

interface PokemonTeamProps {
  team: Pokemon[] | [];
  baseUrl: string;
  handleRemovePokemon: (id: number) => void;
  handleAddtoTeam: (pokemon: any) => void;
}

export function PokemonTeam({
  team,
  baseUrl,
  handleRemovePokemon,
  handleAddtoTeam,
}: PokemonTeamProps) {
  return (
    <AnimatePresence>
      {team.map((pokemon, index) => (
        <PokemonCard
          key={index}
          index={index + 1}
          baseUrl={baseUrl}
          removePokemon={handleRemovePokemon}
          {...pokemon}
        />
      ))}
      {team.length < 6 && baseUrl !== 'results/' ? (
        <PokemonSelector addPokemon={handleAddtoTeam} />
      ) : null}
    </AnimatePresence>
  );
}
