import {renderLoop} from './render-loop';

class Frame {
  private currentFrame: number = 0;
  private static singleton: Frame = null;

  constructor() {
    this.render();
  }

  private render(): void {
    renderLoop.framecount(() => {
      this.currentFrame++;
      renderLoop.cleanup(() => this.render());
    });
  }

  public getFrame(): number {
    return this.currentFrame;
  }

  static getSingleton(): Frame {
    return this.singleton || (this.singleton = new this());
  }
}

const frame = Frame.getSingleton();

export {frame};
