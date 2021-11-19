import { shuffle } from "./utility";

let primes: number[] = [];

const primeSieve = (n: number) => {
  let prime = Array.from({ length: n + 1 }, (_, i) => true);
  for (let i = 0; i < n; i++) prime[i] = true;
  for (let p = 2; p * p <= n; p++) {
    if (prime[p]) {
      for (let i = p * 2; i <= n; i += p) prime[i] = false;
    }
  }
  for (let i = 2; i <= n; i++) {
    if (prime[i]) primes.push(i);
  }
};

const powerOfPrime = (n: number) => {
  for (let ii = 0; ii < primes.length; ii++) {
    let i = primes[ii];
    if (n % i === 0) {
      while (n % i === 0) n /= i;
      if (n === 1) return true;
      else return false;
    }
  }
  return false;
};

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

export class MonoMatchDeck {
  deck: any[][];
  constructor({
    order,
    symbols,
    shuffle = false,
  }: {
    order: number;
    symbols: any[];
    shuffle?: boolean;
  }) {
    primeSieve(order);
    if (!powerOfPrime(order)) throw Error("order must be a power of a prime");
    if (symbols.length < order * order + order + 1)
      throw Error("not enough symbols provided for order");
    this.deck = computeDeck(order).map((card) => {
      return card.map((i) => symbols[i]);
    });
    if (shuffle) {
      this.shuffleSymbols();
      this.shuffleDeck();
    }
  }

  shuffleSymbols() {
    this.deck.forEach((v) => shuffle(v));
  }
  shuffleDeck() {
    this.deck = shuffle(this.deck);
  }
}

// export class Deck {
//   symbols: any[];
//   cards: any[];

//   constructor({
//     numCards,
//     symbols = ["A", "B", "C"],
//     // symbols = ["🚀", "🛰", "☄️", "🪐", "🛸"],
//     shuffle = false,
//   }: {
//     numCards: number;
//     symbols?: any[];
//     shuffle?: boolean;
//   }) {
//     this.symbols = symbols; //, "D", "E", "F", "G"];
//     this.cards = new Array(numCards).fill(0).map(() => [...this.symbols]);
//     if (shuffle) this.shuffleSymbols();
//   }

//   shuffleSymbols() {
//     this.cards.forEach((v) => {
//       let cIdx = v.length;
//       while (cIdx !== 0) {
//         const rIdx = Math.floor(Math.random() * cIdx);
//         cIdx--;
//         [v[cIdx], v[rIdx]] = [v[rIdx], v[cIdx]];
//       }
//     });
//   }
//   shuffleDeck() {
//     let cIdx = this.cards.length;
//     while (cIdx !== 0) {
//       const rIdx = Math.floor(Math.random() * cIdx);
//       cIdx--;
//       [this.cards[cIdx], this.cards[rIdx]] = [
//         this.cards[rIdx],
//         this.cards[cIdx],
//       ];
//     }
//   }
// }
