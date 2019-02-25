function lstrip(value: string, characters: string[] = [' ']): string {
  const charSet = new Set(characters);
  let startIndex: number = 0;
  while (charSet.has(value[startIndex])) {
    startIndex++;
  }
  return value.slice(startIndex);
}

export {lstrip};
