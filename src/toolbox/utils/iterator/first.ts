function first<T>(iterator: Iterator<T>, evaluationFn: (t: T) => boolean): T {
  let done: boolean = false;

  while (!done) {
    const result: IteratorResult<T> = iterator.next();
    if (evaluationFn(result.value)) {
      return result.value;
    }
    done = result.done;
  }

  return undefined;
}

export {first};
