import {renderLoop} from "../../utils/render-loop";
import {getCurrentAnchorByVisibleOrSeen} from "../../utils/dom/anchor/get-current-anchor-by-visible-or-seen";

class NextIdButton {
  private element_: HTMLElement;

  constructor(element: HTMLElement) {
    this.element_ = element;
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const anchors = Array.from(document.querySelectorAll('[id]'));
      const currentAnchor = getCurrentAnchorByVisibleOrSeen('[id]');
      const nextIndex = anchors.indexOf(currentAnchor) + 1;
      const nextId = anchors[nextIndex].attributes.getNamedItem('id').value;
      if (nextIndex < anchors.length) {
        renderLoop.mutate(() => {
          this.element_.attributes.getNamedItem('href').value = '#' + nextId;
        });
      }
    });
  }
}

export {NextIdButton};
