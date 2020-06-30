import {EventType} from '../dom/event/event-type';
import {addDomEventListener} from '../dom/event/add-dom-event-listener';
import {renderLoop} from '../render-loop';
import {removeDomEventListener} from '../dom/event/remove-dom-event-listener';
import {CursorData} from './cursor-data';
import {CursorPosition} from './cursor-position';

interface ICursorEvent {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  screenX: number;
  screenY: number;
}

const singletonUses: Set<any> = new Set();
let singleton: Cursor = null;

class Cursor {
  private frame_: number;
  private clientPosition_: CursorData;
  private pagePosition_: CursorData;
  private screenPosition_: CursorData;
  private pressed_: boolean;
  private readonly cursorDownHandler_: (event: MouseEvent|TouchEvent) => void;
  private readonly cursorUpHandler_: (event: MouseEvent|TouchEvent) => void;
  private readonly cursorMoveHandler_: (event: MouseEvent|TouchEvent) => void;

  constructor() {
    this.clientPosition_ = new CursorData();
    this.pagePosition_ = new CursorData();
    this.screenPosition_ = new CursorData();
    this.pressed_ = false;
    this.frame_ = 0;
    this.cursorDownHandler_ =
        (event: MouseEvent|TouchEvent) => this.updatePress_(event, true);
    this.cursorUpHandler_ =
        (event: MouseEvent|TouchEvent) => this.updatePress_(event, false);
    this.cursorMoveHandler_ =
        (event: MouseEvent|TouchEvent) => this.updatePosition_(event);
    this.init_();
  }

  private init_() {
    addDomEventListener(window, EventType.CURSOR_DOWN, this.cursorDownHandler_);
    addDomEventListener(window, EventType.CURSOR_UP, this.cursorUpHandler_);
    addDomEventListener(window, EventType.CURSOR_MOVE, this.cursorMoveHandler_);
  }

  public static getSingleton(use: any): Cursor {
    singletonUses.add(use);
    if (singleton === null) {
      singleton = new Cursor();
    }
    return singleton;
  }

  public isPressed(): boolean {
    return this.pressed_;
  }

  public getClient(): CursorData {
    return this.clientPosition_;
  }

  public getPage(): CursorData {
    return this.pagePosition_;
  }

  public getScreen(): CursorData {
    return this.screenPosition_;
  }

  private updatePress_(event: MouseEvent|TouchEvent, isPressed: boolean): void {
    this.pressed_ = isPressed;
    this.updatePosition_(event);
  }

  private updatePosition_(event: MouseEvent|TouchEvent): void {
    if (event instanceof MouseEvent) {
      this.updatePositionFromEvent_(event);
    } else if (event instanceof TouchEvent) {
      this.updatePositionFromTouchEvent_(event);
    }
  }

  private updatePositionFromTouchEvent_(touchEvent: TouchEvent): void {
    if (touchEvent.touches.length > 0) {
      this.updatePositionFromEvent_(touchEvent.touches[0]);
    } else {
      this.endTouch_();
    }
  }

  private endTouch_(): void {
    renderLoop.premeasure(() => {
      this.pagePosition_ = this.duplicatePosition_(this.pagePosition_);
      this.clientPosition_ = this.duplicatePosition_(this.clientPosition_);
      this.screenPosition_ = this.duplicatePosition_(this.screenPosition_);
    });
  }

  private updatePositionFromEvent_(event: ICursorEvent): void {
    renderLoop.premeasure(() => {
      this.pagePosition_ =
        this.updatePositionWithXY_(
          this.pagePosition_, event.pageX, event.pageY);

      this.clientPosition_ =
        this.updatePositionWithXY_(
          this.clientPosition_, event.clientX, event.clientY);

      this.screenPosition_ =
        this.updatePositionWithXY_(
          this.screenPosition_, event.screenX, event.screenY);
    });
  }

  private duplicatePosition_(position: CursorData): CursorData {
    return position.update(
      new CursorPosition(position.getPosition(), this.isPressed()));
  }

  private updatePositionWithXY_(
      position: CursorData, xValue: number, yValue: number
  ): CursorData {
    return position.update(
      CursorPosition.fromXY(xValue, yValue, this.isPressed()));
  }

  public destroy(use: any): void {
    if (this === singleton) {
      singletonUses.delete(use);
      if (singletonUses.size <= 0) {
        singleton = null;
        this.destroy_();
      }
    } else {
      this.destroy_();
    }
  }

  private destroy_(): void {
    removeDomEventListener(
        window, EventType.CURSOR_DOWN, this.cursorDownHandler_);
    removeDomEventListener(
        window, EventType.CURSOR_UP, this.cursorUpHandler_);
    removeDomEventListener(
        window, EventType.CURSOR_MOVE, this.cursorMoveHandler_);
  }
}

export {Cursor};
