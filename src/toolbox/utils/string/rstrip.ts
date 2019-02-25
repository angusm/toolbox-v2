function rstrip(value: string, characters: string[] = [' ']): string {
  const charSet = new Set(characters);
  let endIndex: number = value.length;
  while (charSet.has(value[endIndex - 1])) {
    endIndex--;
  }
  return value.slice(0, endIndex);
}

export {rstrip};
