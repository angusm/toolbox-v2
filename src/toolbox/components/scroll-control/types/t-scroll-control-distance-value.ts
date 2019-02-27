/**
 * Type of function that returns a start or end distance for a Scroll Control.
 *
 * Function receives the frame HTMLElement and returns a number. May also be
 * a plain-old number for simplicity's sake.
 */
type TScrollControlDistanceValue = ((t?: HTMLElement) => number) | number;

export {TScrollControlDistanceValue};
