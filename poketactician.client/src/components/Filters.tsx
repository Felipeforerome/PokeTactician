import { Switch } from '@heroui/react';
import { useEffect, useState } from 'react';
import { Game, Generation, PokemonType, SelectableItem } from '../types';
import { GenericMultiSelector } from './GenericMultiSelector';

export interface FiltersProps {
  updateFilters: (id: string, value: boolean) => void;
  isMobile: boolean;
}

function Filters({ updateFilters, isMobile }: FiltersProps) {
  const [games, setGames] = useState<(Game & SelectableItem)[]>([]);
  const [generations, setGenerations] = useState<
    (Generation & SelectableItem)[]
  >([]);
  const [pokemonTypes, setPokemonTypes] = useState<
    (PokemonType & SelectableItem)[]
  >([]);

  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  // const handleApply = () => {
  //   // Put your filter application logic here
  //   applyFilters();
  // };
  useEffect(() => {
    populateFilters();
    setGenerations(
      Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        name: `Generation ${i + 1}`,
        value: (i + 1).toString(),
      })),
    );
  }, []);

  return (
    <>
      <GenericMultiSelector
        title="Games"
        items={games}
        onSelectionChange={(values) => handleFilterChange('games', values)}
        isMobile={isMobile}
      />

      <GenericMultiSelector
        title="Generations"
        items={generations}
        onSelectionChange={(values) =>
          handleFilterChange('generations', values)
        }
        isMobile={isMobile}
      />

      <GenericMultiSelector
        title="Types"
        items={pokemonTypes}
        onSelectionChange={(values) => handleFilterChange('typeId', values)}
        isMobile={isMobile}
      />

      <Switch
        onValueChange={(value) => handleFilterChange('exclusiveType', value)}
      >
        Only Selected Types
      </Switch>
      <Switch onValueChange={(value) => handleFilterChange('legendary', value)}>
        With Legendary
      </Switch>
    </>
  );

  async function populateFilters() {
    // Fetch and format games
    let response = await fetch('api/games');
    let data = await response.json();
    setGames(
      data.map((game: Game) => ({
        ...game,
        value: game.id?.toString() || game.name, // Use id as value if available, otherwise name
      })),
    );
    response = await fetch('api/type');
    data = await response.json();
    setPokemonTypes(
      data.map((type: PokemonType) => ({ ...type, value: type.id.toString() })),
    );

    // Uncomment the following lines to fetch generations when it's implemented
    // response = await fetch('api/generations');
    // data = await response.json();
    // setGenerations(data);
  }
}

export default Filters;
