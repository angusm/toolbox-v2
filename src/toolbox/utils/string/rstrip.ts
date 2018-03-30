function rstrip(value: string): string {
  let endIndex: number = value.length;
  while (value[endIndex - 1] === ' ') {
    endIndex--;
  }
  return value.slice(0, endIndex);
}

export {rstrip};
