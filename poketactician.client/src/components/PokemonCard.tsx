import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { formatString, pokemonTypeColors } from '../utils';
import { Pokemon } from '../types';

const PokemonCard: React.FC<Pokemon> = ({ id, name, type1, type2 }) => {
  const type1Color = pokemonTypeColors[type1];
  const type2Color = type2 ? pokemonTypeColors[type2] : type1Color;
  const bgGradient = `linear-gradient(to right, ${type1Color}, ${type2Color})`;
  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }}>
        <Link to={`/results/${id}`}>
          <motion.div layoutId={`card-container-${id}`}>
            <Card
              isBlurred
              className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px]"
              shadow="sm"
              style={{ overflow: 'visible' }}
            >
              <motion.div layoutId={`card-${id}`}>
                <CardBody style={{ overflow: 'visible' }}>
                  <div className="grid grid-cols-2 gap-10">
                    <motion.div layoutId={`card-image-${id}`}>
                      <Image
                        alt={name}
                        className={`object-cover scale-[1.225] rounded-lg`}
                        height={140}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                        width="100%"
                        style={{ background: bgGradient }}
                      />
                    </motion.div>
                    <motion.div layoutId={`card-text-${id}`}>
                      <div>
                        <motion.div layoutId={`card-title-${id}`}>
                          <h1 className="text-xl font-semibold text-foreground/90 mt-2">
                            {formatString(name)}
                          </h1>
                        </motion.div>
                        <p className="text-small text-foreground/80">
                          {formatString(type1)}{' '}
                          {type2 && `- ${formatString(type2)}`}
                        </p>
                        <p className="text-small text-foreground/80">Move 1</p>
                        <p className="text-small text-foreground/80">Move 2</p>
                        <p className="text-small text-foreground/80">Move 3</p>
                        <p className="text-small text-foreground/80">Move 4</p>
                      </div>
                    </motion.div>
                  </div>
                </CardBody>
              </motion.div>
            </Card>
          </motion.div>
        </Link>
      </motion.div>
    </>
  );
};

export default PokemonCard;
