class MemoryGame {
  constructor(cards) {
    // add the rest of the class properties here
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    const arr = this.cards;
    if (!arr) return undefined;
    let i = arr.length;
    while (--i > 0) {
      let mixedCard = Math.floor(Math.random() * (i + 1));
      [arr[mixedCard], arr[i]] = [arr[i], arr[mixedCard]];
    }
    return arr;
  }

  checkIfPair(card1, card2) {
    this.pairsClicked++;
    if (card1 === card2) {
      this.pairsGuessed++;
      return true;
    } else {
      return false;
    }
  }

  checkIfFinished() {
    if (this.pairsGuessed === this.cards.length / 2) {
      return true;
    } else {
      return false;
    }
  }
}
document.getElementById;
