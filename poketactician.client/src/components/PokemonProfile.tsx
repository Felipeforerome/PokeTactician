import { motion } from 'framer-motion';
import { Image } from '@heroui/react';
import { Link } from 'react-router-dom';
import { Pokemon } from '../types';
import { Radar } from 'react-chartjs-2';
import { formatString, hexToRgba, pokemonTypeColors } from '../utils';
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

function PokemonProfile({
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
  moves,
  index,
  baseUrl,
}: Pokemon & { index: number } & { baseUrl: string }) {
  const type1Color = pokemonTypeColors[type1];
  const type2Color = type2 ? pokemonTypeColors[type2] : type1Color;
  const bgGradient = `linear-gradient(to right, ${type1Color}, ${type2Color})`;
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
      <Link to={`/${baseUrl}`}>
        <motion.div
          layoutId={`card-container-${index}`}
          className="bg-black rounded-lg pl-5 pr-5"
          style={{ overflowY: 'scroll' }}
        >
          <motion.div layoutId={`card-${index}`}>
            <br />
            <motion.div layoutId={`card-title-${index}`}>
              <h1 className="text-2xl font-semibold text-foreground/90 mt-2">
                {formatString(name)}
              </h1>
              <p className="text-small text-foreground/80">
                {formatString(type1)} {type2 && `- ${formatString(type2)}`}
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 grid-cols-1">
              <motion.div
                layoutId={`card-image-${index}`}
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
              <motion.div layoutId={`card-text-${index}`}>
                <div>
                  <br />
                  <p className="font-bold text-foreground/80">Moves</p>
                  <p className="text-small text-foreground/80">
                    {moves != undefined && moves[0]
                      ? formatString(moves[0].name)
                      : ''}
                  </p>
                  <p className="text-small text-foreground/80">
                    {moves != undefined && moves[1]
                      ? formatString(moves[1].name)
                      : ''}
                  </p>
                  <p className="text-small text-foreground/80">
                    {moves != undefined && moves[2]
                      ? formatString(moves[2].name)
                      : ''}
                  </p>
                  <p className="text-small text-foreground/80">
                    {moves != undefined && moves[3]
                      ? formatString(moves[3].name)
                      : ''}
                  </p>
                  <br />
                </div>
              </motion.div>
              <motion.div className="content-container">
                <br />
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
}

export default PokemonProfile;
