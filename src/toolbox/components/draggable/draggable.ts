import {IDraggableConstraint, IDraggable} from './interfaces';
import {Drag} from './events/drag';
import {DragEnd} from './events/drag-end';
import {DragStart} from './events/drag-start';
import {EventType} from '../../utils/dom/event/event-type';
import {addDomEventListener} from '../../utils/dom/event/add-dom-event-listener';
import {cursor} from '../../utils/cached-vectors/cursor';
import {eventHandler} from '../../utils/event/event-handler';
import {renderLoop} from '../../utils/render-loop';
import {Vector2d} from "../../utils/math/geometry/vector-2d";
import {DraggableSyncManager} from "./draggable-sync-manager";
import {setStyle} from "../../utils/dom/style/set-style";

class Draggable implements IDraggable {
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
    addDomEventListener(
      this.element_,
      EventType.MOUSEOUT,
      (event) => {
        if (event.target === this.element_) {
          this.endInteraction_();
        }
      });
  }

  protected startInteraction_(): void {
    this.interacting_ = true;
    setStyle(this.element_, 'pointer-events', 'none');
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
          this, this.getDelta_(), cursor.getClient().getLastFrameVelocity()));
    });
    renderLoop.mutate(() => setStyle(this.element_, 'pointer-events', ''));
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
      cursor.getClient().getPressedFrameDelta());
  }

  public getElement(): HTMLElement {
    return this.element_;
  }
}

export {Draggable};
