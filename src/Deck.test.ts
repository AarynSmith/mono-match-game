import { MonoMatchDeck } from "./Deck";

test("Monomatch", () => {
  expect(() => new MonoMatchDeck({ order: 10, symbols: [] })).toThrowError(
    "order must be a power of a prime"
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
  ).not.toThrowError();
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
  expect(o2.deck).toHaveLength(13);
});
