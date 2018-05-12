import {renderLoop} from "../../utils/render-loop";
import {Range} from "../../utils/math/range";
import {Color} from "../../utils/color/color";
import {setStyle} from "../../utils/dom/style/set-style";
import {getVisibleCenterYPosition} from "../../utils/dom/position/vertical/get-visible-center-y-position";
import {getVisibleYRange} from "../../utils/dom/position/vertical/get-visible-y-range";

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
  private colorOptions_: Color[];

  // Optionally set properties
  private limit_: boolean;
  private colorMap_: Map<Color, Color>;

  constructor(
    targets: ITarget[],
    backgrounds: HTMLElement[],
    colorOptions: Color[],
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
    this.colorOptions_ = colorOptions;

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
      Array.from(ranges.entries()).forEach(
        ([range, backgroundElement]) => {
          Array.from(yPositions.entries()).forEach(
            ([yPosition, target]) => {
              if (range.contains(yPosition)) {
                this.updateTarget_(target, backgroundElement);
              }
            }
          );
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
    if (this.colorMap_.has(behindBgColor)) {
      return this.colorMap_.get(behindBgColor);
    }
    else {
      behindBgColor.getColorWithHighestContrast(...this.colorOptions_);
    }
  }

  private getBackgroundHeightRanges_(): Map<Range, HTMLElement> {
    const windowRange = new Range(0, window.innerHeight);
    return this.backgrounds_
      .reduce(
        (mapping, background) => {
          const visibleRange = getVisibleYRange(background);
          if (visibleRange.getOverlap(windowRange) !== null) {
            mapping.set(visibleRange, background);
          }
          return mapping;
        },
        new Map()
      );
  }

  private getTargetYPositions_(): Map<number, ITarget> {
    const windowRange = new Range(0, window.innerHeight);
    return this.targets_
      .reduce(
        (mapping, target) => {
          const centerY = getVisibleCenterYPosition(target.element);
          if (windowRange.contains(centerY)) {
            mapping.set(centerY, target);
          }
          return mapping;
        },
        new Map()
      );
  }
}

export {VerticalBatchHighContrastProperty};
