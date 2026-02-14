// src/types/pokemon.types.ts
export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonSprites {
  other?: {
    'dream_world'?: {
      front_default: string | null;
    };
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokemonAPIResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  types: PokemonType[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
}

export interface TransformedPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  types: string[];
  stats: {
    name: string;
    value: number;
  }[];
}

export interface LikedPokemon extends TransformedPokemon {}

export type RootStackParamList = {
  Welcome: undefined;
  Swipe: undefined;
  LikedPokemon: undefined;
};