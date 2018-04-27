import {Color} from "../../utils/color/color";
import {renderLoop} from "../../utils/render-loop";
import {getElementBehind} from "../../utils/dom/position/get-element-behind";
import {setStyle} from "../../utils/dom/style/set-style";

class ColorTextFromBackground {
  private target_: HTMLElement;
  private candidateBgElements_: HTMLElement[];
  private colorOptions_: Color[];
  private destroyed_: boolean;

  constructor(
    target: HTMLElement,
    candidateBgElements: HTMLElement[],
    colorOptions: Color[]
  ) {
    this.destroyed_ = false;
    this.target_ = target;
    this.candidateBgElements_ = candidateBgElements;
    this.colorOptions_ = colorOptions;

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
      const textColorToSet =
        behindBgColor.getColorWithHighestContrast(...this.colorOptions_);

      renderLoop.mutate(
        () => setStyle(this.target_, 'color', textColorToSet.toStyleString()));
    });
  }

  public destroy(): void {
    this.destroyed_ = true;
  }
}
