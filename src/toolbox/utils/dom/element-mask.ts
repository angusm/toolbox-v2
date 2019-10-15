/**
 * Used for having a fixed element serve as a performance workaround for what
 * should otherwise be large amounts of inline content.
 * Created by angusm on 05/12/17.
 */
import {Dimensions} from '../cached-vectors/dimensions';
import {Dimensions2d} from '../math/geometry/dimensions-2d';
import {NumericRange} from '../math/numeric-range';
import {Scroll} from '../cached-vectors/scroll';
import {VisibleDimensions} from '../cached-vectors/visible-dimensions';
import {VisibleDistance} from '../cached-vectors/visible-distance';
import {renderLoop} from '../render-loop';


class ElementMask{
  private fixedEl_: HTMLElement;
  private maskDimensions_: Dimensions;
  private maskVisibleDimensions_: VisibleDimensions;
  private maskPosition_: VisibleDistance;
  private stopped_: boolean;
  private buffer_: number;
  private readonly windowDimensions_: Dimensions;
  private readonly windowScroll_: Scroll;

  constructor(
    fixedElement: HTMLElement, maskElement: HTMLElement, buffer: number = 0
  ) {
    this.fixedEl_ = fixedElement;
    this.maskDimensions_ = Dimensions.getForElement(maskElement);
    this.maskVisibleDimensions_ = VisibleDimensions.getForElement(maskElement);
    this.maskPosition_ = VisibleDistance.getForElement(maskElement);
    this.stopped_ = false;
    this.buffer_ = buffer;
    this.windowDimensions_ = Dimensions.getSingleton();
    this.windowScroll_ = Scroll.getSingleton();
    this.init_();
  }

  private init_(): void {
    this.render_();
    this.initFixedElement_();
  }

  private initFixedElement_(): void {
    renderLoop.mutate(() => {
      this.fixedEl_.style.position = 'absolute';
      this.fixedEl_.style.left = '0';
      this.fixedEl_.style.top = '0';
      this.fixedEl_.style.right = 'auto';
      this.fixedEl_.style.bottom = 'auto';
    });
  }

  public stop(): void {
    this.stopped_ = true;
  }

  private render_(): void {
    if (this.stopped_) {
      return;
    }
    renderLoop.measure(() => {
      this.renderFixed_();
      renderLoop.cleanup(() => this.render_());
    });
  }

  private getWindowDimensionRanges_(): NumericRange[] {
    return this.windowDimensions_.getDimensions()
      .asRanges()
      .map((range) => range.expand(this.buffer_));
  }

  private renderFixed_(): void {
    const [widthRange, heightRange] = this.getWindowDimensionRanges_();

    const clippedPosition =
      this.maskPosition_.getDistance()
        .clamp(widthRange, heightRange)
        .add(this.windowScroll_.getPosition());

    let bufferedDimensions = new Dimensions2d();
    if (this.maskVisibleDimensions_.getDimensions().getLength() != 0) {
      bufferedDimensions =
        this.maskVisibleDimensions_.getDimensions()
          .add(new Dimensions2d(this.buffer_, this.buffer_))
          .clamp(...this.maskDimensions_.getDimensions().asRanges());
    }

    renderLoop.mutate(() => {
      // Ensure hidden elements stay hidden
      if (bufferedDimensions.getArea()) {
        clippedPosition.positionElementByTranslation(this.fixedEl_);
        bufferedDimensions.sizeElement(this.fixedEl_);
        this.fixedEl_.style.visibility = 'visible';
      } else {
        this.fixedEl_.style.visibility = 'hidden';
      }
    });
  }
}

export {ElementMask};
