import { motion } from 'framer-motion';
import { Card, CardBody, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { Pokemon } from '../types';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const PokemonProfile: React.FC<Pokemon> = ({ id, name, type1, type2, hp, att, deff, spAtt, spDeff, spe }) => {
    const formatType = (type: string) => {
        return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };

    const pokemonTypeColors: Record<string, string> = {
        Normal: "#C8C8A8",
        Fire: "#F8B890",
        Water: "#A5D8E8",
        Electric: "#F5E98E",
        Grass: "#B8E8B8",
        Ice: "#B2E0E8",
        Fighting: "#D89090",
        Poison: "#D1A3D8",
        Ground: "#E8D8A8",
        Flying: "#C5C8F8",
        Psychic: "#F8C8C8",
        Bug: "#D0E890",
        Rock: "#D8C8A8",
        Ghost: "#B8A8D8",
        Dragon: "#A5A5E8",
        Dark: "#A8A890",
        Steel: "#C8C8D8",
        Fairy: "#F8D8E8",
    };
    const type1Color = pokemonTypeColors[type1];
    const type2Color = type2 ? pokemonTypeColors[type2] : type1Color;
    const bgGradient = `linear-gradient(to right, ${type1Color}, ${type2Color})`;

    const data = {
        labels: ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'],
        datasets: [
            {
                label: name,
                data: [hp, att, deff, spAtt, spDeff, spe],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true,
                    color: 'rgba(255, 255, 255, 0.2)' // Change axis color
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)' // Change grid color
                },
                pointLabels: {
                    color: 'rgba(255, 255, 255, 0.7)' // Change label color
                },
                ticks: {
                    color: 'rgba(255, 255, 255, 0.7)', // Change tick color
                    backdropColor: 'rgba(0, 0, 0, 0)', // Change background color
                    beginAtZero: true,
                },
                suggestedMin: 0,
                suggestedMax: 150
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            style={{ pointerEvents: "auto" }}
            className="z-10 fixed bg-black bg-opacity-80 will-change-opacity top-5 bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl rounded-lg"
        >
            <Link to="/">
                <motion.div layoutId={`card-container-${id}`}>
                    <Card
                        isBlurred
                        className="dark border-none bg-background/60 dark:bg-default-100/50 w-full"
                        shadow="sm"
                        style={{ overflow: 'visible' }}
                    >
                        <motion.div layoutId={`card-${id}`}>
                            <CardBody style={{ overflow: 'visible' }}>
                                <div className="grid grid-cols-2 gap-10">
                                    <motion.div layoutId={`card-image-${id}`}>
                                        <Image
                                            alt={name}
                                            className={`object-cover scale-[0.925] rounded-lg`}
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                            width="100%"
                                            style={{ background: bgGradient }}
                                        />
                                    </motion.div>
                                    <motion.div className='stats-radar'>
                                        <Radar data={data} options={options} />
                                    </motion.div>
                                    <motion.div layoutId={`card-text-${id}`}>
                                        <div>
                                            <h3 className="font-semibold text-foreground/90 mt-2">{formatType(name)} - Profile</h3>
                                            <p className="text-small text-foreground/80">{formatType(type1)} {type2 && `- ${formatType(type2)}`}</p>
                                            <p className="text-small text-foreground/80">HP: {hp}</p>
                                            <p className="text-small text-foreground/80">Attack: {att}</p>
                                            <p className="text-small text-foreground/80">Defense: {deff}</p>
                                        </div>
                                    </motion.div>
                                    <motion.div className="content-container" animate>
                                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Turpis vitae magna nisl cras, ridiculus augue. Orci varius ornare viverra urna eget ridiculus. Lobortis feugiat viverra lacinia a.</p>
                                        <p>Vitae primis felis penatibus. Dis ante nam mattis. Venenatis metus habitant auctor.</p>
                                        <p>Semper nisl iaculis erat orci etiam enim. Augue ornare dictumst imperdiet lacinia interdum. Metus facilisi potenti turpis fusce; torquent elit. Faucibus torquent nunc per elementum. Taciti odio penatibus litora nam ex hendrerit congue?</p>
                                    </motion.div>
                                </div>
                            </CardBody>
                        </motion.div>
                    </Card>
                </motion.div>
            </Link>
        </motion.div>
    );
};

export default PokemonProfile;