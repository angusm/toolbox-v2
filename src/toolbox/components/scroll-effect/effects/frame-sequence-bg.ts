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
import {MultiValueDynamicDefaultMap} from "../../../utils/map/multi-value-dynamic-default";
import {SetMap} from "../../../utils/map/set-map";

type TStyleMap = Map<string, string>;

const DEFAULT_FRAME_STYLE = `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

class FrameSequenceBg implements IEffect {
  private readonly loadedImages_: Set<HTMLImageElement>;
  private readonly desiredFrameForTarget_: Map<HTMLElement, number>;
  private readonly imageUrlsInOrder_: string[];
  private readonly framesToLoadInOrder_: number[];
  private readonly loadedFrames_: Set<number>;
  private readonly container_: HTMLElement;
  private readonly backFrame_: HTMLElement;
  private readonly frontFrame_: HTMLElement;
  private readonly reloadFrameMap_:
    MultiValueDynamicDefaultMap<HTMLImageElement|number, () => void>;
  private isLoading_: boolean;
  private loadingPaused_: boolean;
  private framesToLoadInOrderIndex_: number;

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
      createFrameFunction?: (isBack: boolean) => HTMLElement,
      startLoadingImmediately?: boolean,
    } = {}
  ) {
    this.imageUrlsInOrder_ = frames;
    this.desiredFrameForTarget_ = new Map();
    this.framesToLoadInOrder_ =
      FrameSequenceBg.generateFrameLoadOrder(frames.length);
    this.framesToLoadInOrderIndex_ = 0;
    this.loadedFrames_ = new Set<number>();
    this.backFrame_ = createFrameFunction(true);
    this.frontFrame_ = createFrameFunction(false);
    this.container_ = container;
    this.loadedImages_ = new Set();
    this.loadingPaused_ = !startLoadingImmediately;
    this.isLoading_ = false;

    this.reloadFrameMap_ =
      MultiValueDynamicDefaultMap.usingFunction(
        ([frameToLoad, loadedImage]: [number, HTMLImageElement]) => {
          return () => {
            this.loadedImages_.delete(loadedImage);
            this.loadedFrames_.delete(frameToLoad);
            this.loadImage_(frameToLoad);
          }
        });

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

  private getFrames_() {
    return [this.backFrame_, this.frontFrame_];
  }

  private setupFrames_() {
    const defaultStyles = styleStringToMap(DEFAULT_FRAME_STYLE);
    this.getFrames_()
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
          loadedImage.addEventListener(
            'emptied', this.reloadFrameMap_.get([frameToLoad, loadedImage]));
          this.isLoading_ = false;
          this.loadedImages_.add(loadedImage); // Keep image in memory
          this.loadedFrames_.add(frameToLoad);

          this.desiredFrameForTarget_.forEach((desiredFrame, target) => {
            if (desiredFrame === frameToLoad) {
              this.updateWithLoadedFrame_(target, desiredFrame);
              this.desiredFrameForTarget_.delete(target);
            }
          });

          this.framesToLoadInOrderIndex_++;
          this.loadNextImage_();
        },
        () => {
          this.isLoading_ = false;
          this.framesToLoadInOrderIndex_++;
          this.loadNextImage_();
        });
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

    if (this.loadedFrames_.has(targetFrame)) {
      this.updateWithLoadedFrame_(target, targetFrame);
    } else {
      this.updateWithMissingFrame_(target, distanceAsPercent, targetFrame);
    }
  }

  updateWithLoadedFrame_(target: HTMLElement, targetFrame: number): void {
    this.desiredFrameForTarget_.delete(target);
    const frameBackground = `url(${this.imageUrlsInOrder_[targetFrame]})`;
    this.mutateUsingStyleMaps_(
      new Map([['background-image', 'none'], ['opacity', '0']]),
      new Map([['background-image', frameBackground], ['opacity', '1']]));
  }

  /**
   * Updates back/front frames with a cross fade to accommodate a missing frame.
   * @param target
   * @param distanceAsPercent
   * @param targetFrame
   * @private
   */
  updateWithMissingFrame_(
    target: HTMLElement,
    distanceAsPercent: number,
    targetFrame: number
  ): void {
    this.desiredFrameForTarget_.set(target, targetFrame);
    const frontFrame = this.getNextLoadedFrame_(targetFrame);
    const backFrame = this.getPreviousLoadedFrame_(targetFrame);
    const frontFramePercent = frontFrame / this.imageUrlsInOrder_.length;
    const backFramePercent = backFrame / this.imageUrlsInOrder_.length;
    const percentageRange =
      new NumericRange(backFramePercent, frontFramePercent);
    const opacitySplit = percentageRange.getValueAsPercent(distanceAsPercent);

    const backImg = `url(${this.imageUrlsInOrder_[backFrame]})`;
    const frontImg = `url(${this.imageUrlsInOrder_[frontFrame]})`;
    this.mutateUsingStyleMaps_(
      new Map([['background-image', backImg], ['opacity', '1']]),
      new Map([['background-image', frontImg], ['opacity', `${opacitySplit}`]]),
    );
  }

  mutateUsingStyleMaps_(backStyle: TStyleMap, frontStyle: TStyleMap): void {
    renderLoop.anyMutate(
      () => {
        setStylesFromMap(this.backFrame_, backStyle);
        setStylesFromMap(this.frontFrame_, frontStyle);
      });
  }

  destroy() {
    this.loadedImages_.clear();
    this.loadedFrames_.clear();
  }
}

export {FrameSequenceBg}
