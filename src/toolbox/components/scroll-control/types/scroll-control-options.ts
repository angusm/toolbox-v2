import {GetDistanceFn} from "./get-distance-fn";
import {TScrollControlDistanceValue} from "./t-scroll-control-distance-value";

interface IScrollControlOptions {
  getDistanceFunction: GetDistanceFn,
  startDistance: TScrollControlDistanceValue,
  endDistance: TScrollControlDistanceValue,
}

export {IScrollControlOptions};
