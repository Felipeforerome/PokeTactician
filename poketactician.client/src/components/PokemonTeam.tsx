import PokemonCard from './PokemonCard';
import { AnimatePresence } from 'framer-motion';
import { Pokemon } from '../types';


interface PokemonTeamProps {
    pokemons: Pokemon[];
}

const PokemonTeam: React.FC<PokemonTeamProps> = ({ pokemons }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <AnimatePresence>
                {pokemons.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        {...pokemon}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
}

export default PokemonTeam;