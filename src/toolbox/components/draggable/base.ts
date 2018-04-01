import {IConstraint, IDraggable} from './interfaces';
import {Drag} from './events/drag';
import {DragEnd} from './events/drag-end';
import {DragStart} from './events/drag-start';
import {EventType} from '../../utils/dom/event/event-type';
import {addDomEventListener} from '../../utils/dom/event/add-dom-event-listener';
import {cursor} from '../../utils/cached-vectors/cursor';
import {eventHandler} from '../../utils/event/event-handler';
import {renderLoop} from '../../utils/render-loop';
import {translate2d} from '../../utils/dom/position/translate-2d';
import {Vector2d} from "../../utils/math/geometry/vector-2d";

class Draggable implements IDraggable {
  private element_: HTMLElement;
  private interacting_: boolean;
  private constraints_: IConstraint[];

  constructor(
    element: HTMLElement,
    {constraints = []}: {constraints?: IConstraint[]} = {}
  ) {
    this.element_ = element;
    this.interacting_ = false;
    this.constraints_ = [...constraints];
    this.init_();
  }

  private init_(): void {
    this.initInteraction_();
    this.render_();
  }

  private initInteraction_(): void {
    addDomEventListener(
      this.element_, EventType.CURSOR_DOWN, () => this.startInteraction_());
    addDomEventListener(
      window, EventType.CURSOR_UP, () => this.endInteraction_());
  }

  private startInteraction_(): void {
    this.interacting_ = true;
    eventHandler.dispatchEvent(new DragStart(this));
  }

  private endInteraction_(): void {
    this.interacting_ = false;
    eventHandler.dispatchEvent(new DragEnd(this));
  }

  private isInteracting_(): boolean {
    return this.interacting_;
  }

  private render_(): void {
    renderLoop.measure(() => {
      this.renderDrag_();
      renderLoop.cleanup(() => this.render_());
    });
  }

  private renderDrag_(): void {
    if (!this.isInteracting_()) {
      return;
    }
    const delta = this.getDelta_();
    if (!delta.getLength()) {
      return;
    }
    eventHandler.dispatchEvent(new Drag(this, this.element_, delta));
    translate2d(this.element_, delta);
  }

  private getDelta_(): Vector2d {
    return this.constraints_.reduce(
      (delta, constraint) => constraint.constrainDelta(this, delta),
      cursor.getClient().getPressedFrameDelta());
  }

  public getElement(): HTMLElement {
    return this.element_;
  }
}

export {Draggable};
