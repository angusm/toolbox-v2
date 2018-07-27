import {RunOnCondition} from "./base";
import {Scroll} from "../../utils/cached-vectors/scroll";

class RunOnScroll extends RunOnCondition {
  protected shouldRun_(newValue: boolean): boolean {
    return Scroll.getSingleton().hasChanged();
  }
}

export {RunOnScroll};
