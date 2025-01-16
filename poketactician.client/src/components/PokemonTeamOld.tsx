import PokemonCard from './PokemonCard';
import { AnimatePresence } from 'framer-motion';
import { Pokemon } from '../types';

interface PokemonTeamProps {
  pokemons: Pokemon[];
}

function PokemonTeamOld({ pokemons }: PokemonTeamProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-visible">
      <AnimatePresence>
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={index}
            index={index + 1}
            baseUrl="results/"
            {...pokemon}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

export default PokemonTeamOld;
