/**
 * Simple function that does nothing to its parameter.
 * It is not more concise than (v: T) => v; but importing it and using it
 * makes the intention clear as the naming provides documentation.
 */
function returnUntouched<T>(v: T): T {
  return v;
}

export { returnUntouched };
