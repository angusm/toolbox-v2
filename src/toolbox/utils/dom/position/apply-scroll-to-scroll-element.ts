import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";
import {ZERO_VECTOR_2D} from "../../math/geometry/zero-vector-2d";
import {Scroll} from "../../cached-vectors/scroll";
import {setScroll} from "./set-scroll";

let scrollToApply = ZERO_VECTOR_2D;
let currentScroll = Scroll.getSingleton();
let setToRun = false;

function applyScrollToScrollElement(vector: Vector2d): void {
  scrollToApply = scrollToApply.add(vector);
  if (setToRun) {
    return;
  }

  setToRun = true;

  renderLoop.anyMutate(() => {
    setScroll(currentScroll.getPosition().add(scrollToApply));
    scrollToApply = ZERO_VECTOR_2D;
    setToRun = false;
  });
}

export {applyScrollToScrollElement};
