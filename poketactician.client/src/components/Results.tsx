import PokemonProfile from './PokemonProfile';
import { useParams } from 'react-router-dom';
import PokemonTeam from './PokemonTeam';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Pokemon {
  id: number;
  name: string;
  hp: number;
  att: number;
  deff: number;
  spAtt: number;
  spDeff: number;
  spe: number;
  type1: string;
  type2: string;
}

interface ResultsProps {
  pokemons: Pokemon[];
}

function Results({ pokemons }: ResultsProps) {
  const { id } = useParams<{ id: string }>();
  const pokemon = id ? pokemons.find((p) => p.id === parseInt(id)) : undefined;
  const contents =
    pokemons === undefined ? (
      <p>
        <em>
          Loading... Please refresh once the ASP.NET backend has started. See{' '}
          <a href="https://aka.ms/jspsintegrationreact">
            https://aka.ms/jspsintegrationreact
          </a>{' '}
          for more details.
        </em>
      </p>
    ) : (
      <PokemonTeam pokemons={pokemons} />
    );
  return (
    <div>
      <div className="h-screen flex flex-col">
        <h1
          id="tableLabel"
          className="pt-5 pb-20 sm:pb-0 sm:pt-20 text-3xl text-center"
        >
          Suggested Team
        </h1>
        <div className="flex-grow flex items-center -mt-[55px] sm:-mt-[85px]">
          <div>{contents}</div>
        </div>
      </div>
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
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Results;
