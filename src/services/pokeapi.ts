// src/services/pokeapi.ts
import axios from 'axios';
import { PokemonAPIResponse, TransformedPokemon } from '../types/pokemon.types';

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Fetches a random Pokémon from the API
 * @returns {Promise<TransformedPokemon>} Transformed Pokémon data
 */
export const fetchRandomPokemon = async (): Promise<TransformedPokemon> => {
  try {
    // Get random ID between 1 and 898 (Gen 1-8)
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    const response = await axios.get<PokemonAPIResponse>(`${BASE_URL}/pokemon/${randomId}`);
    const pokemon = response.data;
    
    // Transform the data to our needs
    return {
      id: pokemon.id,
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      abilities: pokemon.abilities.map(a => a.ability.name),
      types: pokemon.types.map(t => t.type.name),
      stats: pokemon.stats.map(s => ({
        name: s.stat.name,
        value: s.base_stat,
      })),
    };
  } catch (error) {
    console.error('Error fetching Pokémon:', error);
    throw error;
  }
};

/**
 * Gets the image URL for a Pokémon using the dream-world SVG format
 * @param {number} id - Pokémon ID
 * @returns {string} Image URL
 */
export const getPokemonImageUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
};

/**
 * Alternative image URL using official artwork
 * @param {number} id - Pokémon ID
 * @returns {string} Image URL
 */
export const getOfficialArtworkUrl = (id: number): string => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};

/**
 * Fetches multiple random Pokémon
 * @param {number} count - Number of Pokémon to fetch
 * @returns {Promise<TransformedPokemon[]>} Array of Pokémon data
 */
export const fetchMultipleRandomPokemon = async (count: number = 10): Promise<TransformedPokemon[]> => {
  const promises: Promise<TransformedPokemon>[] = [];
  for (let i = 0; i < count; i++) {
    promises.push(fetchRandomPokemon());
  }
  return Promise.all(promises);
};