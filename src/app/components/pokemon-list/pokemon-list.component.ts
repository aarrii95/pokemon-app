import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  searchText = '';
  sortOrder = 'asc';
  pageSize = 10;
  currentPage = 1;
  sortType = 'name';

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemon();
  }

  async loadPokemon(searchText = '') {
    const allPokemons = await this.pokemonService.getAllPokemon();
    this.pokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
    this.sortPokemons();
  }

  sortPokemons() {
    if (this.sortType === 'name') {
      this.pokemons.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return this.sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else if (this.sortType === 'number') {
      this.pokemons.sort((a, b) =>
        this.sortOrder === 'asc' ? a.number - b.number : b.number - a.number
      );
    }
  }

  searchPokemon() {
    this.loadPokemon(this.searchText);
  }

  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    this.sortPokemons();
  }

  removePokemon(index: number) {
    this.pokemons.splice(index, 1);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
