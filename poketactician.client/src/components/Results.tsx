import PokemonProfile from './PokemonProfile';
import { useParams } from 'react-router-dom';
import PokemonTeam from './PokemonTeam';
import { AnimatePresence } from 'framer-motion';

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
    const pokemon = id ? pokemons.find(p => p.id === parseInt(id)) : undefined;
    console.log(pokemons);
    const contents = pokemons === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <PokemonTeam pokemons={pokemons} />;
    return (
        <div>
            {contents}
            <AnimatePresence>
                {id && pokemon &&
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
                    />}
            </AnimatePresence>
        </div>
    );
}

export default Results;