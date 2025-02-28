import { motion } from 'framer-motion';
import { Card, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { formatString, pokemonTypeColors } from '../utils';
import { Pokemon } from '../types';
import { TiTrash } from 'react-icons/ti';

interface PokemonCardProps extends Pokemon {
  index: number;
  baseUrl: string;
  removePokemon: (id: number) => void;
}

function PokemonCard({
  id,
  name,
  type1,
  type2,
  moves = [],
  index,
  baseUrl,
  removePokemon,
}: PokemonCardProps) {
  const type1Color = pokemonTypeColors[type1];
  const type2Color = type2 ? pokemonTypeColors[type2] : type1Color;
  const bgGradient = `linear-gradient(to right, ${type1Color}, ${type2Color})`;
  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }}>
        <motion.div layoutId={`card-container-${index}`}>
          <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px]"
            shadow="sm"
            style={{ overflow: 'visible' }}
          >
            <motion.div layoutId={`card-${index}`}>
              <CardBody style={{ overflow: 'visible' }}>
                <div className="grid grid-cols-2 gap-10">
                  <motion.div layoutId={`card-image-${index}`}>
                    <div
                      className={`object-cover scale-[1.225] rounded-lg`}
                      style={{
                        background: bgGradient,
                        height: 140,
                        width: 140,
                      }}
                    >
                      <Link to={`/${baseUrl}${index}`}>
                        <Image
                          alt={name}
                          height={140}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        />
                      </Link>
                    </div>
                  </motion.div>
                  <motion.div layoutId={`card-text-${index}`}>
                    <div className="pl-2">
                      <Link to={`/${baseUrl}${index}`}>
                        <motion.div layoutId={`card-title-${index}`}>
                          <h2 className="text-l font-semibold text-foreground/90 mt-0">
                            {formatString(name)}
                          </h2>
                        </motion.div>
                      </Link>
                      <div className="flex justify-center mx-auto">
                        <Image
                          alt={type1}
                          height={20}
                          src={`/src/assets/types/${type1}.png`}
                          width={20}
                        />
                        {type2 && (
                          <Image
                            alt={type2}
                            height={20}
                            src={`/src/assets/types/${type2}.png`}
                            width={20}
                          />
                        )}
                      </div>
                      <p className="text-small text-foreground/80">
                        {moves[0] === undefined
                          ? ' '
                          : formatString(moves[0].name)}
                      </p>
                      <p className="text-small text-foreground/80">
                        {moves[1] === undefined
                          ? ' '
                          : formatString(moves[1].name)}
                      </p>
                      <p className="text-small text-foreground/80">
                        {moves[2] === undefined
                          ? ' '
                          : formatString(moves[2].name)}
                      </p>
                      <p className="text-small text-foreground/80">
                        {moves[3] === undefined
                          ? ' '
                          : formatString(moves[3].name)}
                      </p>
                      <div className="absolute bottom-1 right-2 transform flex space-x-2">
                        {/* TODO Implement edit
                        <motion.div
                          whileHover={{ scale: 2 }}
                          onClick={() => {
                            console.log(index + ' edit');
                          }}
                        >
                          <TiPencil className="fill-white opacity-50" />
                        </motion.div> */}
                        <motion.div
                          whileHover={{ scale: 2 }}
                          onClick={() => removePokemon(index - 1)}
                        >
                          <TiTrash className="fill-white opacity-50" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardBody>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
}

export default PokemonCard;
