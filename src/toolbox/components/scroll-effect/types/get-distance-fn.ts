/**
 * Type of functions returning scroll distances for use by ScrollEffect.
 *
 * Receives a target HTMLElement and returns a number.
 *
 * Some defaults can be found in DistanceFunction, but feel free to get wild
 * and implement your own as needed.
 */
type GetDistanceFn = (target: HTMLElement) => number;

export {GetDistanceFn};
