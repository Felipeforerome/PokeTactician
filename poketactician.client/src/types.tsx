export interface Pokemon {
  id: number;
  name: string;
  hp: number;
  att: number;
  deff: number;
  spAtt: number;
  spDeff: number;
  spe: number;
  type1: string;
  type2: string;
  moves: PokemonMove[];
}

export interface PokemonName {
  id: number;
  name: string;
}

export interface PokemonMove {
  id: number;
  name: string;
}

export interface Game {
  id: number;
  name: string;
}

export interface Generation {
  id: number;
  name: string;
}

export interface PokemonType {
  id: number;
  name: string;
}

export interface ObjectiveFunction {
  name: string;
  value: string;
}

export interface Strategy {
  key: string;
  text: string;
}

export interface Role {
  value: string;
  text: string;
}

// Generic item interface that your data types should match or extend
export interface SelectableItem {
  value: string;
  name: string;
}
