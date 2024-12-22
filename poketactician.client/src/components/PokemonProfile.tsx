import { motion } from 'framer-motion';
import { Image } from '@nextui-org/react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const PokemonProfile: React.FC<Pokemon> = ({
  id,
  name,
  type1,
  type2,
  hp,
  att,
  deff,
  spAtt,
  spDeff,
  spe,
}) => {
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

  const hexToRgba = (hex: string, opacity: number) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const data = {
    labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
    datasets: [
      {
        label: 'Base Stats',
        data: [hp, att, deff, spAtt, spDeff, spe],
        backgroundColor: hexToRgba(type1Color, 0.2),
        borderColor: hexToRgba(type1Color, 1),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(255, 255, 255, 0.2)', // Change axis color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Change grid color
        },
        pointLabels: {
          color: 'rgba(255, 255, 255, 0.7)', // Change label color
        },
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)', // Change tick color
          backdropColor: 'rgba(0, 0, 0, 0)', // Change background color
          beginAtZero: true,
        },
        suggestedMin: 0,
        suggestedMax: 150,
      },
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      style={{ pointerEvents: 'auto' }}
      className="z-10 fixed overflow-y-auto inset-0 md:flex items-center justify-center w-full max-w-3xl mx-auto top-[5%]"
    >
      <Link to="/results">
        <motion.div
          layoutId={`card-container-${id}`}
          className="bg-black rounded-lg"
          style={{ overflowY: 'scroll' }}
        >
          <motion.div layoutId={`card-${id}`}>
            <br />
            <motion.div layoutId={`card-title-${id}`}>
              <h1 className="text-2xl font-semibold text-foreground/90 mt-2">
                {formatString(name)}
              </h1>
              <p className="text-small text-foreground/80">
                {formatString(type1)} {type2 && `- ${formatString(type2)}`}
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <motion.div
                layoutId={`card-image-${id}`}
                className="flex justify-center items-center"
              >
                <Image
                  alt={name}
                  className={'object-cover sm:scale-[3] rounded-lg'}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  width="100%"
                  style={{ background: bgGradient }}
                />
              </motion.div>
              <motion.div className="stats-radar">
                <Radar data={data} options={options} />
              </motion.div>
              <motion.div layoutId={`card-text-${id}`}>
                <div>
                  <p className="text-small text-foreground/80">Move 1</p>
                  <p className="text-small text-foreground/80">Move 2</p>
                  <p className="text-small text-foreground/80">Move 3</p>
                  <p className="text-small text-foreground/80">Move 4</p>
                </div>
              </motion.div>
              <motion.div className="content-container">
                <p>
                  Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis
                  vitae magna nisl cras, ridiculus augue. Orci varius ornare
                  viverra urna eget ridiculus. Lobortis feugiat viverra lacinia
                  a.
                </p>
              </motion.div>
              <br />
            </div>
          </motion.div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default PokemonProfile;
