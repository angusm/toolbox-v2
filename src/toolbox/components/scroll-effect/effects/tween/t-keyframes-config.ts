/**
 * Defines the type used to identify a collection of keyframes.
 *
 * String values should be a CSS Style or set of CSS Styles, such as:
 *
 *     "opacity: 0"
 *     "background: purple; transform: translateY(calc(3px + 10%))"
 */
type TKeyframesConfig = [number, string][];

export {TKeyframesConfig};
