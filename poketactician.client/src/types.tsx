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
