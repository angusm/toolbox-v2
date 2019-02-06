import {renderLoop} from "../../../utils/render-loop";
import {IEffect} from "./ieffect";
import {setStyle} from "../../../utils/dom/style/set-style";
import {percentToIndex} from "../../../utils/array/percent-to-index";

class FrameSequenceBg implements IEffect {
  private frames_: string[];

  constructor(frames: string[]) {
    this.frames_ = frames;
  }

  public run(
    target: HTMLElement, distance: number, distanceAsPercent: number
  ): void {
    const frame = percentToIndex(distanceAsPercent, this.frames_);
    renderLoop.mutate(
      () => setStyle(
        target, 'background-image', `url(${this.frames_[frame]})`));
  }

  destroy() {}
}

export {FrameSequenceBg}
