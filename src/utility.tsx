export function shuffle(arr: any[]): any[] {
  let cIdx = arr.length;
  while (cIdx !== 0) {
    const rIdx = Math.floor(Math.random() * cIdx);
    cIdx--;
    [arr[cIdx], arr[rIdx]] = [arr[rIdx], arr[cIdx]];
  }
  return arr;
}
