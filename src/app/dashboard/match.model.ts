export class Match {
  public player1: string;
  public player1pokemon1: string;
  public player1pokemon2: string;
  public player1pokemon3: string;
  public player1pokemon4: string;
  public player1pokemon5: string;
  public player1pokemon6: string;
  public player2: string;
  public player2pokemon1: string;
  public player2pokemon2: string;
  public player2pokemon3: string;
  public player2pokemon4: string;
  public player2pokemon5: string;
  public player2pokemon6: string;
  public winner: string;


  constructor(player1: string, player1pokemon1: string, player1pokemon2: string, player1pokemon3: string, player1pokemon4: string,
  player1pokemon5: string, player1pokemon6: string, player2: string, player2pokemon1: string, player2pokemon2: string,
  player2pokemon3: string, player2pokemon4: string, player2pokemon5: string, player2pokemon6: string, winner: string) {
    this.player1 = player1;
    this.player1pokemon1 = player1pokemon1;
    this.player1pokemon2 = player1pokemon2;
    this.player1pokemon3 = player1pokemon3;
    this.player1pokemon4 = player1pokemon4;
    this.player1pokemon5 = player1pokemon5;
    this.player1pokemon6 = player1pokemon6;
    this.player2 = player2;
    this.player2pokemon1 = player2pokemon1;
    this.player2pokemon2 = player2pokemon2;
    this.player2pokemon3 = player2pokemon3;
    this.player2pokemon4 = player2pokemon4;
    this.player2pokemon5 = player2pokemon5;
    this.player2pokemon6 = player2pokemon6;
    this.winner = winner;
  }
}