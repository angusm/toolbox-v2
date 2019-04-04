import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./i-effect";
import {flatten} from "../../../utils/array/flatten";
import {zip} from "../../../utils/array/zip";
import {loadImage} from "../../../utils/loading/load-image";
import {styleStringToMap} from "../../../utils/dom/style/style-string-to-map";
import {setStylesFromMap} from "../../../utils/dom/style/set-styles-from-map";
import {min} from "../../../utils/array/min";
import {NumericRange} from "../../../utils/math/numeric-range";
import {subtract} from "../../../utils/set/subtract";
import {UserAgent} from "../../../utils/user-agent/user-agent";
import {Firefox} from "../../../utils/user-agent/browser/firefox";
import {ArrayMap} from "../../../utils/map/array";

// Expected cap, drop it in half just to be safe
const Z_INDEX_CAP = 2147483647 / 2;
const DEFAULT_FRAME_STYLE = `
  opacity: 0;
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
  private readonly imageUrlIndicesToLoadInOrder_: number[];
  private readonly numberOfFramesToInterpolate_: number;
  private readonly frameElements_: HTMLElement[];
  private readonly loadedImageUrls_: Set<string>;
  private readonly container_: HTMLElement;
  private readonly displayedFrameElementIndices_: Set<number>;
  private readonly maximumParallelImageRequests_: number;
  private readonly backupFrames_: ArrayMap<number, string>;
  private imageUrlsInOrder_: string[];
  private currentParallelImageRequests_: number;
  private loadImageFunction_: (imageUrl: string) => Promise<HTMLImageElement>;
  private loadingPaused_: boolean;
  private imagesLoaded_: number;
  private zIndex_: number;
  private lastState_: TargetState;
  private lastTargetFrame_: number;

  /**
   * @param frames In order list of image URLs representing a sequence.
   * @param container Non-statically positioned HTML element to contain frames.
   * @param createFrameFunction Used to create front/back frames.
   * @param startLoadingImmediately Whether to immediately start loading images.
   * @param loadImageFunction Function to load a given image from its url.
   * Defaults to Toolbox's loadImage.
   * @param framesToInterpolate Number of cross-fade frames to interpolate
   * @param maximumLoadingThreads Number of images to load at once
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
      loadImageFunction = loadImage,
      framesToInterpolate = 0,
      maximumLoadingThreads = 12,
    }: {
      createFrameFunction?: (frame: number) => HTMLElement,
      startLoadingImmediately?: boolean,
      loadImageFunction?: (url: string) => Promise<HTMLImageElement>,
      framesToInterpolate?: number,
      maximumLoadingThreads?: number,
    } = {}
  ) {
    this.backupFrames_ = new ArrayMap<number, string>();
    this.lastState_ = null;
    this.lastTargetFrame_ = null;
    this.imageUrlsInOrder_ = frames;
    this.frameElements_ =
      frames.map((frame, frameIndex) => createFrameFunction(frameIndex));
    this.imageUrlIndicesToLoadInOrder_ =
      FrameSequenceBg.generateFrameLoadOrder(frames.length);
    this.imagesLoaded_ = 0;
    this.loadedImageUrls_ = new Set<string>();
    this.container_ = container;
    this.loadingPaused_ = !startLoadingImmediately;
    this.displayedFrameElementIndices_ = new Set();
    this.zIndex_ = 1;
    this.loadImageFunction_ = loadImageFunction;
    this.numberOfFramesToInterpolate_ = framesToInterpolate;
    this.maximumParallelImageRequests_ = maximumLoadingThreads;
    this.currentParallelImageRequests_ = 0;

    this.init_();
  }

  public stopLoading(): void {
    this.loadingPaused_ = true;
  }

  public startLoading(): void {
    this.loadingPaused_ = false;
    if (!this.areAllLoadingThreadsInUse_()) {
      this.loadNextImage_();
    }
  }

  private areAllLoadingThreadsInUse_(): boolean {
    return this.currentParallelImageRequests_ >=
      this.maximumParallelImageRequests_;
  }

  private init_() {
    this.setupFrames_();
    this.startLoadingImagesWhenReady_();
  }

  private startLoadingImagesWhenReady_() {
    if (document.readyState === 'complete') {
      this.startLoadingImages_();
    } else {
      window.addEventListener('load', () => this.startLoadingImages_());
    }
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
    if (this.imagesLoaded_ >= this.imageUrlIndicesToLoadInOrder_.length) {
      return; // We've loaded everything, let's chill.
    }

    if (this.loadingPaused_) {
      return; // Loading's been paused, take a break.
    }

    const imageUrlIndexToLoad =
      this.imageUrlIndicesToLoadInOrder_[this.imagesLoaded_];
    this.loadImage_(imageUrlIndexToLoad);
  }

  private loadImage_(imageUrlIndexToLoad: number): Promise<void> {
    const frameUrl = this.imageUrlsInOrder_[imageUrlIndexToLoad];
    this.currentParallelImageRequests_++;
    return this.loadImageFunction_(frameUrl)
      .then(
        (loadedImage) => {
          this.currentParallelImageRequests_--;
          this.loadedImageUrls_.add(this.getImageUrl_(imageUrlIndexToLoad));

          // Update the elements with the background images
          setStylesFromMap(
            this.frameElements_[imageUrlIndexToLoad],
            new Map([this.getBackgroundImageStyle_(imageUrlIndexToLoad)]));

          if (this.lastState_) {
            const desiredFrame = this.lastState_.desiredFrame;

            if (desiredFrame === imageUrlIndexToLoad) {
              this.updateWithLoadedFrame_(desiredFrame);
              this.lastState_ = null;

            } else {
              if (this.requiresUpdateForNewFrame_(imageUrlIndexToLoad)) {
                this.updateWithInterpolatedFrame_(
                  this.lastState_.distanceAsPercent, desiredFrame);
              }
            }
          }

          this.imagesLoaded_++;
          this.loadNextImage_();
        },
        () => {
          this.currentParallelImageRequests_--;
          this.imagesLoaded_++;
          this.loadNextImage_();
        });
  }

  private requiresUpdateForNewFrame_(newFrameIndex: number): boolean {
    const interpolatedNewFrame =
      newFrameIndex * (this.numberOfFramesToInterpolate_ + 1);
    return (
      newFrameIndex === 0 || newFrameIndex === this.imageUrlsInOrder_.length
    ) || (
      this.lastState_.backFrame < interpolatedNewFrame &&
      interpolatedNewFrame < this.lastState_.desiredFrame
    ) || (
      this.lastState_.desiredFrame < interpolatedNewFrame &&
      interpolatedNewFrame < this.lastState_.frontFrame
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

  private getPreviousLoadedImageUrlIndex_(targetFrame: number): number {
    return this.getClosestFrame_(
      this.getPreviousLoadedImageUrlIndices_(targetFrame), targetFrame);
  }

  private getPreviousLoadedImageUrlIndices_(targetFrame: number): number[] {
    return this.getLoadedImageUrlIndicesByCondition_(
      (frame) => frame < targetFrame);
  }

  private getNextLoadedImageUrlIndex_(imageUrlIndex: number): number {
    return this.getClosestFrame_(
      this.getNextLoadedImageUrlIndices_(imageUrlIndex), imageUrlIndex);
  }

  private getClosestFrame_(
    candidateFrames: number[], targetFrame: number
  ): number {
    return min(candidateFrames, (frame) => Math.abs(targetFrame - frame));
  }

  private getNextLoadedImageUrlIndices_(imageUrlIndex: number): number[] {
    return this.getLoadedImageUrlIndicesByCondition_(
      (frame) => frame > imageUrlIndex);
  }

  private getLoadedImageUrlIndices_() {
    return Array.from(
      new Set(
        Array.from(this.loadedImageUrls_)
          .map((imageUrl) => this.getImageUrlIndex_(imageUrl))));
  }

  private getLoadedImageUrlIndicesByCondition_(
    condition: (v: number) => boolean
  ): number[] {
    return this.getLoadedImageUrlIndices_().filter(condition);
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
    const interpolationMultiplier = this.numberOfFramesToInterpolate_ + 1;
    const frameCountWithInterpolation =
      (this.imageUrlsInOrder_.length * interpolationMultiplier) - 1;
    const targetFrame =
      Math.round(
        new NumericRange(0, frameCountWithInterpolation)
          .getPercentAsValue(distanceAsPercent));

    const nonInterpolatedFrameNumber =
      this.getNonInterpolatedFrame_(targetFrame);

    if (this.lastTargetFrame_ === targetFrame) {
      if (this.zIndex_ >= Z_INDEX_CAP && CURRENT_BROWSER === Firefox) {
        this.resetZIndexes_(); // Clean up z-indexes if they've gotten up there
      }
    } else {
        const loadedImageUrl =
          !this.isInterpolatedFrame_(targetFrame) ?
            this.getLoadedImageUrlForIndex_(nonInterpolatedFrameNumber) : null;

      if (loadedImageUrl !== null) {
        this.updateWithLoadedFrame_(nonInterpolatedFrameNumber);
      } else {
        this.updateWithInterpolatedFrame_(distanceAsPercent, targetFrame);
      }
    }

    renderLoop.cleanup(() => this.lastTargetFrame_ = targetFrame);
  }

  private hasLoadedImageUrlForIndex_(imageUrlIndex: number): boolean {
    return this.getLoadedImageUrlForIndex_(imageUrlIndex) !== null;
  }

  private getLoadedImageUrlForIndex_(imageUrlIndex: number): string {
    const bestUrl = this.imageUrlsInOrder_[imageUrlIndex];
    if (this.loadedImageUrls_.has(bestUrl)) {
      return bestUrl;
    } else {
      const loadedBackupUrl =
        this.backupFrames_.get(imageUrlIndex)
          .find((imageUrl) => this.loadedImageUrls_.has(imageUrl));
      return loadedBackupUrl || null;
    }
  }

  private getNonInterpolatedFrame_(frameNumber: number): number {
    return frameNumber / (this.numberOfFramesToInterpolate_ + 1);
  }

  private isInterpolatedFrame_(frameNumber: number): boolean {
    return frameNumber % (this.numberOfFramesToInterpolate_ + 1) !== 0;
  }

  private resetZIndexes_() {
    this.frameElements_.forEach((frameElement) => {
      const newIndex = parseInt('0' + frameElement.style.zIndex) - Z_INDEX_CAP;
      renderLoop.anyMutate(() => {
        frameElement.style.zIndex = `${newIndex}`;
      });
    });
    renderLoop.cleanup(() => this.zIndex_ = 0);
  }

  private updateWithLoadedFrame_(targetFrame: number): void {
    this.lastState_ = null;
    this.clearFrames_(new Set([targetFrame]));
    this.setFrameStyle_(targetFrame, '1');
  }

  private getBackgroundImageStyle_(imageUrlIndex: number): [string, string] {
    return [
      'background-image', `url(${this.imageUrlsInOrder_[imageUrlIndex]})`];
  }

  private getImageUrl_(imageUrlIndex: number): string {
    return this.imageUrlsInOrder_[imageUrlIndex];
  }

  private getImageUrlIndex_(imageUrl: string): number {
    const baseIndex = this.imageUrlsInOrder_.indexOf(imageUrl);
    if (baseIndex !== -1) {
      return baseIndex;
    } else {
      return Array.from(this.backupFrames_.keys())
        .find((index) => {
          return this.backupFrames_.get(index).indexOf(imageUrl) !== -1;
        });
    }
  }

  private clearFrames_(exceptions: Set<number> = null) {
    let framesToClear: Set<number>;
    if (exceptions) {
      framesToClear = subtract(this.displayedFrameElementIndices_, exceptions);
    } else {
      framesToClear = this.displayedFrameElementIndices_;
    }
    renderLoop.anyMutate(() => {
      if (CURRENT_BROWSER !== Firefox) {
        framesToClear.forEach((frame) => {
          this.frameElements_[frame].style.opacity = '0';
        });
      }
    });
  }

  private setFrameStyle_(frame: number, opacity: string): void {
    if (typeof frame === 'undefined') {
      return;
    }
    renderLoop.anyMutate(() => {
      this.displayedFrameElementIndices_.add(frame);
      this.frameElements_[frame].style.opacity = opacity;
      if (CURRENT_BROWSER === Firefox) {
        this.frameElements_[frame].style.zIndex = `${++this.zIndex_}`;
      }
    });
  }

  /**
   * Updates back/front frames with a cross fade to accommodate a missing frame.
   * @param distanceAsPercent
   * @param targetInterpolatedFrame
   * @private
   */
  private updateWithInterpolatedFrame_(
    distanceAsPercent: number,
    targetInterpolatedFrame: number
  ): void {
    const targetImageUrlIndex =
      this.getNonInterpolatedFrame_(targetInterpolatedFrame);
    const frontImageUrlIndex =
      this.getNextLoadedImageUrlIndex_(targetImageUrlIndex);
    const backImageUrlIndex =
      this.getPreviousLoadedImageUrlIndex_(targetImageUrlIndex);

    const opacity =
      this.getFrontFrameCrossfadeOpacity_(
        distanceAsPercent, frontImageUrlIndex, backImageUrlIndex);

    this.clearFrames_(new Set([backImageUrlIndex, frontImageUrlIndex]));
    this.updateBackFrameWithMissingFrame_(backImageUrlIndex);
    this.updateFrontFrameWithMissingFrame_(frontImageUrlIndex, opacity);
    this.lastState_ =
      new TargetState(
        targetInterpolatedFrame,
        backImageUrlIndex,
        frontImageUrlIndex,
        distanceAsPercent);
  }

  private getFrontFrameCrossfadeOpacity_(
    distanceAsPercent: number, frontFrame: number, backFrame: number
  ): number {
    const frontPercent = frontFrame / this.imageUrlsInOrder_.length;
    const backPercent = backFrame / this.imageUrlsInOrder_.length;
    const percentageRange = new NumericRange(backPercent, frontPercent);
    return percentageRange.getValueAsPercent(distanceAsPercent);
  }

  private updateBackFrameWithMissingFrame_(frame: number): void {
    this.setFrameStyle_(frame, '1');
  }

  private updateFrontFrameWithMissingFrame_(
    frame: number, opacity: number
  ): void {
    this.setFrameStyle_(frame, `${opacity}`);
  }

  /**
   * Used to update frames while allowing previously loaded frames to be used
   * as a backup. Useful when dynamically setting quality/width of images.c
   * @param frames
   */
  public replaceFramesInPlace(frames: string[]) {
    if (frames.length !== this.imageUrlsInOrder_.length) {
      throw new Error(
        'Can only replaceFramesInPlace if frame count is constant');
    }

    // Note we do not update imageUrlIndicesToLoadInOrder_ since it should be
    // the same if the length doesn't change.

    this.imageUrlsInOrder_
      .forEach((imageUrl, index) => {
        if (this.loadedImageUrls_.has(imageUrl)) {
          this.backupFrames_.get(index).push(imageUrl);
        }
      });
    this.imageUrlsInOrder_ = frames;
    this.imagesLoaded_ = 0;
    this.startLoadingImagesWhenReady_();
  }

  destroy() {
    this.loadedImageUrls_.clear();
    this.backupFrames_.clear();
    this.frameElements_
      .forEach((frameElement) => this.container_.removeChild(frameElement));
  }
}

export {FrameSequenceBg}
