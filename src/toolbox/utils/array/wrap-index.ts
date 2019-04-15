function wrapIndex(index: number, length: number): number {
  if (index < 0) {
    return length + (index % length);
  } else {
    return index % length;
  }
}

export {wrapIndex};
