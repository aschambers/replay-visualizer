import { Component } from '@angular/core';
import { Match } from './match.model';
import { Player } from './player.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  match: Match | undefined;
  player: Player | undefined;
  files: Array<string> = [];
  replays: Array<Match> = [];
  filteredReplays: Array<Match> = [];
  pokemonList: Array<string> = [];
  username: string = '';
  displayHtml: string = '';
  pokemonListMap: any = {};
  playerList: Array<string> = [];
  playerRatingList: Array<Player> = [];
  ledPokemonList: Array<string> = [];
  filteredLedPokemonList: Array<string> = [];
  uniquePokemon: Array<string> = [];
  filteredUniquePokemon: Array<string> = [];
  searchType: string = 'ledWith';

  findStringIndex = (str1: any, str2: any) => {
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

  getPokemonNameString = (pokemonData: string) => {
    if (!pokemonData) {
      return '';
    }

    const startIndex = pokemonData.indexOf('|poke') + 9;
    const endIndex = pokemonData.indexOf(',');
    return pokemonData.slice(startIndex, endIndex).replace(' ', '').replace('-*', '').toLowerCase();
  }

  getPokemonSwitchString = (pokemonData: string) => {
    if (!pokemonData) {
      return '';
    }

    const startIndex = this.getPosition(pokemonData, '|', 3) + 1;
    const endIndex = pokemonData.indexOf(',');
    return pokemonData.slice(startIndex, endIndex).replace(' ', '').replace('-*', '').toLowerCase().replace('urshifu-rapid-strike', 'urshifu');
  }

  getPosition = (string: string, substring: string, index: number) => {
    return string.split(substring, index).join(substring).length;
  }

  parseBattleData(battleData: any, index: number, fullUrl: string) {
    const allPokemonUsedInMatch = [];
    const startPlayer1 = battleData.indexOf('|player|p1|');
    const endPlayer1 = battleData.indexOf('|p1') + 4;
    const endPlayer1Name = endPlayer1 + battleData.substring(endPlayer1).indexOf('|') + 1;
    const player1 = battleData.slice(startPlayer1 + 10, endPlayer1Name).replaceAll('|', ' ').replaceAll(' ', '');
    if (!this.playerList.includes(player1)) {
      this.playerList.push(player1);
    }

    const startPlayer2 = battleData.indexOf('|player|p2|');
    const endPlayer2 = battleData.indexOf('|p2') + 4;
    const endPlayer2Name = endPlayer2 + battleData.substring(endPlayer2).indexOf('|') + 1;
    const player2 = battleData.slice(startPlayer2 + 10, endPlayer2Name).replaceAll('|', ' ').replaceAll(' ', '');
    if (!this.playerList.includes(player2)) {
      this.playerList.push(player2);
    }

    const startRatingPlayer1 = startPlayer2 - 5;
    const endRatingPlayer1 = startPlayer2;
    const ratingPlayer1 = battleData.slice(startRatingPlayer1, endRatingPlayer1).replace('\n', '');
    
    const endRatingPlayer2 = battleData.indexOf('|teamsize|p1');
    const startRatingPlayer2 = endRatingPlayer2 - 5;
    const ratingPlayer2 = battleData.slice(startRatingPlayer2, endRatingPlayer2).replace('\n', '');
    if (this.playerRatingList) {
      this.playerRatingList.push({
        player: player1,
        rating: ratingPlayer1
      });

      this.playerRatingList.push({
        player: player2,
        rating: ratingPlayer2
      });
    }

    const pokemonTagPlayer1 = '|poke|p1';
    const pokemonTagPlayer2 = '|poke|p2';
    const teamPreviewIndex = battleData.indexOf('|teampreview');
    const pokemonIndexesPlayer1 = this.findStringIndex(battleData, pokemonTagPlayer1) || [];
    const pokemonIndexesPlayer2 = this.findStringIndex(battleData, pokemonTagPlayer2) || [];

    // player1 pokemon
    const firstPokePlayer1string = battleData.slice(pokemonIndexesPlayer1[0], pokemonIndexesPlayer1[1]);
    const player1pokemon1 = this.getPokemonNameString(firstPokePlayer1string);
    allPokemonUsedInMatch.push(player1pokemon1);
    const secondPokePlayer1string = battleData.slice(pokemonIndexesPlayer1[1], pokemonIndexesPlayer1[2]);
    const player1pokemon2 = this.getPokemonNameString(secondPokePlayer1string);
    allPokemonUsedInMatch.push(player1pokemon2);
    const thirdPokePlayer1string = battleData.slice(pokemonIndexesPlayer1[2], pokemonIndexesPlayer1[3]);
    const player1pokemon3 = this.getPokemonNameString(thirdPokePlayer1string);
    allPokemonUsedInMatch.push(player1pokemon3);
    const fourthPokePlayer1string = battleData.slice(pokemonIndexesPlayer1[3], pokemonIndexesPlayer1[4]);
    const player1pokemon4 = this.getPokemonNameString(fourthPokePlayer1string);
    allPokemonUsedInMatch.push(player1pokemon4);
    const fifthPokePlayer1string = battleData.slice(pokemonIndexesPlayer1[4], pokemonIndexesPlayer1[5]);
    const player1pokemon5 = this.getPokemonNameString(fifthPokePlayer1string);
    allPokemonUsedInMatch.push(player1pokemon5);
    const sixthPokePlayer1string = battleData.slice(pokemonIndexesPlayer1[5], pokemonIndexesPlayer2[0]);
    const player1pokemon6 = this.getPokemonNameString(sixthPokePlayer1string);
    allPokemonUsedInMatch.push(player1pokemon6);

    // player2 pokemon
    const firstPokePlayer2string = battleData.slice(pokemonIndexesPlayer2[0], pokemonIndexesPlayer2[1]);
    const player2pokemon1 = this.getPokemonNameString(firstPokePlayer2string);
    allPokemonUsedInMatch.push(player2pokemon1);
    const secondPokePlayer2string = battleData.slice(pokemonIndexesPlayer2[1], pokemonIndexesPlayer2[2]);
    const player2pokemon2 = this.getPokemonNameString(secondPokePlayer2string);
    allPokemonUsedInMatch.push(player2pokemon2);
    const thirdPokePlayer2string = battleData.slice(pokemonIndexesPlayer2[2], pokemonIndexesPlayer2[3]);
    const player2pokemon3 = this.getPokemonNameString(thirdPokePlayer2string);
    allPokemonUsedInMatch.push(player2pokemon3);
    const fourthPokePlayer2string = battleData.slice(pokemonIndexesPlayer2[3], pokemonIndexesPlayer2[4]);
    const player2pokemon4 = this.getPokemonNameString(fourthPokePlayer2string);
    allPokemonUsedInMatch.push(player2pokemon4);
    const fifthPokePlayer2string = battleData.slice(pokemonIndexesPlayer2[4], pokemonIndexesPlayer2[5]);
    const player2pokemon5 = this.getPokemonNameString(fifthPokePlayer2string);
    allPokemonUsedInMatch.push(player2pokemon5);
    const sixthPokePlayer2string = battleData.slice(pokemonIndexesPlayer2[5], teamPreviewIndex);
    const player2pokemon6 = this.getPokemonNameString(sixthPokePlayer2string);
    allPokemonUsedInMatch.push(player2pokemon6);

    // player1 lead pokemon
    const player1lead1string = '|switch|p1';
    const player2lead1string = '|switch|p2';
    const pokemonLeadIndexesPlayer1 = this.findStringIndex(battleData, player1lead1string);
    const pokemonLeadIndexesPlayer2 = this.findStringIndex(battleData, player2lead1string);

    const firstSelectedPokemonPlayer1string = battleData.slice(pokemonLeadIndexesPlayer1[0], pokemonLeadIndexesPlayer1[1]);
    const player1lead1 = this.getPokemonSwitchString(firstSelectedPokemonPlayer1string);
    if (!this.ledPokemonList.includes(player1lead1)) {
      this.ledPokemonList.push(player1lead1);
    }
    const secondSelectedPokemonPlayer1string = battleData.slice(pokemonLeadIndexesPlayer1[1], pokemonLeadIndexesPlayer1[2]);
    const player1lead2 = this.getPokemonSwitchString(secondSelectedPokemonPlayer1string);
    if (!this.ledPokemonList.includes(player1lead2)) {
      this.ledPokemonList.push(player1lead2);
    }

    const firstSelectedPokemonPlayer2string = battleData.slice(pokemonLeadIndexesPlayer2[0], pokemonLeadIndexesPlayer2[1]);
    const player2lead1 = this.getPokemonSwitchString(firstSelectedPokemonPlayer2string);
    if (!this.ledPokemonList.includes(player2lead1)) {
      this.ledPokemonList.push(player2lead1);
    }
    const secondSelectedPokemonPlayer2string = battleData.slice(pokemonLeadIndexesPlayer2[1], pokemonLeadIndexesPlayer2[2]);
    const player2lead2 = this.getPokemonSwitchString(secondSelectedPokemonPlayer2string);
    if (!this.ledPokemonList.includes(player2lead2)) {
      this.ledPokemonList.push(player2lead2);
    }

    // who won the battle
    const winnerStart = battleData.indexOf('|win|') + 5;
    const winnerEnd = battleData.indexOf('|raw|');
    const winnerEndTwo = battleData.indexOf('|inactive|', winnerStart);
    let winner = battleData.slice(winnerStart, winnerEnd).replace('\n', '');
    if (winner.indexOf('inactive') > -1) {
      winner = battleData.slice(winnerStart, winnerEndTwo).replace('\n', '');
    }

    const matchInfo = {
      player1: player1,
      player1rating: ratingPlayer1,
      player1pokemon1: player1pokemon1,
      player1pokemon2: player1pokemon2,
      player1pokemon3: player1pokemon3,
      player1pokemon4: player1pokemon4,
      player1pokemon5: player1pokemon5,
      player1pokemon6: player1pokemon6,
      player2: player2,
      player2rating: ratingPlayer2,
      player2pokemon1: player2pokemon1,
      player2pokemon2: player2pokemon2,
      player2pokemon3: player2pokemon3,
      player2pokemon4: player2pokemon4,
      player2pokemon5: player2pokemon5,
      player2pokemon6: player2pokemon6,
      player1lead1: player1lead1,
      player1lead2: player1lead2,
      player2lead1: player2lead1,
      player2lead2: player2lead2,
      winner: winner,
      replayLink: fullUrl
    }

    const sortedPokemon = this.sortPokemon(allPokemonUsedInMatch);

    this.replays.push(matchInfo);
    this.filteredReplays.push(matchInfo);
  }

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
        if (!this.uniquePokemon.includes(pokemon)) {
          this.uniquePokemon.push(pokemon);
        }
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return sortable;
  }

  fileChanged(event: any) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.readAsText(files[i], "UTF-8");
      reader.onload = (evt: any) => {
        const battleData = evt.target.result;
        const baseUrl = `C://Users//allis//`;
        const relativePath = files[i].webkitRelativePath;
        const fullUrl = baseUrl + relativePath;
        this.parseBattleData(battleData, i, fullUrl);
      }
      reader.onerror = function () {
        console.log('error reading file');
      }
    }
  }

  getPokemonBackground = (replay: Match, player1pokemon1: string, player1lead1: string, player1lead2: string,
  player2pokemon1: string, player2lead1: string, player2lead2: string) => {
    const winner = replay.winner;
    const player1 = replay.player1;
    const player2 = replay.player2;

    if (winner === player1) {
      if (player1pokemon1 === player1lead1 || player1pokemon1 === player1lead2) {
        return 'winnerselected';
      } else if (player1pokemon1 !== player1lead1 && player1pokemon1 !== player1lead2 && player2pokemon1 === '') {
        return 'winnerunselected';
      } else if (player2pokemon1 === player2lead1 || player2pokemon1 === player2lead2) {
        return 'loserselected';
      } else if (player2pokemon1 !== player2lead1 && player2pokemon1 !== player2lead2 && player1pokemon1 === '') {
        return 'loserunselected';
      } else {
        return '';
      }
    } else if (winner === player2) {
      if (player2pokemon1 === player2lead1 || player2pokemon1 === player2lead2) {
        return 'winnerselected';
      } else if (player2pokemon1 !== player2lead1 && player2pokemon1 !== player2lead2 && player1pokemon1 === '') {
        return 'winnerunselected';
      } else if (player1pokemon1 === player1lead1 || player1pokemon1 === player1lead2) {
        return 'loserselected';
      } else if (player1pokemon1 !== player1lead1 && player1pokemon1 !== player1lead2) {
        return 'loserunselected';
      } else {
        return '';
      }
    } else {
      return '';
    }
  }

  viewReplay = (replayLink: string) => {
    window.open(replayLink);
  }

  filterReplays = (searchValue: string) => {
    this.filteredReplays = this.replays.filter(replay => replay.player1.toLowerCase().includes(searchValue.toLowerCase()));
  }

  filterPokemonLed = (searchValue: string) => {
    const replays = this.replays;

    this.filteredReplays.length = 0; 
    for (let i = 0; i < replays.length; i++) {
      if (replays[i].player1lead1.includes(searchValue) || replays[i].player1lead2.includes(searchValue)
      || replays[i].player2lead1.includes(searchValue) || replays[i].player2lead2.includes(searchValue)) {
        this.filteredReplays.push(replays[i]);
      }
    }
  }

  filterPokemonBrought = (searchValue: string) => {
    const replays = this.replays;

    this.filteredReplays.length = 0;
    for (let i = 0; i < replays.length; i++) {
      if (replays[i].player1pokemon1.includes(searchValue) || replays[i].player1pokemon2.includes(searchValue)
      || replays[i].player1pokemon3.includes(searchValue) || replays[i].player1pokemon4.includes(searchValue)
      || replays[i].player1pokemon5.includes(searchValue) || replays[i].player1pokemon6.includes(searchValue)
      || replays[i].player2pokemon1.includes(searchValue) || replays[i].player2pokemon2.includes(searchValue)
      || replays[i].player2pokemon3.includes(searchValue) || replays[i].player2pokemon4.includes(searchValue)
      || replays[i].player2pokemon5.includes(searchValue) || replays[i].player2pokemon6.includes(searchValue)) {
        this.filteredReplays.push(replays[i]);
      }
    }
  }

  selectSearchType = (event: any) => {
    this.searchType = (event.target as any).value;
    this.filteredReplays.length = 0;
    for (let i = 0; i < this.replays.length; i++) {
      this.filteredReplays.push(this.replays[i]);
    }
  }
}
