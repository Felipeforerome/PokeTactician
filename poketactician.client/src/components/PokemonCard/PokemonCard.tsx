import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Image } from "@nextui-org/react";

interface PokemonCardProps {
    name: string;
    image: string;
    type1: string;
    type2: string;
    hp: number;
    attack: number;
    defense: number;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, type1, type2, hp, attack, defense }) => {
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
    console.log(bgGradient);
    return (
        <Card
            isBlurred
            className="dark border-none bg-background/60 dark:bg-default-100/50 max-w-[300px]"
            shadow="sm"
            style={{ overflow: 'visible' }}
        >
            <CardBody style={{ overflow: 'visible' }}>
                <div className="grid grid-cols-2 gap-10">
                    <motion.div whileHover={{ scale: 1.2 }}>
                        <Image
                            alt={name}
                            className={`object-cover scale-[1.225] rounded-lg`}
                            height={140}
                            src={image}
                            width="100%"
                            style={{ background: bgGradient }}
                        />
                    </motion.div>
                    <div>
                        <h3 className="font-semibold text-foreground/90 mt-2">{formatType(name)}</h3>
                        <p className="text-small text-foreground/80">{formatType(type1)} {type2 && `- ${formatType(type2)}`}</p>
                        <p className="text-small text-foreground/80">HP: {hp}</p>
                        <p className="text-small text-foreground/80">Attack: {attack}</p>
                        <p className="text-small text-foreground/80">Defense: {defense}</p>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default PokemonCard;