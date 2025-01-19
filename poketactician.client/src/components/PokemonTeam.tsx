import { Pokemon } from '../types';
import PokemonCard from './PokemonCard';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PokemonSelector from './PokemonSelector';
import PokemonProfile from './PokemonProfile';
import { Link } from 'react-router-dom';

export interface PreSelectProps {
  team: Pokemon[] | [];
  setTeam: (team: Pokemon[]) => void;
  baseUrl: string;
}

export function PokemonTeam({ team, setTeam, baseUrl }: PreSelectProps) {
  const { id } = useParams<{ id: string }>();
  const pokemon = id ? team[parseInt(id) - 1] : undefined;
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
                <PokemonCard index={index + 1} baseUrl={baseUrl} {...pokemon} />
              ))}
              {team.length < 6 && baseUrl != 'results/' ? (
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
      <AnimatePresence>
        {id && pokemon && (
          <>
            <Link to={`/`}>
              <motion.div
                initial={{ zIndex: -1, opacity: 0 }}
                animate={{ zIndex: 10, opacity: 1 }}
                exit={{ zIndex: -1, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                layoutId={`card-background-${id}`}
                className="fixed top-0 left-0 bg-background/60 dark:bg-default-100/50 w-full h-full z-3 backdrop-blur-md"
              ></motion.div>
            </Link>
          </>
        )}
        {id && pokemon && (
          <PokemonProfile
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            type1={pokemon.type1}
            type2={pokemon.type2}
            hp={pokemon.hp}
            att={pokemon.att}
            deff={pokemon.deff}
            spAtt={pokemon.spAtt}
            spDeff={pokemon.spDeff}
            spe={pokemon.spe}
            moves={pokemon.moves}
            index={parseInt(id)}
            baseUrl={baseUrl}
          />
        )}
      </AnimatePresence>
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
