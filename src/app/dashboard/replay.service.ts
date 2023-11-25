import { Injectable } from '@angular/core';
import { Match } from './match.model';
import { Player } from './player.model';

@Injectable({
  providedIn: 'root'
})
export class ReplayService {
  match: Match | undefined;
  player: Player | undefined;
  replays: Array<Match> = [];
  filteredReplays: Array<Match> = [];
  pokemonList: Array<string> = [];
  pokemonListMap: any = {};
  
  /**
   * returns an array with two indexes for desired string
   * @param str1 string
   * @param str2 string
   * @returns array
   */
  findStringIndex = (str1: string, str2: string) => {
    const output = [];
    for (let i = 0; i < str1.length -1; i++) {
      let arr = [];
      for (let j = i; j < (i+str2.length) && i < str1.length; j++) {
        arr.push(str1[j]);
      }

      const findnew = arr.join('');
      if (findnew === str2) {
        output.push(i);
      }
    }
    return output;
  }

  /**
   * returns the name of the pokemon based on the index of specified string
   * @param pokemonData string
   * @returns string
   */
  getPokemonNameString = (pokemonData: string) => {
    if (!pokemonData) {
      return '';
    }

    const startIndex = pokemonData.indexOf('|poke') + 9;
    const endIndex = pokemonData.indexOf(',');
    return pokemonData.slice(startIndex, endIndex).replace(' ', '').replace('-*', '').toLowerCase();
  }

  /**
   * returns the name of the switched in
   * @param pokemonData string
   * @returns string
   */
  getPokemonSwitchString = (pokemonData: string) => {
    if (!pokemonData) {
      return '';
    }

    const startIndex = this.getPosition(pokemonData, '|', 3) + 1;
    const endIndex = pokemonData.indexOf(',');
    return pokemonData.slice(startIndex, endIndex).replace(' ', '').toLowerCase();
  }

  /**
   * returns the position of a string
   * @param string string
   * @param substring string
   * @param index number
   * @returns number
   */
  getPosition = (string: string, substring: string, index: number) => {
    return string.split(substring, index).join(substring).length;
  }

  /**
   * returns an array of sorted pokemon
   * @param allPokemonUsedInMatch Array<string>
   * @returns Array
   */
  sortPokemon = (allPokemonUsedInMatch: Array<string>) => {
    for (let i = 0; i < allPokemonUsedInMatch.length; i++) {
      if (this.pokemonListMap[allPokemonUsedInMatch[i]] === undefined) {
        this.pokemonListMap[allPokemonUsedInMatch[i]] = 1;
      } else {
        this.pokemonListMap[allPokemonUsedInMatch[i]] += 1;
      }
    }
    let sortable = [];
    for (var pokemon in this.pokemonListMap) {
      sortable.push([pokemon, this.pokemonListMap[pokemon]]);
    }

    sortable.sort((a, b) => {
      return b[1] - a[1];
    });

    return sortable;
  }

  /**
   * returns a string to determine what background to apply to pokemon being displayed on the page
   * @param replay Match
   * @param player1pokemon1 string
   * @param player1lead1 string
   * @param player1lead2 string
   * @param player2pokemon1 string
   * @param player2lead1 string
   * @param player2lead2 string
   * @returns string
   */
  getPokemonBackground = (replay: Match, player1pokemon1: string, player1lead1: string, player1lead2: string,
  player2pokemon1: string, player2lead1: string, player2lead2: string) => {
    const winner = replay.winner;
    const player1 = replay.player1;
    const player2 = replay.player2;

    if (winner === player1) {
      if (player1pokemon1 === player1lead1 || player1pokemon1 === player1lead2) {
        return 'winnerselected imgbackground';
      } else if (player1pokemon1 !== player1lead1 && player1pokemon1 !== player1lead2 && player2pokemon1 === '') {
        return 'winnerunselected imgbackground';
      } else if (player2pokemon1 === player2lead1 || player2pokemon1 === player2lead2) {
        return 'loserselected imgbackground';
      } else if (player2pokemon1 !== player2lead1 && player2pokemon1 !== player2lead2 && player1pokemon1 === '') {
        return 'loserunselected imgbackground';
      } else {
        return '';
      }
    } else if (winner === player2) {
      if (player2pokemon1 === player2lead1 || player2pokemon1 === player2lead2) {
        return 'winnerselected imgbackground';
      } else if (player2pokemon1 !== player2lead1 && player2pokemon1 !== player2lead2 && player1pokemon1 === '') {
        return 'winnerunselected imgbackground';
      } else if (player1pokemon1 === player1lead1 || player1pokemon1 === player1lead2) {
        return 'loserselected imgbackground';
      } else if (player1pokemon1 !== player1lead1 && player1pokemon1 !== player1lead2) {
        return 'loserunselected imgbackground';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }
}
