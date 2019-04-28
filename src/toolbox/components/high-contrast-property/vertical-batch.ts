import {renderLoop} from "../../utils/render-loop";
import {NumericRange} from "../../utils/math/numeric-range";
import {Color} from "../../utils/color/color";
import {setStyle} from "../../utils/dom/style/set-style";
import {getVisibleCenterYPosition} from "../../utils/dom/position/vertical/get-visible-center-y-position";
import {getVisibleYRange} from "../../utils/dom/position/vertical/get-visible-y-range";
import {ArrayMap} from "../../utils/map/array";

interface ITarget {
  element: HTMLElement;
  properties: string[];
}

interface IOptions {
  limit: boolean;
  colorMap: Map<Color, Color>;
}

class VerticalBatchHighContrastProperty {
  private targets_: ITarget[];
  private backgrounds_: HTMLElement[];
  private getColorOptionsFn_: () => Color[];

  // Optionally set properties
  private limit_: boolean;
  private colorMap_: Map<Color, Color>;

  constructor(
    targets: ITarget[],
    backgrounds: HTMLElement[],
    getColorOptionsFn: () => Color[],
    {
      limit = false,
      colorMap = new Map(),
    }: IOptions = {
      limit: false,
      colorMap: new Map(),
    }
  ) {
    this.targets_= targets;
    this.backgrounds_ = backgrounds;
    this.getColorOptionsFn_ = getColorOptionsFn;

    this.limit_ = limit;
    this.colorMap_ = colorMap;

    this.render();
  }

  public render() {
    renderLoop.measure(() => {
      if (!this.limit_) {
        renderLoop.cleanup(() => this.render());
      }

      const ranges = this.getBackgroundHeightRanges_();
      const yPositions = this.getTargetYPositions_();
      Array.from(yPositions.entries()).forEach(
        ([yPosition, targets]) => {
          targets.forEach((target) => {
            Array.from(ranges.entries()).some(
              ([range, backgroundElement]) => {
                if (range.contains(yPosition)) {
                  this.updateTarget_(target, backgroundElement);
                  // No point checking an updated target
                  return true; // Short circuits
                }
              }
            );
          });
        });
    });
  }

  private updateTarget_(target: ITarget, backgroundElement: HTMLElement) {
    // Update the color
    const colorToSet = this.getColorToSet_(backgroundElement);
    renderLoop.mutate(
      () => {
        target.properties.forEach((property) => {
          setStyle(target.element, property, colorToSet.toStyleString());
        });
      });
  }

  private getColorToSet_(bgElement: HTMLElement): Color {
    const behindBgColor = Color.fromElementBackgroundColor(bgElement);
    const colorOptions = this.getColorOptionsFn_();
    if (
      this.colorMap_.has(behindBgColor) &&
      colorOptions.some((c) => c === this.colorMap_.get(behindBgColor))
    ) {
      return this.colorMap_.get(behindBgColor);
    }
    else {
      return behindBgColor.getColorWithHighestContrast(...colorOptions);
    }
  }

  private getBackgroundHeightRanges_(): Map<NumericRange, HTMLElement> {
    const windowRange = new NumericRange(0, window.innerHeight);
    return this.backgrounds_
      .reduce(
        (mapping, background) => {
          const visibleRange = getVisibleYRange(background);
          if (visibleRange.hasOverlap(windowRange)) {
            mapping.set(visibleRange, background);
          }
          return mapping;
        },
        new Map()
      );
  }

  private getTargetYPositions_(): ArrayMap<number, ITarget> {
    const windowRange = new NumericRange(0, window.innerHeight);
    return this.targets_
      .reduce(
        (mapping, target) => {
          const centerY = getVisibleCenterYPosition(target.element);
          if (windowRange.contains(centerY)) {
            mapping.get(centerY).push(target);
          }
          return mapping;
        },
        new ArrayMap<number, ITarget>()
      );
  }
}

export {VerticalBatchHighContrastProperty};
