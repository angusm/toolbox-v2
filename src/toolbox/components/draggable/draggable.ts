import {IDraggableConstraint, IDraggable} from './interfaces';
import {Drag} from './events/drag';
import {DragEnd} from './events/drag-end';
import {DragStart} from './events/drag-start';
import {EventType} from '../../utils/dom/event/event-type';
import {addDomEventListener} from '../../utils/dom/event/add-dom-event-listener';
import {Cursor} from '../../utils/cached-vectors/cursor';
import {eventHandler} from '../../utils/event/event-handler';
import {renderLoop} from '../../utils/render-loop';
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {DraggableSyncManager} from "./draggable-sync-manager";

class Draggable implements IDraggable {
  protected readonly cursor_: Cursor;
  private readonly element_: HTMLElement;
  private constraints_: IDraggableConstraint[];

  protected interacting_: boolean;

  constructor(
    element: HTMLElement,
    {constraints = []}: {constraints?: IDraggableConstraint[]} = {}
  ) {
    this.element_ = element;
    this.interacting_ = false;
    this.constraints_ = [...constraints];
    this.cursor_ = Cursor.getSingleton(this);
    this.init_();
  }

  private init_(): void {
    this.initInteraction_();
    this.render_();
  }

  private initInteraction_(): void {
    addDomEventListener(
      this.element_, EventType.CURSOR_DOWN, () => this.startInteraction_());
    const endEventTypes =
      [EventType.CONTEXTMENU,  EventType.DRAGSTART,  EventType.CURSOR_UP];
    const endInteraction =  () => this.endInteraction_();
    endEventTypes.forEach(
      (eventType) => addDomEventListener(window, eventType, endInteraction));
  }

  protected startInteraction_(): void {
    this.interacting_ = true;
    eventHandler.dispatchEvent(new DragStart(this));
  }

  protected endInteraction_(): void {
    /**
     * Since global events are being listened to in order to end the interaction
     * then we must first verify we are in fact interacting.
     */
    if (!this.interacting_) {
      return;
    }

    this.interacting_ = false;
    renderLoop.measure(() => {
      eventHandler.dispatchEvent(
        new DragEnd(
          this,
          this.getDelta_(),
          this.cursor_.getClient().getLastFrameVelocity()));
    });
  }

  protected isInteracting_(): boolean {
    return this.interacting_;
  }

  private render_(): void {
    renderLoop.measure(() => {
      this.renderDrag_();
      renderLoop.cleanup(() => this.render_());
    });
  }

  protected renderDrag_(): void {
    if (!this.isInteracting_()) {
      return;
    }
    const delta = this.getDelta_();
    if (!delta.getLength()) {
      return;
    }
    DraggableSyncManager.getSingleton().renderDrag(this, delta);
    eventHandler.dispatchEvent(new Drag(this, this.element_, delta));
  }

  private getDelta_(): Vector2d {
    return this.constraints_.reduce(
      (delta, constraint) => constraint.constrain(this, delta),
      this.cursor_.getClient().getPressedFrameDelta());
  }

  public getElement(): HTMLElement {
    return this.element_;
  }

  public destroy() {
    this.cursor_.destroy(this);
  }
}

export {Draggable};
