import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";
import {ZERO_VECTOR_2D} from "../../math/geometry/zero-vector-2d";
import {setScroll} from "./set-scroll";
import {SCROLL_ELEMENT} from "./scroll-element";
import {applyScrollToScrollElement} from "./apply-scroll-to-scroll-element";
import {getClosestXScrollingElement} from "../ancestry/get-closest-x-scrolling-element";
import {DynamicDefaultMap} from "../../map/dynamic-default";
import {forEach} from "../../iterable-iterator/for-each";
import {getClosestYScrollingElement} from "../ancestry/get-closest-y-scrolling-element";

let setToRun = false;
let scrollsToApply =
  DynamicDefaultMap.usingFunction<Element, Vector2d>(() => ZERO_VECTOR_2D);
let measuredScrolls =
  DynamicDefaultMap.usingFunction<Element, Vector2d>(
    (target: Element) => Vector2d.fromElementScroll(target));

function applyScrollMutate_() {
  const values = scrollsToApply.entries();
  forEach(
    values,
    ([target, scrollToApply]) => {
      setScroll(measuredScrolls.get(target).add(scrollToApply), target);
    });
  scrollsToApply.clear();
  measuredScrolls.clear();
  setToRun = false;
}

function applyScroll(vector: Vector2d, target: Element = SCROLL_ELEMENT): void {
  if (target === SCROLL_ELEMENT) {
    applyScrollToScrollElement(vector);
    return;
  }

  const xTarget = getClosestXScrollingElement(target);
  scrollsToApply.set(xTarget, scrollsToApply.get(xTarget).add(vector.zeroY()));

  const yTarget = getClosestYScrollingElement(target);
  scrollsToApply.set(yTarget, scrollsToApply.get(yTarget).add(vector.zeroX()));

  if (!setToRun) {
    setToRun = true;
    renderLoop.anyMutate(() => applyScrollMutate_());
  }
}

export {applyScroll};
