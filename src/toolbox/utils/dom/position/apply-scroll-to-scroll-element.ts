import {renderLoop} from '../../render-loop';
import {Vector2d} from "../../math/geometry/vector-2d";
import {ZERO_VECTOR_2D} from "../../math/geometry/zero-vector-2d";
import {Scroll} from "../../cached-vectors/scroll";
import {setScroll} from "./set-scroll";

let scrollToApply = ZERO_VECTOR_2D;
let setToRun = false;

function applyScrollToScrollElement(
  vector: Vector2d,
  {
    applyImmediately = false,
  }: {
    applyImmediately?: boolean
  } = {}
): void {
  scrollToApply = scrollToApply.add(vector);
  if (setToRun) {
    return;
  }

  setToRun = true;
  const scrollSingletonSymbol = Symbol();
  const scrollSingleton = Scroll.getSingleton(scrollSingletonSymbol);
  const apply = () => {
    setScroll(scrollSingleton.getPosition().add(scrollToApply));
    scrollToApply = ZERO_VECTOR_2D;
    setToRun = false;
    scrollSingleton.destroy(scrollSingletonSymbol);
  };

  if (applyImmediately) {
    apply();
  } else {
    renderLoop.anyMutate(apply);
  }
}

export {applyScrollToScrollElement};
