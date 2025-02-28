import { Button, Select, SelectItem, Switch } from "@heroui/react";
import { useEffect, useState } from 'react';
import { Game, Generation, PokemonType } from '../types';
export interface FiltersProps {
  updateFilters: (id: string, value: boolean) => void;
  applyFilters: () => void;
}

function Filters({ updateFilters, applyFilters }: FiltersProps) {
  const [games, setGames] = useState<Game[]>([]);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [pokemonTypes, setPokemonTypes] = useState<PokemonType[]>([]);

  const handleFilterChange = (id: string, value: any) => {
    updateFilters(id, value);
  };

  const handleApply = () => {
    // Put your filter application logic here
    applyFilters();
  };
  useEffect(() => {
    populateFilters();
    setGenerations(
      Array.from({ length: 9 }, (_, i) => ({
        id: i + 1,
        name: `Generation ${i + 1}`,
      })),
    );
  }, []);

  return (
    <>
      <Select
        className="max-w-xs"
        items={games}
        label="Select games"
        placeholder="Select a game"
        selectionMode="multiple"
        scrollShadowProps={{
          isEnabled: false,
        }}
        onSelectionChange={(value) =>
          handleFilterChange('games', Array.from(value))
        }
      >
        {(game) => <SelectItem className="">{game.name}</SelectItem>}
      </Select>

      <Select
        className="max-w-xs"
        items={generations}
        label="Select generations"
        placeholder="Select a generation"
        selectionMode="multiple"
        scrollShadowProps={{
          isEnabled: false,
        }}
        onSelectionChange={(value) =>
          handleFilterChange('generations', Array.from(value))
        }
      >
        {(generation) => (
          <SelectItem className="">{generation.name}</SelectItem>
        )}
      </Select>

      <Select
        className="max-w-xs"
        items={pokemonTypes}
        label="Select types"
        placeholder="Select a type"
        selectionMode="multiple"
        scrollShadowProps={{
          isEnabled: false,
        }}
        onSelectionChange={(value) =>
          handleFilterChange('typeId', Array.from(value))
        }
      >
        {(pokemonType) => (
          <SelectItem className="">{pokemonType.name}</SelectItem>
        )}
      </Select>
      <Switch
        onValueChange={(value) => handleFilterChange('exclusiveType', value)}
      >
        Only Selected Types
      </Switch>
      <Switch onValueChange={(value) => handleFilterChange('legendary', value)}>
        With Legendary
      </Switch>
      <Button color="primary" onPress={handleApply}>
        Apply Filters
      </Button>
    </>
  );

  async function populateFilters() {
    let response = await fetch('api/games');
    let data = await response.json();
    setGames(data);

    response = await fetch('api/type');
    data = await response.json();
    setPokemonTypes(data);

    // Uncomment the following lines to fetch generations when it's implemented
    // response = await fetch('api/generations');
    // data = await response.json();
    // setGenerations(data);
  }
}

export default Filters;
