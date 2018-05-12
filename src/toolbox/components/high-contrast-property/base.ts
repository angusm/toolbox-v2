import {Color} from "../../utils/color/color";
import {renderLoop} from "../../utils/render-loop";
import {getElementBehind} from "../../utils/dom/position/get-element-behind";
import {setStyle} from "../../utils/dom/style/set-style";
import {MultiValueDynamicDefaultMap} from "../../utils/map/multi-value-dynamic-default";

interface IHighContrastPropertyOptions {
  getColorMapFn: () => Map<Color, Color>
  getHighContrastColorFn: (target: HTMLElement, bgElement: HTMLElement) => Color,
}

const colorContrastResults =
  MultiValueDynamicDefaultMap.usingFunction(
    ([color, colorOptions]: [Color, Color[]]) => {
      return color.getColorWithHighestContrast(...colorOptions);
    }
  );

abstract class HighContrastProperty {
  private getColorOptionsFn_: () => Color[];
  private getTargetsFn_: () => HTMLElement[];
  private getCandidateBgElements_: () => HTMLElement[];

  private destroyed_: boolean;
  private getColorMapFn_: () => Map<Color, Color>; // Maps background colors to test colors
  private getHighContrastColorFn_: (target: HTMLElement, bgElement: HTMLElement) => Color; // Maps background colors to test colors

  constructor(
    getTargetsFn: () => HTMLElement[],
    getCandidateBgElements: () => HTMLElement[],
    getColorOptionsFn: () => Color[],
    {
      getColorMapFn = () => new Map(),
      getHighContrastColorFn = null,
    }: IHighContrastPropertyOptions = {
        getColorMapFn: () => new Map(),
        getHighContrastColorFn: null,
    },
  ) {
    this.destroyed_ = false;
    this.getTargetsFn_ = getTargetsFn;
    this.getCandidateBgElements_ = getCandidateBgElements;
    this.getColorOptionsFn_ = getColorOptionsFn;
    this.getColorMapFn_ = getColorMapFn;
    this.getHighContrastColorFn_ = getHighContrastColorFn;

    this.init_();
  }

  protected static getProperty(): string {
    return '';
  }

  private init_(): void {
    renderLoop.cleanup(() => this.render_());
  }

  private render_(): void {
    if (this.destroyed_) {
      return; // Stop render loop if destroyed.
    }

    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());
      const bgElements = this.getCandidateBgElements_();
      this.getTargetsFn_().forEach(
        (target) => {
          const bgElement = getElementBehind(target, bgElements);
          const textColorToSet = this.getTextColorToSet_(target, bgElement);

          // Update the color
          renderLoop.mutate(
            () => setStyle(
              target,
              (<typeof HighContrastProperty>this.constructor).getProperty(),
              textColorToSet.toStyleString()));
        });
    });
  }

  private getTextColorToSet_(
    target: HTMLElement, bgElement: HTMLElement
  ): Color {
    const behindBgColor = Color.fromElementBackgroundColor(bgElement);
    if (this.getHighContrastColorFn_) {
      return this.getHighContrastColorFn_(target, bgElement);
    }
    else if (this.getColorMapFn_().has(behindBgColor)) {
      return this.getColorMapFn_().get(behindBgColor);
    }
    else {
      return colorContrastResults
        .get([behindBgColor, this.getColorOptionsFn_()]);
    }
  }

  public destroy(): void {
    this.destroyed_ = true;
  }
}

export {HighContrastProperty};
