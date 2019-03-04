import {TKeyframesConfigPropertyStyleMap} from "./t-keyframes-config-property-style-map";

/**
 * Defines the type used to identify a collection of keyframes.
 *
 * String values should be a CSS Style or set of CSS Styles, such as:
 *
 *     "opacity: 0"
 *     "background: purple; transform: translateY(calc(3px + 10%))"
 *
 * Values can also be a style map:
 *     new Map([
 *        ['opacity', 0],
 *        ['background': () => 'purple'],
 *        ['transform': () => `translateY(${someElement.offsetTop}px)`],
 *     ]);
 */
type TKeyframesConfig = [number, string|TKeyframesConfigPropertyStyleMap][];

export {TKeyframesConfig};
