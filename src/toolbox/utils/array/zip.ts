function zip<T>(...lists:T[][]): T[][] {
  const result = [];
  let i = 0;
  let remainingLists = lists.filter((list) => list.length > i);
  while (remainingLists.length) {
    result[i] = remainingLists.map((list) => list[i]);
    i++;
    remainingLists = remainingLists.filter((list) => list.length > i);
  }
  return result;
}

export {zip};
