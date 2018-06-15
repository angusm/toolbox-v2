import {renderLoop} from "../../utils/render-loop";
import {getCurrentAnchorByVisibleOrSeen} from "../../utils/dom/anchor/get-current-anchor-by-visible-or-seen";
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";

class NextIdButton {
  private element_: HTMLElement;
  private getAnchorsFn_: () => HTMLElement[];

  constructor(
    element: HTMLElement,
    getAnchorsFn: () => HTMLElement[] = getAnchorsWithCommonSelector
  ) {
    this.element_ = element;
    this.getAnchorsFn_ = getAnchorsFn;
    this.render_();
  }

  private render_(): void {
    renderLoop.measure(() => {
      renderLoop.cleanup(() => this.render_());

      const anchors = this.getAnchorsFn_();
      const currentAnchor = getCurrentAnchorByVisibleOrSeen(this.getAnchorsFn_);
      const nextIndex = anchors.indexOf(currentAnchor) + 1;

      if (nextIndex < anchors.length) {
        const nextAnchor = anchors[nextIndex];
        const nextId = nextAnchor.attributes.getNamedItem('id').value;
        renderLoop.mutate(() => {
          this.element_.attributes.getNamedItem('href').value =
            '#' + nextId;
        });
      }
    });
  }
}

export {NextIdButton};
