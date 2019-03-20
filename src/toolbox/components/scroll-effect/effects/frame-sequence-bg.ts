import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./i-effect";
import {percentToIndex} from "../../../utils/array/percent-to-index";
import {flatten} from "../../../utils/array/flatten";
import {zip} from "../../../utils/array/zip";
import {loadImage} from "../../../utils/loading/load-image";
import {styleStringToMap} from "../../../utils/dom/style/style-string-to-map";
import {setStylesFromMap} from "../../../utils/dom/style/set-styles-from-map";
import {min} from "../../../utils/array/min";
import {NumericRange} from "../../../utils/math/numeric-range";
import {subtract} from "../../../utils/set/subtract";
import {UserAgent} from "../../../utils/user-agent/user-agent";
import {Chrome} from "../../../utils/user-agent/browser/chrome";

// Expected cap, drop it in half just to be safe
const Z_INDEX_CAP = 2147483647 / 2;
const DEFAULT_FRAME_STYLE = `
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

class TargetState {
  public readonly desiredFrame: number;
  public readonly backFrame: number;
  public readonly frontFrame: number;
  public readonly distanceAsPercent: number;

  constructor(
    desiredFrame: number,
    backFrame: number,
    frontFrame: number,
    distanceAsPercent: number
  ) {
    this.desiredFrame = desiredFrame;
    this.backFrame = backFrame;
    this.frontFrame = frontFrame;
    this.distanceAsPercent = distanceAsPercent;
  }
}

const CURRENT_BROWSER = UserAgent.getBrowser();

class FrameSequenceBg implements IEffect {
  private readonly imageUrlsInOrder_: string[];
  private readonly framesToLoadInOrder_: number[];
  private readonly frameElements_: HTMLElement[];
  private readonly loadedFrames_: Set<number>;
  private readonly container_: HTMLElement;
  private readonly displayedFrames_: Set<number>;
  private isLoading_: boolean;
  private loadingPaused_: boolean;
  private framesToLoadInOrderIndex_: number;
  private zIndex_: number;
  private lastState_: TargetState;
  private lastTargetFrame_: number;

  /**
   * @param frames In order list of image URLs representing a sequence.
   * @param container Non-statically positioned HTML element to contain frames.
   * @param createFrameFunction Used to create front/back frames.
   * @param startLoadingImmediately Whether to immediately start loading images.
   *
   * Inner frames are positioned absolutely, so the container should be
   * positioned using fixed, absolute or relative.
   */
  constructor(
    frames: string[],
    container: HTMLElement,
    {
      createFrameFunction = () => document.createElement('div'),
      startLoadingImmediately = true,
    }: {
      createFrameFunction?: (frame: number) => HTMLElement,
      startLoadingImmediately?: boolean,
    } = {}
  ) {
    this.lastState_ = null;
    this.lastTargetFrame_ = null;
    this.imageUrlsInOrder_ = frames;
    this.frameElements_ =
      frames.map((frame, frameIndex) => createFrameFunction(frameIndex));
    this.framesToLoadInOrder_ =
      FrameSequenceBg.generateFrameLoadOrder(frames.length);
    this.framesToLoadInOrderIndex_ = 0;
    this.loadedFrames_ = new Set<number>();
    this.container_ = container;
    this.loadingPaused_ = !startLoadingImmediately;
    this.isLoading_ = false;
    this.displayedFrames_ = new Set();
    this.zIndex_ = 1;

    this.init_();
  }

  public stopLoading(): void {
    this.loadingPaused_ = true;
  }

  public startLoading(): void {
    this.loadingPaused_ = false;
    if (!this.isLoading_) {
      this.loadNextImage_();
    }
  }

  private init_() {
    this.setupFrames_();
    this.startLoadingImages_();
  }

  private setupFrames_() {
    const defaultStyles = styleStringToMap(DEFAULT_FRAME_STYLE);
    this.frameElements_
      .forEach((frame) => {
        setStylesFromMap(frame, defaultStyles);
        this.container_.appendChild(frame);
      });
  }

  private startLoadingImages_() {
    this.loadNextImage_();
  }

  private loadNextImage_() {
    if (this.framesToLoadInOrderIndex_ >= this.framesToLoadInOrder_.length) {
      return; // We've loaded everything, let's chill.
    }

    if (this.loadingPaused_) {
      return; // Loading's been paused, take a break.
    }

    const frameToLoad =
      this.framesToLoadInOrder_[this.framesToLoadInOrderIndex_];
    this.isLoading_ = true;
    this.loadImage_(frameToLoad).then(() => this.isLoading_ = false);
  }

  private loadImage_(frameToLoad: number): Promise<void> {
    const frameUrl = this.imageUrlsInOrder_[frameToLoad];
    this.isLoading_ = true;
    return loadImage(frameUrl)
      .then(
        (loadedImage) => {
          this.isLoading_ = false;
          this.loadedFrames_.add(frameToLoad);

          // Update the elements with the background images
          setStylesFromMap(
            this.frameElements_[frameToLoad],
            new Map([this.getBackgroundImageStyle_(frameToLoad)]));

          if (this.lastState_) {
            const desiredFrame = this.lastState_.desiredFrame;

            if (desiredFrame === frameToLoad) {
              this.updateWithLoadedFrame_(desiredFrame);
              this.lastState_ = null;

            } else {
              if (this.requiresUpdateForNewFrame_(frameToLoad)) {
                this.updateWithMissingFrame_(
                  this.lastState_.distanceAsPercent, desiredFrame);
              }
            }
          }

          this.framesToLoadInOrderIndex_++;
          this.loadNextImage_();
        },
        () => {
          this.isLoading_ = false;
          this.framesToLoadInOrderIndex_++;
          this.loadNextImage_();
        });
  }

  private requiresUpdateForNewFrame_(newFrame: number): boolean {
    return (
      this.lastState_.backFrame < newFrame &&
      newFrame < this.lastState_.desiredFrame
    ) || (
      this.lastState_.desiredFrame < newFrame &&
      newFrame < this.lastState_.frontFrame
    );
  }

  public static generateFrameLoadOrder(length: number): number[] {
    const allValues = [];
    for (let i = 1; i < length - 1; i++) {
      allValues.push(i);
    }
    return [0, length - 1, ...this.generateFrameLoadOrderLoop_(allValues)];
  }

  private static generateFrameLoadOrderLoop_(remaining: number[]): number[] {
    if (remaining.length <= 1) {
      return remaining;
    }

    const middle = Math.floor((remaining.length - 1) / 2);
    const left = remaining.slice(0, middle);
    const right = remaining.slice(middle + 1);
    return [
      remaining[middle],
      ...flatten(
        zip(
          this.generateFrameLoadOrderLoop_(left),
          this.generateFrameLoadOrderLoop_(right)
        )
      )
    ];
  }

  private getPreviousLoadedFrame_(targetFrame: number): number {
    return this.getClosestFrame_(
      this.getPreviousLoadedFrames_(targetFrame), targetFrame);
  }

  private getPreviousLoadedFrames_(targetFrame: number): number[] {
    return this.getLoadedFramesByCondition_((frame) => frame < targetFrame);
  }

  private getNextLoadedFrame_(targetFrame: number): number {
    return this.getClosestFrame_(
      this.getNextLoadedFrames_(targetFrame), targetFrame);
  }

  private getClosestFrame_(
    candidateFrames: number[], targetFrame: number
  ): number {
    return min(candidateFrames, (frame) => Math.abs(targetFrame - frame));
  }

  private getNextLoadedFrames_(targetFrame: number): number[] {
    return this.getLoadedFramesByCondition_((frame) => frame > targetFrame);
  }

  private getLoadedFramesByCondition_(condition: (v: number) => boolean) {
    return Array.from(this.loadedFrames_).filter(condition);
  }

  /**
   * Update the styles on the target's frames
   * @param target
   * @param distance
   * @param distanceAsPercent
   */
  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    const targetFrame =
      percentToIndex(distanceAsPercent, this.imageUrlsInOrder_);

    if (this.lastTargetFrame_ === targetFrame) {
      if (this.zIndex_ >= Z_INDEX_CAP && CURRENT_BROWSER !== Chrome) {
        this.resetZIndexes_(); // Clean up z-indexes if they've gotten up there
      }
    } else {
      if (this.loadedFrames_.has(targetFrame)) {
        this.updateWithLoadedFrame_(targetFrame);
      } else {
        this.updateWithMissingFrame_(distanceAsPercent, targetFrame);
      }
    }

    renderLoop.cleanup(() => this.lastTargetFrame_ = targetFrame);
  }

  resetZIndexes_() {
    this.frameElements_.forEach((frameElement) => {
      const newIndex = parseInt('0' + frameElement.style.zIndex) - Z_INDEX_CAP;
      renderLoop.anyMutate(() => {
        frameElement.style.zIndex = `${newIndex}`;
      });
    });
    renderLoop.cleanup(() => this.zIndex_ = 0);
  }

  updateWithLoadedFrame_(targetFrame: number): void {
    this.lastState_ = null;
    this.clearFrames_(new Set([targetFrame]));
    this.setFrameStyle_(targetFrame, '1');
  }

  getBackgroundImageStyle_(frame: number): [string, string] {
    return ['background-image', `url(${this.imageUrlsInOrder_[frame]})`];
  }

  clearFrames_(exceptions: Set<number> = null) {
    let framesToClear: Set<number>;
    if (exceptions) {
      framesToClear = subtract(this.displayedFrames_, exceptions);
    } else {
      framesToClear = this.displayedFrames_;
    }
    renderLoop.anyMutate(() => {
      if (CURRENT_BROWSER !== Chrome) {
        // framesToClear.forEach((frame) => {
        //   this.frameElements_[frame].style.zIndex = '0';
        // });
      } else {
        framesToClear.forEach((frame) => {
          this.frameElements_[frame].style.display = 'none';
        });
      }
    });
  }

  setFrameStyle_(frame: number, opacity: string): void {
    if (typeof frame === 'undefined') {
      return;
    }
    renderLoop.anyMutate(() => {
      this.displayedFrames_.add(frame);
      this.frameElements_[frame].style.opacity = opacity;
      if (CURRENT_BROWSER !== Chrome) {
        this.frameElements_[frame].style.zIndex = `${++this.zIndex_}`;
      }
      this.frameElements_[frame].style.display = 'block';
    });
  }

  /**
   * Updates back/front frames with a cross fade to accommodate a missing frame.
   * @param target
   * @param distanceAsPercent
   * @param targetFrame
   * @private
   */
  updateWithMissingFrame_(
    distanceAsPercent: number,
    targetFrame: number
  ): void {
    const frontFrame = this.getNextLoadedFrame_(targetFrame);
    const backFrame = this.getPreviousLoadedFrame_(targetFrame);

    const opacity =
      this.getFrontFrameCrossfadeOpacity_(
        distanceAsPercent, frontFrame, backFrame);

    this.clearFrames_(new Set([backFrame, frontFrame]));
    this.updateBackFrameWithMissingFrame_(backFrame);
    this.updateFrontFrameWithMissingFrame_(frontFrame, opacity);
    this.lastState_ =
      new TargetState(targetFrame, backFrame, frontFrame, distanceAsPercent);
  }

  getFrontFrameCrossfadeOpacity_(
    distanceAsPercent: number, frontFrame: number, backFrame: number
  ): number {
    const frontPercent = frontFrame / this.imageUrlsInOrder_.length;
    const backPercent = backFrame / this.imageUrlsInOrder_.length;
    const percentageRange = new NumericRange(backPercent, frontPercent);
    return percentageRange.getValueAsPercent(distanceAsPercent);
  }

  updateBackFrameWithMissingFrame_(frame: number): void {
    this.setFrameStyle_(frame, '1');
  }

  updateFrontFrameWithMissingFrame_(frame: number, opacity: number): void {
    this.setFrameStyle_(frame, `${opacity}`);
  }

  destroy() {
    this.loadedFrames_.clear();
    this.frameElements_
      .forEach((frameElement) => this.container_.removeChild(frameElement));
  }
}

export {FrameSequenceBg}
