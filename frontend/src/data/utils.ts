export function deleteFromArray<Type>(arr: Type[], indexToRemove: number) {
  return [...arr.slice(0, indexToRemove), ...arr.slice(indexToRemove + 1)];
}
