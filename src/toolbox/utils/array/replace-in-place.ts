function replaceInPlace<V>(values: Array<V>, replacementMap: Map<V, V>): V[] {
  for (let i = 0; i < values.length; i++) {
    if (replacementMap.has(values[i])) {
      values[i] = replacementMap.get(values[i]);
    }
  }
  return values;
}

export {replaceInPlace};
