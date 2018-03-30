import {EventType} from '../dom/event/event-type';
import {Vector2d} from '../math/geometry/vector-2d';
import {addDomEventListener} from '../dom/event/add-dom-event-listener';
import {filterUntilFalse} from '../array/filter-until-false';
import {filterUntilFirst} from '../array/filter-until-first';
import {frame} from '../frame';
import {renderLoop} from '../render-loop';

const ZERO_VECTOR: Vector2d = new Vector2d();
const GESTURE_LIMIT: number = 30;
const POSITION_LIMIT: number = GESTURE_LIMIT;

class CursorPosition {
  private position: Vector2d;
  private pressed: boolean;
  private frame: number;

  constructor(position: Vector2d, pressed: boolean) {
    this.position = position;
    this.pressed = pressed;
    this.frame = frame.getFrame();
  }

  static fromXY(x: number, y: number, pressed: boolean): CursorPosition {
    return new this(new Vector2d(x, y), pressed);
  }

  getFrame(): number {
    return this.frame;
  }

  isForFrame(...frames: number[]): boolean {
    return frames.indexOf(this.getFrame()) !== -1;
  }

  isPressed(): boolean {
    return this.pressed;
  }

  getPosition(): Vector2d {
    return this.position;
  }
}

const ZERO_POSITION: CursorPosition = new CursorPosition(ZERO_VECTOR, false);
class CursorData {
  private positions: CursorPosition[];

  constructor(
    currentPosition: CursorPosition = ZERO_POSITION,
    ...pastPositions: CursorPosition[]
  ) {
    this.positions = [currentPosition, ...pastPositions];
  }

  public update(position: CursorPosition): CursorData {
    return new CursorData(
      position, ...this.positions.slice(0, POSITION_LIMIT - 1));
  }

  private getLatestPosition(): CursorPosition {
    return this.positions[0];
  }

  public getPosition(): Vector2d {
    return this.getLatestPosition().getPosition();
  }

  public getFrameDelta(): Vector2d {
    return this.getFrameDelta_(false);
  }

  public getPressedFrameDelta(): Vector2d {
    return this.getFrameDelta_(true);
  }

  private getFrameDelta_(usePressedPositionsOnly: boolean): Vector2d {
    const positions: CursorPosition[] =
      this.getPositionsForFrameDelta_(usePressedPositionsOnly);
    return positions.length === 0 ?
      ZERO_VECTOR :
      Vector2d.sumDeltas(
        ...positions.map((position) => position.getPosition()));
  }

  private getPositionsForFrameDelta_(
    usePressedPositionsOnly: boolean
  ): CursorPosition[] {
    const currentFrame = frame.getFrame();

    // If the latest frame is not the current one then we have no delta to
    // report.
    if (!this.getLatestPosition().isForFrame(currentFrame)) {
      return [];
    }

    const isPreviousFrame =
      (position: CursorPosition) => !position.isForFrame(currentFrame);
    const positionsToConsider =
      filterUntilFirst(this.positions, isPreviousFrame);

    if (usePressedPositionsOnly) {
      const isPressed = (position: CursorPosition) => position.isPressed();
      return filterUntilFalse(positionsToConsider, isPressed);
    } else {
      return positionsToConsider;
    }

  }

  public getGestureDelta(): Vector2d {
    return CursorData.getGestureDeltaFromPositions_(...this.positions);
  }

  public getPressedGestureDelta(): Vector2d {
    return CursorData.getGestureDeltaFromPositions_(
      ...this.getPressedGesturePositions_());
  }

  private getPressedGesturePositions_(): CursorPosition[] {
    const conditionFn =
      (position: CursorPosition, index: number) => {
        return index < GESTURE_LIMIT - 1 && position.isPressed();
      };

    return filterUntilFalse(this.positions, conditionFn);
  }

  static getGestureDeltaFromPositions_(
    ...positions: CursorPosition[]
  ): Vector2d {
    const deltas: Vector2d[] =
      Vector2d.getDeltas(
        ...positions.map((position: CursorPosition) => position.getPosition()));
    const scaledDeltas: Vector2d[] =
      deltas.map(
        (delta, index) => delta.scale((deltas.length - index) / deltas.length));
    return Vector2d.add(...scaledDeltas);
  }
}

class Cursor {
  public static singleton: Cursor;
  private frame: number;
  private clientPosition: CursorData;
  private pagePosition: CursorData;
  private screenPosition: CursorData;
  private pressed: boolean;

  constructor() {
    this.clientPosition = new CursorData();
    this.pagePosition = new CursorData();
    this.screenPosition = new CursorData();
    this.pressed = false;
    this.frame = 0;
    this.init_();
  }

  private init_() {
    addDomEventListener(
      window, EventType.CURSOR_DOWN, (event) => this.updatePress_(event, true));
    addDomEventListener(
      window, EventType.CURSOR_UP, (event) => this.updatePress_(event, false));
    addDomEventListener(
      window, EventType.CURSOR_MOVE, (event) => this.updatePosition_(event));
  }

  public static getSingleton(): Cursor {
    return this.singleton = this.singleton || new this();
  }

  public isPressed(): boolean {
    return this.pressed;
  }

  public getClient(): CursorData {
    return this.clientPosition;
  }

  public getPage(): CursorData {
    return this.pagePosition;
  }

  public getScreen(): CursorData {
    return this.screenPosition;
  }

  private updatePress_(event: MouseEvent|TouchEvent, isPressed: boolean): void {
    this.pressed = isPressed;
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
      this.pagePosition = this.duplicatePosition_(this.pagePosition);
      this.clientPosition = this.duplicatePosition_(this.clientPosition);
      this.screenPosition = this.duplicatePosition_(this.screenPosition);
    });
  }

  private updatePositionFromEvent_(event: MouseEvent|Touch): void {
    renderLoop.premeasure(() => {
      this.pagePosition =
        this.updatePositionWithXY_(
          this.pagePosition, event.pageX, event.pageY);

      this.clientPosition =
        this.updatePositionWithXY_(
          this.clientPosition, event.clientX, event.clientY);

      this.screenPosition =
        this.updatePositionWithXY_(
          this.screenPosition, event.screenX, event.screenY);
    });
  }

  duplicatePosition_(position: CursorData): CursorData {
    return position.update(
      new CursorPosition(position.getPosition(), this.isPressed()));
  }

  updatePositionWithXY_(position: CursorData, xValue: number, yValue: number) {
    return position.update(
      CursorPosition.fromXY(xValue, yValue, this.isPressed()));
  }
}

const cursor = Cursor.getSingleton();

export {cursor};
