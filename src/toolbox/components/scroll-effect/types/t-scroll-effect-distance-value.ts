/**
 * Type of function that returns a start or end distance for a Scroll Effect.
 *
 * Function receives the target HTMLElement and returns a number. May also be
 * a plain-old number for simplicity's sake.
 */
type TScrollEffectDistanceValue = ((t?: Element) => number) | number;

export {TScrollEffectDistanceValue};
