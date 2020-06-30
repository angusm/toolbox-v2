import {Vector2d} from '../math/geometry/vector-2d';
import {frame} from '../frame';


class CursorPosition {
  private readonly position_: Vector2d;
  private readonly pressed_: boolean;
  private readonly frame_: number;
  private readonly time_: Date;

  constructor(position: Vector2d, pressed: boolean) {
    this.position_ = position;
    this.pressed_ = pressed;
    this.frame_ = frame.getFrame();
    this.time_ = new Date();
  }

  static fromXY(x: number, y: number, pressed: boolean): CursorPosition {
    return new this(new Vector2d(x, y), pressed);
  }

  getFrame(): number {
    return this.frame_;
  }

  isForFrame(...frames: number[]): boolean {
    return frames.indexOf(this.getFrame()) !== -1;
  }

  isPressed(): boolean {
    return this.pressed_;
  }

  getPosition(): Vector2d {
    return this.position_;
  }

  getTime(): Date {
    return this.time_;
  }
}

export {CursorPosition};
