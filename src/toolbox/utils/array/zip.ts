function zip<T>(...lists:Array<T>[]): Array<T>[] {
  return [...lists].reduce(
    (result, list) => {
      list.forEach(
        (listItem, index) => {
          result[index] = [...(result[index] || []), listItem]});
      return result;
    },
    []
  );
}

export {zip};
