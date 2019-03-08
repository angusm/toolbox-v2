import {IEffect} from "./i-effect";
import {NumericRange} from "../../../utils/math/numeric-range";
import {flatten} from "../../../utils/array/flatten";
import {merge} from "../../../utils/set/merge";
import {subtract} from "../../../utils/set/subtract";
import {addClassesFromSet} from "../../../utils/dom/class/add-classes-from-set";
import {removeClassesFromSet} from "../../../utils/dom/class/remove-classes-from-set";

class AddClassAtPercent implements IEffect {
  private readonly allClasses_: Set<string>;
  private readonly cssClassesByRange_: [NumericRange, Set<string>][];
  private readonly styleTarget_: HTMLElement;
  private destroyed_: boolean;

  constructor(
    config: [number, string[]][],
    {
      styleTarget = null,
    }: {
      styleTarget?: HTMLElement,
    } = {}
  ) {
    this.allClasses_ = AddClassAtPercent.extractAllClasses_(config);
    this.cssClassesByRange_ = AddClassAtPercent.generateClassesByRange_(config);
    this.styleTarget_ = styleTarget;
    this.destroyed_ = false;
  }

  private static extractAllClasses_(config: [number, string[]][]): Set<string> {
    return new Set(flatten(config.map(([position, cssClasses]) => cssClasses)));
  }

  private static generateClassesByRange_(
    config: [number, string[]][]
  ): [NumericRange, Set<string>][] {
    const result = [];
    let start = Number.NEGATIVE_INFINITY;
    let end = Number.NEGATIVE_INFINITY;
    let lastCssClasses: string[] = [];
    for (let keyframeIndex = 0; keyframeIndex < config.length; keyframeIndex++) {
      const keyframe = config[keyframeIndex];
      const position = keyframe[0];
      start = end;
      end = position;
      result.push(
        <[NumericRange, Set<string>]>
          [new NumericRange(start, end), new Set(lastCssClasses)]);
      lastCssClasses = keyframe[1];
    }

    start = end;
    end = Number.POSITIVE_INFINITY;
    result.push(
      <[NumericRange, Set<string>]>
        [new NumericRange(start, end), new Set(lastCssClasses)]);

    return result;
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    if (this.destroyed_) {
      return;
    }

    const classesToAdd =
      merge(
        ...this.cssClassesByRange_
          .filter(([range, cssClasses]) => range.contains(distanceAsPercent))
          .map(([range, cssClasses]) => cssClasses));
    const classesToRemove = subtract(this.allClasses_, classesToAdd);
    const styleTarget = this.styleTarget_ || target;
    addClassesFromSet(styleTarget, classesToAdd)
    removeClassesFromSet(styleTarget, classesToRemove)
  }

  /**
   * Destroys the effect.
   */
  destroy() {
    this.destroyed_ = true;
  }
}

export {AddClassAtPercent}
