/**
 * Positions the the element could be sticking to within the container.
 *
 * How the target element is positioned by sticky will change depending on
 * whether its container is showing its top, middle or bottom most prominently.
 */
class Sticky2ContainerPosition {
  public static TOP: Symbol = Symbol('top');
  public static MIDDLE: Symbol = Symbol('middle');
  public static BOTTOM: Symbol = Symbol('bottom');
}

export {Sticky2ContainerPosition};
