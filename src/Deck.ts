import { shuffle } from "./utility";

const computeDeck = (n: number) => {
  let r = 0;
  const d = new Array(n * n + n + 1).fill(0).map(() => [] as number[]);
  //First Card
  d[r] = new Array(n + 1).fill(0).map((_, i) => i);
  // N following cards
  for (let j = 0; j < n; j++) {
    r++;
    d[r].push(0);
    for (let k = 0; k < n; k++) d[r].push(n + 1 + n * j + k);
  }
  // N^2 following cards
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      r++;
      d[r].push(i + 1);
      for (let k = 0; k < n; k++) {
        d[r].push(n + 1 + n * k + ((i * k + j) % n));
      }
    }
  }
  return d;
};

function isPrime(n: number) {
  if (n === 2 || n === 3 || n === 5 || n === 7) {
    return true;
  } else if (n < 2 || n % 2 === 0) {
    return false;
  } else {
    for (var i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  }
}

export class MonoMatchDeck<T> {
  cards: T[][];
  constructor({
    order,
    symbols,
    shuffle = false,
  }: {
    order: number;
    symbols: T[];
    shuffle?: boolean;
  }) {
    if (!isPrime(order)) throw Error("order must be a prime");

    if (symbols.length < order * order + order + 1)
      throw Error("not enough symbols provided for order");
    this.cards = computeDeck(order).map((card) => {
      return card.map((i) => symbols[i]);
    });
    if (shuffle) {
      this.shuffleSymbols();
      this.shuffleDeck();
    }
  }

  shuffleSymbols() {
    this.cards.forEach((v) => shuffle(v));
  }
  shuffleDeck() {
    this.cards = shuffle(this.cards);
  }
}
