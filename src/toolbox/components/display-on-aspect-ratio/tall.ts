import {hasTallAspectRatio} from "../../utils/dom/position/aspect-ratio/has-tall-aspect-ratio";
import {RunOnCondition} from "../run-on-condition/base";
import {clearStyle} from "../../utils/dom/style/clear-style";
import {setStyle} from "../../utils/dom/style/set-style";
import {hasSquareAspectRatio} from "../../utils/dom/position/aspect-ratio/has-square-aspect-ratio";

class DisplayOnTallAspectRatio {
  private element_: HTMLElement;
  private runOnCondition_: RunOnCondition;
  private includeSquare_: boolean;

  constructor(element: HTMLElement, includeSquare: boolean) {
    this.element_ = element;
    this.includeSquare_ = includeSquare;
    this.runOnCondition_ =
      new RunOnCondition(
        () => this.displayElement_(),
        () => this.isTall_(),
        () => this.hideElement_(),
      );
  }

  displayElement_() {
    clearStyle(this.element_, 'display');
  }

  hideElement_() {
    setStyle(this.element_, 'display', 'none');
  }

  isTall_() {
    return hasTallAspectRatio(this.element_) ||
      (this.includeSquare_ && hasSquareAspectRatio(this.element_));
  }

  destroy() {
    this.runOnCondition_.destroy();
  }
}

export {DisplayOnTallAspectRatio};