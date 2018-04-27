import {Color} from "../../utils/color/color";
import {renderLoop} from "../../utils/render-loop";
import {getElementBehind} from "../../utils/dom/position/get-element-behind";
import {setStyle} from "../../utils/dom/style/set-style";

class ColorTextFromBackground {
  private target_: HTMLElement;
  private candidateBgElements_: HTMLElement[];
  private colorOptions_: Color[];
  private destroyed_: boolean;
  private colorMap_: Map<Color, Color>; // Maps background colors to test colors

  constructor(
    target: HTMLElement,
    candidateBgElements: HTMLElement[],
    colorOptions: Color[],
    colorMap: Map<Color, Color> = null,
  ) {
    this.destroyed_ = false;
    this.target_ = target;
    this.candidateBgElements_ = candidateBgElements;
    this.colorOptions_ = colorOptions;
    this.colorMap_ = colorMap || new Map();

    this.init_();
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
      const elementBehind =
        getElementBehind(this.target_, this.candidateBgElements_);
      const behindBgColor = Color.fromElementBackgroundColor(elementBehind);
      const textColorToSet = this.getTextColorToSet_(behindBgColor);

      renderLoop.mutate(
        () => setStyle(this.target_, 'color', textColorToSet.toStyleString()));
    });
  }

  private getTextColorToSet_(behindBgColor: Color): Color {
    if (this.colorMap_.has(behindBgColor)) {
      return this.colorMap_.get(behindBgColor);
    } else {
      return behindBgColor.getColorWithHighestContrast(...this.colorOptions_);
    }
  }

  public destroy(): void {
    this.destroyed_ = true;
  }
}

export {ColorTextFromBackground};
