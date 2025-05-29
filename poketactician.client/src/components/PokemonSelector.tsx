import { Card, CardBody, Image, useDisclosure } from '@heroui/react';
import { motion } from 'motion/react';
import PokemonSelectorModal from './PokemonSelectorModal';

interface PokemonSelectorProps {
  addPokemon: (pokemon: any) => void;
}

function PokemonSelector({ addPokemon }: PokemonSelectorProps) {
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
                src={new URL('../assets/pb-plus.png', import.meta.url).href}
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
      <PokemonSelectorModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        addPokemon={addPokemon}
      />
    </>
  );
}

export default PokemonSelector;
