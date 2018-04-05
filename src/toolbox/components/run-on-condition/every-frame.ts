import {RunOnCondition} from "./base";

class RunOnConditionEveryFrame extends RunOnCondition {
  protected shouldRun_(newValue: boolean): boolean {
    return true;
  }
}

export {RunOnConditionEveryFrame};
