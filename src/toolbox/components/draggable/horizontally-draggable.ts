import {Draggable} from "./draggable";
import {IDraggableConstraint} from "./interfaces";
import {DraggableFixedYConstraint} from "./constraints/fixed-y";
import {cursor} from "../../utils/cached-vectors/cursor";
import {ScrollLockService} from "../scroll-lock-service/scroll-lock-service";
import {ZERO_VECTOR_2D} from "../../utils/math/geometry/zero-vector-2d";
import {Vector2d} from "../../utils/math/geometry/vector-2d";


function weightedTrendsHorizontal(delta: Vector2d) {
  return (Math.abs(delta.getX()) * .8) > Math.abs(delta.getY());
}

class HorizontallyDraggable extends Draggable {
  private potentialInteractionStarted_: boolean;
  private dragDelta_: Vector2d;

  constructor(
    element: HTMLElement,
    {constraints = []}: {constraints?: IDraggableConstraint[]} = {}
  ) {
    const finalConstraints: IDraggableConstraint[] =
      [...constraints, new DraggableFixedYConstraint()];
    super(element, {constraints: finalConstraints});

    this.dragDelta_ = ZERO_VECTOR_2D;
    this.potentialInteractionStarted_ = false;
  }

  protected startInteraction_(): void {
    this.potentialInteractionStarted_ = true;
  }

  protected renderDrag_(): void {
    if (!this.potentialInteractionStarted_) {
      return;
    }

    const delta = cursor.getClient().getPressedFrameDelta();
    if (delta.getLength() === 0) {
      return;
    }

    if (!this.isInteracting_()) {
      if (weightedTrendsHorizontal(delta)) {
        ScrollLockService.getSingleton().lockScroll();
        this.dragDelta_ = delta;
        super.startInteraction_();
      } else {
        this.potentialInteractionStarted_ = false;
      }
    } else {
      this.dragDelta_ = this.dragDelta_.add(delta);
      if (!weightedTrendsHorizontal(this.dragDelta_)) {
        this.endInteraction_();
        return;
      }
    }

    super.renderDrag_();
  }

  protected endInteraction_(): void {
    if (!this.interacting_) {
      return;
    }

    this.dragDelta_ = ZERO_VECTOR_2D;
    this.potentialInteractionStarted_ = false;
    super.endInteraction_();
    ScrollLockService.getSingleton().unlockScroll();
  }

}

export {HorizontallyDraggable};
