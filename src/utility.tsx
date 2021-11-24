export function shuffle<T>(arr: T[]): T[] {
  let cIdx = arr.length;
  while (cIdx !== 0) {
    const rIdx = Math.floor(Math.random() * cIdx);
    cIdx--;
    [arr[cIdx], arr[rIdx]] = [arr[rIdx], arr[cIdx]];
  }
  return arr;
}
