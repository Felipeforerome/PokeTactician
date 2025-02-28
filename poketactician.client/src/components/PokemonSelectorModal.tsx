import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Autocomplete,
  AutocompleteItem,
  Image,
} from "@heroui/react";
import { useState, useEffect } from 'react';
import { PokemonName, PokemonMove } from '../types';
import { formatString } from '../utils';

interface PokemonSelectorModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  addPokemon: (pokemon: [string | null, ...string[]][]) => void;
}

function PokemonSelectorModal({
  isOpen,
  onOpenChange,
  addPokemon,
}: PokemonSelectorModalProps) {
  const [pokemonNames, setPokemonNames] = useState<PokemonName[]>([]);
  const [pokemonMoves, setPokemonMoves] = useState<PokemonMove[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);
  const [selectedMoves, setSelectedMoves] = useState<string[]>([]);

  /**
   * Handles the selection of a Pokémon.
   *
   * @param pokemon - The Pokémon to be selected.
   *
   * The function performs the following actions:
   * - If the selected Pokémon is 'null', the selectedMoves array is reset to an empty array.
   * - If the selected Pokémon is not 'null', the selectedMoves array is reset to an empty array and the moves for the selected Pokémon are fetched.
   */
  function handleSelectedPokemon(pokemon: string) {
    setPokemonMoves([]);
    if (pokemon === 'null') {
      setSelectedPokemon(null);
      setPokemonMoves([]);
    }
    if (pokemon !== 'null') {
      setSelectedPokemon(pokemon);
      fetchPokemonMoves(pokemon);
    }
  }

  /**
   * Handles the selection of a move for a Pokémon.
   *
   * @param move - The move to be selected or deselected.
   * @param moveIndex - The index at which the move is to be placed or removed.
   *
   * The function performs the following actions:
   * - If the move is not already selected and is not 'null':
   *   - If the moveIndex is equal to the length of the selectedMoves array, the move is added to the end of the array.
   *   - If the moveIndex is less than the length of the selectedMoves array, the move at the specified index is replaced with the new move.
   * - If the move is 'null':
   *   - If the moveIndex is the last index of the selectedMoves array, the last move is removed. If the new last move is also 'null', it continues to remove moves until a non-null move is found.
   *   - If the moveIndex is not the last index, the move at the specified index is set to 'null'.
   */
  function handleSelectedMove(move: string, moveIndex: number) {
    if (!selectedMoves.includes(move) && move !== 'null') {
      if (moveIndex === selectedMoves.length) {
        setSelectedMoves([...selectedMoves, move]);
      } else if (moveIndex < selectedMoves.length) {
        const updatedMoves = [...selectedMoves];
        updatedMoves[moveIndex] = move;
        setSelectedMoves(updatedMoves);
      }
    }
    if (move === 'null') {
      const updatedMoves = [...selectedMoves];
      if (moveIndex === updatedMoves.length - 1) {
        updatedMoves.pop();
        let lastMove = updatedMoves.at(-1);
        while (lastMove === 'null') {
          updatedMoves.pop();
          lastMove = updatedMoves.at(-1);
        }
      } else {
        updatedMoves[moveIndex] = 'null';
      }
      setSelectedMoves(updatedMoves);
    }
  }

  function onCloseReset() {
    setSelectedPokemon(null);
    setSelectedMoves([]);
    onOpenChange(false);
  }

  function handleAddPokemon() {
    addPokemon([[selectedPokemon, ...selectedMoves]]);
    setSelectedPokemon(null);
    setSelectedMoves([]);
    onOpenChange(false);
  }

  useEffect(() => {
    fetchPokemonNames();
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={onOpenChange}
        onClose={onCloseReset}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Preselect a Pokemon for you team!
            </ModalHeader>
            <ModalBody>
              <div className="flex justify-center">
                <Image
                  alt={'name'}
                  className={`object-cover rounded-lg`}
                  height="100%"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemon}.png`}
                  // width="50%"
                />
              </div>
              <Autocomplete
                className="max-w-xs"
                defaultItems={pokemonNames}
                label="Select Pokemon"
                placeholder="Select a Pokemon"
                scrollShadowProps={{
                  isEnabled: false,
                }}
                onSelectionChange={(pokemon) =>
                  handleSelectedPokemon(String(pokemon))
                }
              >
                {(pokemonName) => (
                  <AutocompleteItem key={pokemonName.id}>
                    {formatString(pokemonName.name)}
                  </AutocompleteItem>
                )}
              </Autocomplete>

              {/* Move Autocompletes */}
              <div className="grid grid-cols-2 gap-4">
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={pokemonMoves}
                  label={`Select a Move`}
                  placeholder="Select a Move"
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  onSelectionChange={(move) => {
                    handleSelectedMove(String(move), 0);
                  }}
                  disabledKeys={selectedMoves}
                  isDisabled={selectedPokemon === null}
                >
                  {(pokemonName) => (
                    <AutocompleteItem key={pokemonName.id}>
                      {formatString(pokemonName.name)}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={pokemonMoves}
                  label={`Select a Move`}
                  placeholder="Select a Move"
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  onSelectionChange={(move) => {
                    handleSelectedMove(String(move), 1);
                  }}
                  disabledKeys={selectedMoves}
                  isDisabled={
                    selectedPokemon === null || selectedMoves.length < 1
                  }
                >
                  {(pokemonName) => (
                    <AutocompleteItem key={pokemonName.id}>
                      {formatString(pokemonName.name)}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={pokemonMoves}
                  label={`Select a Move`}
                  placeholder="Select a Move"
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  disabledKeys={selectedMoves}
                  onSelectionChange={(move) => {
                    handleSelectedMove(String(move), 2);
                  }}
                  isDisabled={
                    selectedPokemon === null || selectedMoves.length < 2
                  }
                >
                  {(pokemonName) => (
                    <AutocompleteItem key={pokemonName.id}>
                      {formatString(pokemonName.name)}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
                <Autocomplete
                  className="max-w-xs"
                  defaultItems={pokemonMoves}
                  label={`Select a Move`}
                  placeholder="Select a Move"
                  scrollShadowProps={{
                    isEnabled: false,
                  }}
                  disabledKeys={selectedMoves}
                  onSelectionChange={(move) => {
                    handleSelectedMove(String(move), 3);
                  }}
                  isDisabled={
                    selectedPokemon === null || selectedMoves.length < 3
                  }
                >
                  {(pokemonName) => (
                    <AutocompleteItem key={pokemonName.id}>
                      {formatString(pokemonName.name)}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={handleAddPokemon}>
                Add
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );

  async function fetchPokemonNames() {
    const response = await fetch('/api/pokemons/namesList');
    const data = await response.json();
    setPokemonNames(data);
  }

  async function fetchPokemonMoves(id: string) {
    const response = await fetch(`/api/pokemons/${id}/moves`);
    const data = await response.json();
    setPokemonMoves(data);
  }
}

export default PokemonSelectorModal;
