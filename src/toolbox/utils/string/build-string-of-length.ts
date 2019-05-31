function buildStringOfLength(length: number, charactersToUse: string = ' ') {
  let result = '';
  while (result.length < length) {
    result += charactersToUse;
  }
  return result.slice(0, length);
}

export {buildStringOfLength};
