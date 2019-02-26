import {IEffect} from "./i-effect";
import {min} from "../../../utils/array/min";

/**
 * Collects other effects and determines which one to run by window width.
 */
class BreakpointEffects implements IEffect {
  private readonly effectsByBreakpoint_: Map<number, IEffect[]>;

  /**
   * @param tweenConfig Key-value-pairs defining effects and breakpoints.
   *
   * Expects a number and an array of effects to run when the window's inner
   * width is less than that number.
   *
   * The effects run will be those of the smallest provided breakpoint that is
   * still larger than the window's inner width.
   *
   * A default set of effects for the largest screen size can be given by
   * providing a Number.POSITIVE_INFINITY breakpoint.
   */
  constructor(tweenConfig: [number, IEffect[]][]) {
    this.effectsByBreakpoint_ = new Map(tweenConfig);
  }

  /**
   * Runs the effects configured in the constructor for the current breakpoint.
   * @param target Element targeted by the calling ScrollEffect.
   * @param distance Distance scrolled as a number.
   * @param distanceAsPercent Distance scrolled as a percent of a valid range.
   */
  run(target: HTMLElement, distance: number, distanceAsPercent: number) {
    const windowWidth = window.innerWidth;
    const breakpoints = Array.from(this.effectsByBreakpoint_.keys());
    const validBreakpoints = breakpoints.filter((bp) => windowWidth < bp);
    const smallestValidBreakpoint = min(validBreakpoints, (v) => v);

    const effects = this.effectsByBreakpoint_.get(smallestValidBreakpoint);
    effects
      .forEach((effect) => effect.run(target, distance, distanceAsPercent));
  }

  /**
   * Destroys the effect.
   */
  destroy() {
    this.effectsByBreakpoint_.clear();
  }
}

export {BreakpointEffects};
