function replace<V, K=V>(values: Array<K|V>, replacementMap: Map<K, V>): V[] {
  return values
    .map((value) => {
      if (replacementMap.has(<K>value)) {
        return replacementMap.get(<K>value);
      } else {
        return <V>value;
      }
    });
}

export {replace};
