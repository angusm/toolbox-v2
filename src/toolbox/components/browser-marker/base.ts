
import {UserAgent} from "../../utils/user-agent/user-agent";
import {renderLoop} from "../../utils/render-loop";
import {updateClassModifiers} from "../../utils/dom/class/update-class-modifiers";

const CLASS_NAME = 'tb-browser-marker';

class BrowserMarker {
  constructor() {
    this.init_();
  }

  private init_(): void {
    renderLoop.measure(() => {
      const html: Element = <Element>document.querySelector('html');
      renderLoop.mutate(
        () => updateClassModifiers(
          html, CLASS_NAME, [UserAgent.getBrowser().getAsCSSModifier()]));
    });
  }
}

export {BrowserMarker};
