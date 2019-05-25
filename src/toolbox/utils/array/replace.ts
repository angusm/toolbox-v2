function replace<V>(values: Array<V>, replacementMap: Map<V, V>): V[] {
  return values
    .map((value) => {
      if (replacementMap.has(value)) {
        return replacementMap.get(value);
      } else {
        return value;
      }
    });
}

export {replace};
