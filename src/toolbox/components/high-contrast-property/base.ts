import {Color} from "../../utils/color/color";
import {renderLoop} from "../../utils/render-loop";
import {getElementBehind} from "../../utils/dom/position/get-element-behind";
import {setStyle} from "../../utils/dom/style/set-style";

interface IHighContrastPropertyOptions {
  getColorMapFn: () => Map<Color, Color>
  getHighContrastColorFn: (target: HTMLElement, bgElement: HTMLElement) => Color,
}

abstract class HighContrastProperty {
  private getColorOptionsFn_: () => Color[];
  private target_: HTMLElement;
  private candidateBgElements_: HTMLElement[];

  private destroyed_: boolean;
  private getColorMapFn_: () => Map<Color, Color>; // Maps background colors to test colors
  private getHighContrastColorFn_: (target: HTMLElement, bgElement: HTMLElement) => Color; // Maps background colors to test colors

  constructor(
    target: HTMLElement,
    candidateBgElements: HTMLElement[],
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
    this.target_ = target;
    this.candidateBgElements_ = candidateBgElements;
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
      const bgElement =
        getElementBehind(this.target_, this.candidateBgElements_);
      const textColorToSet = this.getTextColorToSet_(bgElement);

      // Update the color
      renderLoop.mutate(
        () => setStyle(
          this.target_,
          (<typeof HighContrastProperty>this.constructor).getProperty(),
          textColorToSet.toStyleString()));
    });
  }

  private getTextColorToSet_(bgElement: HTMLElement): Color {
    const behindBgColor = Color.fromElementBackgroundColor(bgElement);
    if (this.getHighContrastColorFn_) {
      return this.getHighContrastColorFn_(this.target_, bgElement);
    }
    else if (this.getColorMapFn_().has(behindBgColor)) {
      return this.getColorMapFn_().get(behindBgColor);
    }
    else {
      return behindBgColor
        .getColorWithHighestContrast(...this.getColorOptionsFn_());
    }
  }

  public destroy(): void {
    this.destroyed_ = true;
  }
}

export {HighContrastProperty};
