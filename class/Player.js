class Player {
  constructor(symbol, score, type) {
    this.symbol = symbol;
    this.score = score;
    this.type = type
  }

  incrementScore(){
      this.score = ++this.score
  }
}