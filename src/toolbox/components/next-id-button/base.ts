import {renderLoop} from "../../utils/render-loop";
import {getCurrentAnchorByVisibleOrSeen} from "../../utils/dom/anchor/get-current-anchor-by-visible-or-seen";
import {getAnchorsWithCommonSelector} from "../../utils/dom/anchor/get-anchors-with-common-selector";
import {getNextAnchor} from "../../utils/dom/anchor/get-next-anchor";
import {isDisplayed} from "../../utils/dom/style/is-displayed";

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

      const nextAnchor =
        getNextAnchor(getCurrentAnchorByVisibleOrSeen, this.getAnchorsFn_);

      if (nextAnchor) {
        const nextHref =
          isDisplayed(nextAnchor) ?
            `#${nextAnchor.attributes.getNamedItem('id').value}` :
            null;

        renderLoop.mutate(() => {
          if (nextHref) {
            this.element_.setAttribute('href', nextHref);
          } else {
            this.element_.removeAttribute('href');
          }
        });
      }
    });
  }
}

export {NextIdButton};
