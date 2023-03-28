import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151';

  constructor() {}

  async getAllPokemon() {
    const response = await axios.get(this.apiUrl);
    const basicInfo = response.data.results;

    const pokemons = await Promise.all(
      basicInfo.map(async (pokemon: any) => {
        const detailsResponse = await axios.get(pokemon.url);
        return {
          name: pokemon.name,
          number: detailsResponse.data.id,
          imageUrl: detailsResponse.data.sprites.front_default,
        };
      })
    );

    return pokemons;
  }
}
