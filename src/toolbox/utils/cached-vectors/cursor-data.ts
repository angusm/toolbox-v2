import {Vector2d} from '../math/geometry/vector-2d';
import {ZERO_VECTOR_2D} from '../math/geometry/zero-vector-2d';
import {frame} from '../frame';
import {filterUntilFirst} from '../array/filter-until-first';
import {filterUntilFalse} from '../array/filter-until-false';
import {CursorPosition} from './cursor-position';

const GESTURE_TIME_LIMIT: number = 1000; // Time limit in ms
const POSITION_LIMIT: number = 100;
const ZERO_POSITION: CursorPosition = new CursorPosition(ZERO_VECTOR_2D, false);

class CursorData {
  private readonly positions_: CursorPosition[];

  constructor(
      currentPosition: CursorPosition = ZERO_POSITION,
      ...pastPositions: CursorPosition[]
  ) {
    this.positions_ = [currentPosition, ...pastPositions];
  }

  public update(position: CursorPosition): CursorData {
    return new CursorData(
        position, ...this.positions_.slice(0, POSITION_LIMIT - 1));
  }

  private getLatestPosition(): CursorPosition {
    return this.positions_[0];
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
        ZERO_VECTOR_2D :
        Vector2d.sumDeltas<Vector2d>(
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
        filterUntilFirst(this.positions_, isPreviousFrame);

    if (usePressedPositionsOnly) {
      const isPressed = (position: CursorPosition) => position.isPressed();
      return filterUntilFalse(positionsToConsider, isPressed);
    } else {
      return positionsToConsider;
    }

  }

  public getGestureDelta(): Vector2d {
    return CursorData.getGestureDeltaFromPositions_(...this.positions_);
  }

  public getPressedGestureDelta(): Vector2d {
    return CursorData.getGestureDeltaFromPositions_(
        ...this.getPressedGesturePositions_());
  }

  public getLastFrameVelocity(): Vector2d {
    const framesWithTimeDifference = this.getFramesWithTimeDifference_();
    const firstFrame = framesWithTimeDifference[0];
    const lastFrame = framesWithTimeDifference.slice(-1)[0];
    const frameDeltaInSeconds =
        (firstFrame.getTime().valueOf() - lastFrame.getTime().valueOf()) /
        1000;
    return this.getLastFrameDelta().scale(1/frameDeltaInSeconds);
  }

  public getLastFrameDelta(): Vector2d {
    const framesWithTimeDifference = this.getFramesWithTimeDifference_();
    const firstFrame = framesWithTimeDifference[0];
    const lastFrame = framesWithTimeDifference.slice(-1)[0];
    return firstFrame.getPosition().subtract(lastFrame.getPosition());
  }

  private getFramesWithTimeDifference_(): CursorPosition[] {
    const firstPosition = this.positions_[0];
    const positionWithDifference =
        this.positions_
            .find(
                (position) => {
                  return position.getTime().valueOf() !==
                      firstPosition.getTime().valueOf();
                });
    return this.positions_
        .slice(0, this.positions_.indexOf(positionWithDifference) + 1);
  }

  private getPressedGesturePositions_(): CursorPosition[] {
    const currentTime: number = new Date().valueOf();
    const conditionFn =
        (position: CursorPosition) => {
          const timeDiff = currentTime - position.getTime().valueOf();
          return timeDiff < GESTURE_TIME_LIMIT && position.isPressed();
        };

    return filterUntilFalse(this.positions_, conditionFn);
  }

  public static getGestureDeltaFromPositions_(
      ...positions: CursorPosition[]
  ): Vector2d {
    const deltas: Vector2d[] =
        Vector2d.getDeltas<Vector2d>(
            ...positions.map((position: CursorPosition) => position.getPosition()));
    const scaledDeltas: Vector2d[] =
        deltas.map(
            (delta, index) => delta.scale((deltas.length - index) / deltas.length));
    return Vector2d.add<Vector2d>(...scaledDeltas);
  }
}

export {CursorData}
