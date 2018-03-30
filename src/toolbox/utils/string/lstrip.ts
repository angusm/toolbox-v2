function lstrip(value: string): string {
  let startIndex: number = 0;
  while (value[startIndex] === ' ') {
    startIndex++;
  }
  return value.slice(startIndex);
}

export {lstrip};
