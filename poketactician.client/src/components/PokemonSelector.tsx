import { Card, CardBody, Image, useDisclosure } from '@nextui-org/react';
import { useState } from 'react';
import { Pokemon } from '../types';
import { motion } from 'framer-motion';
import PokemonSelectorModal from './PokemonSelectorModal';

function PokemonSelector() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} onTap={onOpen}>
        <Card
          isBlurred
          className="border-none bg-background/60 dark:bg-default-100/50 max-w-[300px]"
          shadow="sm"
          style={{ overflow: 'visible' }}
        >
          <CardBody style={{ overflow: 'visible' }}>
            <div className="grid grid-cols-2 gap-10 justify-items-center">
              <Image
                alt={'fdsaf'}
                className={`object-cover scale-[1.225] rounded-lg`}
                height={140}
                src="/src/assets/pb-plus.png"
                width="100%"
                style={{
                  background: 'linear-gradient(to bottom, #EB5356, #B8B8D0)',
                }}
              />
              <h2 className="flex items-center justify-center h-full text-foreground/80 text-center">
                Preselect a Pokemon for your team!
              </h2>
            </div>
          </CardBody>
        </Card>
      </motion.div>
      <PokemonSelectorModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default PokemonSelector;
