function zip<T>(...lists:T[][]): T[][] {
  return [...lists].reduce(
    (result: T[][], list: T[]) => {
      list.forEach(
        (listItem: T, index: number) => {
          result[index] = [...(result[index] || []), listItem]});
      return result;
    },
    []
  );
}

export {zip};
