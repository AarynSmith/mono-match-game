import { MonoMatchDeck } from "./Deck";

test("Monomatch", () => {
  expect(() => new MonoMatchDeck({ order: 10, symbols: [] })).toThrowError(
    "order must be a prime"
  );
  expect(
    () =>
      new MonoMatchDeck({
        order: 2,
        symbols: new Array(6).fill(0).map((_, i) => i),
      })
  ).toThrowError("not enough symbols provided for order");
  expect(
    () =>
      new MonoMatchDeck({
        order: 2,
        symbols: new Array(7).fill(0).map((_, i) => i),
      })
  ).not.toThrowError();
  expect(
    () =>
      new MonoMatchDeck({
        order: 3,
        symbols: new Array(13).fill(0).map((_, i) => i),
      })
  ).not.toThrowError();
  expect(
    () =>
      new MonoMatchDeck({
        order: 4,
        symbols: new Array(21).fill(0).map((_, i) => i),
      })
  ).toThrowError();
  expect(
    () =>
      new MonoMatchDeck({
        order: 5,
        symbols: new Array(31).fill(0).map((_, i) => i),
      })
  ).not.toThrowError();
  expect(
    () =>
      new MonoMatchDeck({
        order: 7,
        symbols: new Array(57).fill(0).map((_, i) => i),
      })
  ).not.toThrowError();

  const o2 = new MonoMatchDeck({
    order: 3,
    symbols: new Array(13).fill(0).map((_, i) => String.fromCharCode(65 + i)),
  });
  expect(o2.cards).toHaveLength(13);
});

describe("Monomatch - Verify", () => {
  const orders = [11, 13, 17];
  const symbols = new Array(1000).fill(0).map((_, i) => i);
  for (const order of orders) {
    test(`Verify Order: ${order}`, async () => {
      const m = new MonoMatchDeck({ order, symbols });
      expect(m.cards.length).toEqual(order * order + order + 1);
      for (let a = 0; a < m.cards.length - 1; a++) {
        for (let b = a + 1; b < m.cards.length; b++) {
          const CardA = m.cards[a];
          const CardB = m.cards[b];
          const sect = new Set([...CardA].filter((x) => new Set(CardB).has(x)));
          if (sect.size !== 1)
            console.log({
              CardA,
              CardB,
              length: sect.size,
              matches: sect,
            });
          expect(sect.size).toEqual(1);
        }
      }
    });
  }
});
