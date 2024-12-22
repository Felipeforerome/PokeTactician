import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';

import { Pokemon } from '../types';

const PokemonCard: React.FC<Pokemon> = ({ id, name, type1, type2 }) => {
  const formatString = (type: string) => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const pokemonTypeColors: Record<string, string> = {
    Normal: '#C8C8A8',
    Fire: '#F8B890',
    Water: '#A5D8E8',
    Electric: '#F5E98E',
    Grass: '#B8E8B8',
    Ice: '#B2E0E8',
    Fighting: '#D89090',
    Poison: '#D1A3D8',
    Ground: '#E8D8A8',
    Flying: '#C5C8F8',
    Psychic: '#F8C8C8',
    Bug: '#D0E890',
    Rock: '#D8C8A8',
    Ghost: '#B8A8D8',
    Dragon: '#A5A5E8',
    Dark: '#A8A890',
    Steel: '#C8C8D8',
    Fairy: '#F8D8E8',
  };
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
